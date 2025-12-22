import express from "express";
import { streamGroqResponse } from "./ai.js";
import { fetchPosts } from "./post.js";

const app = express();
const port = process.env["PORT"] || 3000;

app.get("/", (_, res) => {
  res.send(`
    <h1>Eyob's Portfolio AI Chat</h1>
    <p>Try: <a href="/ai/stream?topic=What%20are%20your%20main%20projects?">/ai/stream?topic=What are your main projects?</a></p>
  `);
});

app.get("/post", async (req, res) => {
  const max = parseInt(req.query["max"] as string);
  const posts = fetchPosts(max || 12);

  posts ? res.json(posts) : res.json("no posts found");
});

app.get("/ai/stream", async (req, res) => {
  const topic = req.query["topic"] as string;

  if (!topic?.trim()) {
    res.status(400).json({ error: "Missing 'topic' query parameter" });
    return;
  }

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.flushHeaders();

  try {
    console.log(streamGroqResponse(topic));
    for await (const chunk of streamGroqResponse(topic)) {
      if (res.writableEnded) break;

      res.write(`data: ${chunk.data}\n\n`);
    }

    res.end();
  } catch (error: any) {
    console.error("Stream failed:", error);
    if (!res.writableEnded) {
      res.write(`data: [Error: ${error.message}]\n\n`);
      res.end();
    }
  }

  req.on("close", () => {
    console.log("Client disconnected");
    res.end();
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log(
    `Test URL: http://localhost:${port}/ai/stream?topic=Tell%20me%20about%20Eyob's%20projects`
  );
});
