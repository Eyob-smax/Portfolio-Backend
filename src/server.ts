// Must be first: every import below reads process.env while it is evaluated.
import { PORT } from "./env.js";

import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import cors from "cors";
import { streamAiResponse } from "./ai.js";
import { aiModel } from "./gemini.js";
import { fetchPosts } from "./post.js";
import { MessageController } from "./message.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", async (_, res) => {
  res.send(`
    <h1>Eyob's Portfolio AI Chat</h1>
    <p>Try: <a href="/ai/stream?topic=What%20are%20your%20main%20projects?">
      /ai/stream?topic=What are your main projects?
    </a></p>
  `);
});

/** Cheap liveness probe that also reports which model is configured. */
app.get("/health", (_req, res) => {
  res.json({
    ok: true,
    model: aiModel(),
    aiConfigured: Boolean(
      process.env["GOOGLE_AI_API_KEY"] || process.env["GEMINI_API_KEY"]
    ),
  });
});

app.get("/posts", async (req, res, next) => {
  try {
    const max = Number.parseInt(req.query["max"] as string, 10);
    const topic = (req.query["topic"] as string | undefined)?.trim();
    // A bad or missing `max` falls back to 12; the upper bound stops a visitor
    // asking for the whole table in one request.
    const limit = Number.isFinite(max) && max > 0 ? Math.min(max, 50) : 12;
    res.json(await fetchPosts(limit, topic || undefined));
  } catch (error) {
    next(error);
  }
});

app.get("/ai/stream", async (req, res) => {
  const topic = req.query["topic"] as string;

  if (!topic?.trim()) {
    res.status(400).json({ error: "Missing 'topic' query parameter" });
    return;
  }

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache, no-transform");
  res.setHeader("Connection", "keep-alive");
  // Without this, a buffering reverse proxy holds the whole answer back and
  // delivers it in one lump — the widget shows "Thinking..." the entire time.
  res.setHeader("X-Accel-Buffering", "no");
  res.flushHeaders();

  /*
   * Registered before the loop, not after it.
   *
   * Previously this listener was attached only once the stream had finished,
   * so a visitor closing the widget mid-answer was never noticed and the model
   * kept generating — billed tokens written to a socket nobody was reading.
   */
  const abort = new AbortController();
  req.on("close", () => abort.abort());

  /*
   * One SSE `data:` line per frame, JSON-encoded.
   *
   * Markdown is full of newlines, and a raw `data: ${chunk}\n\n` frame breaks
   * apart the moment a chunk contains one: everything after the newline is
   * read by the browser as a new SSE field name and silently dropped. Encoding
   * makes every chunk exactly one line, whatever is in it.
   */
  // Event names: "chunk" for text, "end" for a clean finish, "failed" for an
  // error. Not "error" — EventSource already dispatches that name for
  // transport failures, and the client could not tell the two apart.
  const send = (event: string, payload: unknown) => {
    if (res.writableEnded) return false;
    res.write(`event: ${event}\ndata: ${JSON.stringify(payload)}\n\n`);
    return true;
  };

  try {
    for await (const chunk of streamAiResponse(topic, abort.signal)) {
      if (!send("chunk", chunk.data)) return;
    }
    send("end", null);
  } catch (error) {
    console.error("AI streaming error:", (error as Error).message);
    send("failed", (error as Error).message || "The AI service failed.");
  } finally {
    if (!res.writableEnded) res.end();
  }
});

app.post("/messages", MessageController.create);

app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error("🔥 Global Error:", err);
  // Headers are already out on a stream that failed late; writing a status now
  // throws ERR_HTTP_HEADERS_SENT and takes the process down with it.
  if (res.headersSent) {
    res.end();
    return;
  }
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
