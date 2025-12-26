import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import cors from "cors";
import { streamGroqResponse } from "../src/ai.js";
import { fetchPosts } from "../src/post.js";
import { MessageController } from "../src/message.js";

const app = express();
const port = process.env[`PORT`] || 4000;

app.use(cors());
app.use(express.json());

app.get("/", (_, res) => {
  res.send(`
    <h1>Eyob's Portfolio AI Chat</h1>
    <p>Try: <a href="/ai/stream?topic=What%20are%20your%20main%20projects?">
      /ai/stream?topic=What are your main projects?
    </a></p>
  `);
});

app.get("/posts", async (req, res) => {
  const max = parseInt(req.query["max"] as string);
  const posts = await fetchPosts(max || 12);
  res.json(posts);
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
  res.flushHeaders();

  try {
    for await (const chunk of streamGroqResponse(topic)) {
      if (res.writableEnded) break;
      res.write(`data: ${chunk.data}\n\n`);
    }
    res.end();
  } catch (error: any) {
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

app.post("/messages", MessageController.create);

app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error("🔥 Global Error:", err);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
