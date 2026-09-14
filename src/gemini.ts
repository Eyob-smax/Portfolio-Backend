import { optional, required } from "./env.js";

/**
 * Minimal Google AI (Gemini) streaming client.
 *
 * Talks to the REST endpoint directly instead of pulling in an SDK: the surface
 * this project needs is one streaming call, and doing it by hand keeps the key
 * handling and the SSE parsing explicit — which matters, because the failure
 * modes below (a safety block, an exhausted token budget) arrive as metadata on
 * an otherwise successful 200 and are easy to swallow into a silent empty reply.
 */

const API_ROOT = "https://generativelanguage.googleapis.com/v1beta";
/*
 * Two constraints pick this, and neither is "newest wins":
 *
 *  - gemini-2.5-* is closed to new API keys. It still appears in ListModels,
 *    but generateContent answers 404 — so listing a model is not evidence it
 *    can be called.
 *  - The full Flash models carry a 20-request/day free tier, which a portfolio
 *    chat widget exhausts in an afternoon. Flash Lite's allowance is far
 *    larger, and the answers here are short and grounded in a fixed context,
 *    so the smaller model costs nothing that matters.
 */
const DEFAULT_MODEL = "gemini-3.5-flash-lite";

/** The configured model, so callers and logs agree on what actually ran. */
export function aiModel(): string {
  return optional("AI_MODEL", DEFAULT_MODEL);
}

function apiKey(): string {
  // GEMINI_API_KEY is accepted as an alias so an existing deployment that
  // already sets it keeps working after this rename.
  return process.env["GOOGLE_AI_API_KEY"]?.trim()
    ? required("GOOGLE_AI_API_KEY")
    : required("GEMINI_API_KEY");
}

interface StreamChunk {
  candidates?: Array<{
    content?: { parts?: Array<{ text?: string; thought?: boolean }> };
    finishReason?: string;
  }>;
  promptFeedback?: { blockReason?: string };
  error?: { message?: string; status?: string };
}

export interface StreamOptions {
  system: string;
  prompt: string;
  temperature?: number;
  maxOutputTokens?: number;
  signal?: AbortSignal;
}

/**
 * Streams the model's answer as plain text deltas.
 *
 * Yields text only — nothing here knows about SSE or Express. Framing the
 * deltas for the browser is the route handler's job.
 */
export async function* streamGeminiText(
  options: StreamOptions
): AsyncGenerator<string, void, unknown> {
  const model = aiModel();
  const url = `${API_ROOT}/models/${encodeURIComponent(
    model
  )}:streamGenerateContent?alt=sse`;

  /*
   * Resolved before the try, not inside it.
   *
   * `apiKey()` throws when the variable is missing, and evaluating it in the
   * fetch options put that throw inside the catch below — a plain
   * misconfiguration was reported to the visitor as "could not reach the AI
   * service", which sends you looking at the network instead of at `.env`.
   */
  const key = apiKey();

  let res: Response;
  try {
    res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": key,
      },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: options.system }] },
        contents: [{ role: "user", parts: [{ text: options.prompt }] }],
        generationConfig: {
          temperature: options.temperature ?? 0.7,
          /*
           * Generous on purpose. These models reason before answering and
           * that reasoning is charged against this same budget, so a tight cap
           * can be spent entirely on thinking — the request then finishes with
           * MAX_TOKENS and not one visible character, which reads to the
           * visitor as the chat widget dying on its own.
           */
          maxOutputTokens: options.maxOutputTokens ?? 16_384,
        },
      }),
      ...(options.signal ? { signal: options.signal } : {}),
    });
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") return;
    throw new Error("Could not reach the AI service. Please try again.");
  }

  if (!res.ok || !res.body) {
    let message = `The AI service returned an error (HTTP ${res.status}).`;
    try {
      const body = (await res.json()) as StreamChunk;
      if (body.error?.message) message = body.error.message;
    } catch {
      // Non-JSON error body; the generic message above is the best we have.
    }
    throw new Error(message);
  }

  let finishReason: string | undefined;
  let blockReason: string | undefined;
  let produced = false;

  /** Pulls visible text out of one parsed chunk, recording its metadata. */
  function* textsOf(chunk: StreamChunk): Generator<string, void, unknown> {
    if (chunk.promptFeedback?.blockReason) {
      blockReason = chunk.promptFeedback.blockReason;
    }
    const candidate = chunk.candidates?.[0];
    if (candidate?.finishReason) finishReason = candidate.finishReason;
    for (const part of candidate?.content?.parts ?? []) {
      // Reasoning parts are internal; never surface them as an answer.
      if (part.thought) continue;
      if (part.text) yield part.text;
    }
  }

  /** One SSE frame — possibly several `data:` lines. */
  function* textsOfFrame(frame: string): Generator<string, void, unknown> {
    for (const line of frame.split("\n")) {
      if (!line.startsWith("data:")) continue;
      const payload = line.slice(5).trim();
      if (!payload || payload === "[DONE]") continue;
      try {
        yield* textsOf(JSON.parse(payload) as StreamChunk);
      } catch {
        // A partial frame arrives complete on a later read.
      }
    }
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      // Normalise CRLF: frames delimited by \r\n\r\n contain no "\n\n" at all,
      // so without this the boundary search never matches and nothing parses.
      buffer += decoder.decode(value, { stream: true }).replace(/\r\n/g, "\n");

      let boundary = buffer.indexOf("\n\n");
      while (boundary !== -1) {
        const frame = buffer.slice(0, boundary);
        buffer = buffer.slice(boundary + 2);
        boundary = buffer.indexOf("\n\n");
        for (const text of textsOfFrame(frame)) {
          produced = true;
          yield text;
        }
      }
    }
  } finally {
    // Releasing the lock lets the connection be torn down when the caller
    // stops pulling — a visitor closing the widget mid-answer, most often.
    reader.cancel().catch(() => {});
  }

  // A final frame may arrive without its trailing blank line.
  if (buffer.trim()) {
    for (const text of textsOfFrame(buffer)) {
      produced = true;
      yield text;
    }
  }

  if (produced) return;

  // Finishing with no visible text used to look like nothing happened at all.
  // Name the cause instead.
  throw new Error(
    blockReason || finishReason === "SAFETY" || finishReason === "PROHIBITED_CONTENT"
      ? "The model declined to answer that. Try rewording the question."
      : finishReason === "MAX_TOKENS"
        ? "The model ran out of room before writing anything. Try a narrower question."
        : `The model returned no content${finishReason ? ` (${finishReason})` : ""}. Please try again.`
  );
}
