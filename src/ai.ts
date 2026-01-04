import { Groq } from "groq-sdk";
import dotenv from "dotenv";

interface AiStreamChunk {
  data: string;
}

export const projects = [
  {
    title: "Parcel Tracking System",
    description:
      "United Parcel Service is a complete parcel management platform built for a client who needed a smart way to track and manage shipments. It allows users to create new parcels, monitor delivery progress, update shipment status, and view parcel details through a clean and responsive dashboard.",

    class: ["full-stack"],
    tags: [
      "React",
      "Supabase",
      "TypeScript",
      "TailwindCSS",
      "Shadcn UI",
      "Redux",
    ],
    source: "https://github.com/Eyob-smax/United-parcel-service",
    visit: "https://united-parcel-service.vercel.app/",
    detailedDescription: `United Parcel Service
United Parcel Service is a modern, web-based parcel tracking and management system built to streamline logistics operations for businesses and clients. The platform enables users to create, monitor, and manage parcels in real time, featuring a clean and intuitive interface that enhances user experience and operational efficiency.

Designed with a focus on performance, reliability, and automation, the system supports end-to-end parcel workflows—from creation and status updates to real-time tracking and detailed shipment management. It also includes role-based authentication for senders, couriers, and admins, ensuring secure and organized control over every delivery process.

With a responsive design, dynamic API integration, and smooth dashboard interaction, this project demonstrates my expertise in React.js, Next.js, Tailwind CSS, Node.js, and MongoDB, blending both frontend and backend development to deliver a complete and production-ready solution.`,
  },
  {
    title: "HasabClient SDK",
    description:
      "A TypeScript SDK for the Hasab AI API, enabling easy integration of chat, transcription, translation, and text-to-speech features — especially powerful for local languages like Amharic. Built to simplify interaction with Hasab AI's high-quality voice and text models.",

    class: ["library/tools", "sdk", "typescript"],
    tags: [
      "TypeScript",
      "Node.js",
      "API Client",
      "Streaming",
      "Axios",
      "AI Integration",
      "Hasab AI",
    ],
    visit: "https://www.npmjs.com/package/hasab-sdk",
    source: "https://github.com/Eyob-smax/hasab_sdk",
    detailedDescription: `HasabClient SDK
HasabClient SDK is a modern, type-safe TypeScript library designed to make integration with the Hasab AI API simple and reliable. It provides a clean interface for four core AI capabilities: chat completions, audio transcription, text translation, and high-quality text-to-speech synthesis — with special strength in supporting local languages such as Amharic.

Motivated by the impressive voice and text quality of Hasab AI for under-resourced languages, I created this SDK to remove the friction of working directly with raw API calls. Developers can now quickly add AI-powered chat, voice input/output, and translation features to their Node.js applications.

Key features include:
• Synchronous and streaming chat responses
• Audio file transcription with history
• Text translation with language detection
• TTS synthesis (base64 & streaming) with speaker selection
• History, analytics, and record management for TTS
• Robust error handling with custom error classes
• Support for file uploads via Buffer, path, or Blob

The library is built with developer experience in mind: clear TypeScript types, consistent response shapes, and easy streaming integration using Node.js streams. It serves as a community tool to help more developers leverage Hasab AI’s capabilities in real-world applications.

This project demonstrates my skills in API client design, TypeScript, streaming data handling, file uploads, and creating developer-friendly libraries.`,
  },
  {
    title: "ELDCP – Ethiopian Language Data Collection Platform",
    description:
      "ELDCP is a university-focused platform designed to collect, validate, and manage high-quality Ethiopian language voice datasets for training AI models. It streamlines contributor submissions, multi-phase validations, and automated payments in a scalable and secure system.",

    class: ["backend", "ai-data-collection"],
    tags: [
      "Next.js",
      "Node.js",
      "Prisma",
      "PostgreSQL",
      "JWT",
      "Docker",
      "Nginx",
      "TailwindCSS",
      "GitHub Actions",
    ],
    source: "NDA - Private Repository",
    visit: "NDA - Private Deployment",
    detailedDescription: `ELDCP (Ethiopian Language Data Collection Platform) is a full-scale data collection and validation system built to support the development of Ethiopian-language-focused AI models. Developed by a team of five, the platform is designed for universities and research institutions that require high-quality, verified voice datasets.

The platform supports structured project management (e.g., Amharic datasets), where contributors receive unique links containing prompts and submit voice recordings directly through the system. Each submission passes through a two-stage validation pipeline: automatic audio validation to ensure clarity and quality, followed by a human-based review process.

Human validation is handled by multiple validators. If two validators disagree, the submission is automatically escalated to a tie-breaker to ensure fairness and data accuracy. Once validated, the system generates invoices for both contributors and validators and allows administrators to export structured datasets (audio files, prompts, and metadata) for AI model training.

ELDCP features role-based access control with four distinct roles: Super Admin, Project Manager, Contributor, and Validator. The application exposes over 65 RESTful endpoints and is built using Next.js, Prisma, and PostgreSQL, secured with JWT authentication.

The platform is fully containerized with Docker, optimized behind Nginx, and integrated with GitHub Actions for CI/CD. It demonstrates strong backend architecture, scalable workflow design, and real-world problem solving in AI data engineering and system automation.`,
  },
  {
    title: "Expense Tracker",
    description:
      "A web application to track personal expenses and manage budgets effectively and with an analytics dashboard.",

    class: ["frontend"],
    tags: [
      "React",
      "TypeScript",
      "TailwindCSS",
      "Supabase",
      "Redux",
      "ShadcnUI",
    ],
    source: "https://github.com/Eyob-smax/Expense-Tracker",
    visit: "https://expense-tracker-one-taupe.vercel.app/",
    detailedDescription: `Expense Tracker — Simplify Your Finances

Expense Tracker is a lightweight, web-based finance management app that helps users track, categorize, and visualize their daily expenses effortlessly. Designed with simplicity and efficiency in mind, it enables users to log transactions, organize spending by category, and generate insightful reports through interactive charts and summaries.

Built using HTML, CSS, and JavaScript (ES6+), the app stores data securely in localStorage, ensuring data privacy and offline accessibility. The UI focuses on clarity and usability, featuring intuitive navigation, responsive layouts, and optional dark mode for a better visual experience.

From budget alerts to spending visualizations powered by Chart.js, this project demonstrates a solid understanding of DOM manipulation, local data persistence, and clean UI design principles. It’s optimized for performance and easy to extend with future enhancements like cloud sync or authentication.

This project showcases both technical craftsmanship and a strong emphasis on user-centered functionality, making personal finance management simple yet powerful.`,
  },
  {
    title: "Gbi Gubae Portal",
    description:
      "A web application for managing and tracking student registration within the Gbi Gubae community.",

    class: ["full-stack", "backend"],
    tags: [
      "NodeJS",
      "ExpressJS",
      "Postgres",
      "Supabase",
      "Prisma",
      "React",
      "TypeScript",
      "Tailwind",
    ],
    source: "https://github.com/Eyob-smax/gbi-gubae-portal",
    visit: "https://6kilogbigubae.vercel.app/",
    detailedDescription: `፮ኪሎ ግቢ ጉባኤ — 6 Kilo Gibi Gubae

6 Kilo Gibi Gubae is a demo web application that showcases a modern, responsive dashboard designed for community, event, and parcel management workflows. It combines a clean, user-friendly interface with practical CRUD functionality — allowing users to create, update, delete, and track items such as parcels or events through a structured, interactive dashboard.

Built with React (or Next.js) and Tailwind CSS, the app demonstrates best practices in component-based architecture, state management (Redux Toolkit or Context API), and API-driven design. It includes intuitive features like search and filter, status tracking timelines, and confirmation dialogs, all optimized for accessibility and mobile responsiveness.

The project emphasizes clarity, usability, and performance, making it a perfect example of how design and development can merge to create a professional management UI. With seamless deployment on Vercel, API-ready components, and a visually consistent dashboard, 6 Kilo Gibi Gubae reflects a strong command of frontend development and UX principles.`,
  },
  {
    title: "DevElevate | Productivity App for Devs",
    description:
      "DevElevate is an advanced AI-powered productivity web application designed to optimize the developer workflow.",

    class: ["full-stack", "frontend", "backend"],
    tags: ["JS", "HTML", "CSS", "MongoDB", "TailwindCSS"],
    source: "https://github.com/Eyob-smax/DevElevate",
    visit: "https://dev-elevate-ruddy.vercel.app/",
    detailedDescription: `DevElevate — AI-Powered Developer Productivity Hub

DevElevate is an AI-driven productivity web app designed to help developers streamline their workflow, enhance learning, and stay organized. Built as a mobile-friendly Progressive Web App (PWA), it integrates essential tools—AI-generated coding questions, intelligent explanations, note-taking, task management, and a Pomodoro timer—into one cohesive platform.

The application leverages the Gemini API, fine-tuned through Google AI Studio, to deliver context-aware programming questions, explanations, and test cases without complex prompts. Its modular architecture mimics microservice principles, ensuring that each tool functions independently yet contributes to a unified developer experience.

On the technical side, DevElevate is developed using TypeScript, Vanilla JavaScript, HTML, and Tailwind CSS for a clean, responsive UI, while Node.js, Express, and MongoDB power the backend. The app also implements secure authentication with Passport.js and Cookie-Session, ensuring smooth login and data protection.

As a PWA, it supports offline functionality for core features and can be installed directly on mobile devices—allowing developers to stay productive anywhere. The project reflects strong skills in AI integration, full-stack JavaScript development, and UI/UX optimization, demonstrating how technology and usability can merge to create a seamless developer experience.`,
  },

  {
    title: "Cod Stat",
    description:
      "A powerful and configurable Node.js command-line tool for analyzing source code statistics. It provides insights into line counts, code density, function complexity, largest files, and more — supporting multiple languages and ideal for personal projects or CI/CD integration.",

    class: ["library/tools", "tool", "node"],
    tags: [
      "Node.js",
      "TypeScript",
      "CLI",
      "Commander.js",
      "Chalk",
      "Progress Bar",
      "Code Analysis",
      "Code Metrics",
    ],
    visit: "https://www.npmjs.com/package/cod-stat",
    source: "https://github.com/Eyob-smax/cod-stat",
    detailedDescription: `Cod Stat
Cod Stat is a fast, colorful, and highly configurable command-line tool built with Node.js to help developers gain deep insights into their codebase. It scans directories recursively, analyzes files across multiple programming languages, and delivers clear metrics on code quality, structure, and complexity.

Perfect for solo developers reviewing personal projects, teams enforcing code standards, or integrating into CI/CD pipelines to track codebase health over time.

Key features include:
• Detailed line counting (total, code, blanks, comments) with code density calculation
• Function/method counting and average length analysis
• Rough complexity estimation based on control-flow keywords
• Support for 15+ programming languages and common config/markup files
• Filters for code-only or config-only scans
• Top N largest files identification
• Interactive progress bar for large repositories
• Pretty colored table output or JSON export for automation
• Custom ignore directories and language filtering

The tool uses modern Node.js libraries like Commander for argument parsing, Chalk for vibrant terminal colors, and Cli-table for beautiful outputs — delivering a polished and intuitive user experience right in the terminal.

This project showcases my expertise in building developer tools, CLI design, file system traversal, language-aware parsing, and creating reusable, production-ready Node.js packages.`,
  },

  {
    title: "Podcast Player",
    description:
      "SpaceCast is a Progressive Web App (PWA) podcast player built with Vanilla JavaScript, Node.js, and Express. Originally inspired by a childhood passion for astronomy and space, this app allows users to explore and listen to podcasts from a vast library of over 4,000,000 podcasts indexed via a powerful podcast API.",

    class: ["frontend"],
    tags: ["NodeJS", "VanillaJS", "HTML", "CSS"],
    source: "https://github.com/Eyob-smax/SpaceCast-podcastApp",
    visit: "https://spacecast-podcastapp.onrender.com/",
    detailedDescription: `SpaceCast — The Universe of Podcasts in Your Pocket

SpaceCast is an advanced Progressive Web App (PWA) podcast player that combines modern web technology with a passion for exploration and discovery. Originally inspired by a love for astronomy and space, SpaceCast has evolved into a versatile platform for discovering, streaming, and managing podcasts across every genre.

The app is built using Vanilla JavaScript, Node.js, and Express, showcasing efficient state management, API integration, and server-side proxying to handle over 4 million podcasts from the Podcast Index API. It uses lazy loading for performance optimization and service workers for offline functionality, ensuring users can enjoy seamless playback even without an internet connection.

With its responsive and user-friendly design, SpaceCast delivers a native app-like experience on any device. It also employs crypto libraries to enhance data security and speed, while its PWA capabilities make it installable on both desktop and mobile platforms.

From searching and streaming podcasts to downloading and listening offline, SpaceCast demonstrates a deep understanding of modern web development, UX design, and performance optimization, all wrapped in a clean, immersive interface.`,
  },

  {
    title: "Simple E-commerce Site",
    description:
      "A web application for buying and selling products with a user-friendly interface.",

    class: ["frontend"],
    tags: ["HTML", "JS", "CSS"],
    source:
      "https://github.com/Eyob-smax/United-parcel-service/tree/main/project",
    visit: "https://project-ards.vercel.app/",
    detailedDescription: `
🛒 Simple E-commerce Site — Shop with Ease

This Simple E-commerce Site is a web application designed to provide a seamless online shopping experience with a clean, intuitive interface. Users can browse product collections, view detailed product pages, add items to their cart, and subscribe to newsletters, all within a responsive and user-friendly layout.

Built with HTML, CSS, and JavaScript, the project emphasizes **interactive UI elements**, smooth navigation, and modern design practices. It demonstrates core frontend development skills, including **DOM manipulation, responsive design with Flexbox/Grid**, and basic **form handling** for subscriptions and purchases.

The project showcases an understanding of **user-centered design principles**, creating a shopping platform that is both visually appealing and highly functional. It’s optimized for performance and accessibility, making it an excellent example of a beginner-to-intermediate web development project.
`,
  },
  {
    title: "Voice to Text Converter",
    description:
      "Voice Transcriber Bot is a Telegram bot that automatically converts voice messages into text | I created this bot after a funny real-life moment: while I was in class and couldn’t listen to a friend’s voice message, I decided to build a bot that could do it for me 😄",

    class: ["telegram-bot"],
    tags: [
      "NodeJS",
      "ExpressJS",
      "Telegraf",
      "SpeechRecognition",
      "AssemblyAI",
    ],
    source: "https://github.com/Eyob-smax/Voice_To_Text-Bot",
    visit: "https://t.me/voice_T_text_bot/",
    detailedDescription: `Voice Transcriber Bot — Turn Voice Messages into Instant Text

Voice Transcriber Bot is a Telegram-based automation tool that instantly converts voice messages into text, making communication effortless even when users can’t listen to audio. Designed for convenience and real-world practicality, it provides fast, reliable, and privacy-friendly transcription powered by modern AI.

Built with Node.js, Express, and Telegraf, and integrated with AssemblyAI’s speech-to-text API, the bot processes voice messages in real time and returns accurate transcriptions directly inside Telegram chats. Deployed on Vercel using webhooks, it ensures smooth, low-latency performance without requiring traditional server infrastructure.

The project highlights strong skills in API integration, asynchronous JavaScript, and serverless deployment, all wrapped in a lightweight architecture focused on speed and security. No audio data is stored permanently — everything runs in-memory to protect user privacy.

This bot demonstrates both technical depth and creative problem-solving, turning an everyday inconvenience into an intelligent automation solution. It represents a blend of AI integration, backend logic, and user-focused design — showing how technology can simplify real-life communication.`,
  },
  {
    title: "YouTube Video Downloader",
    description:
      "A high-performance Telegram bot for downloading videos and extracting audio from TikTok, YouTube, Instagram, and more - in bulk or single files!",
    class: ["telegram-bot"],
    tags: ["NodeJS", "ExpressJS", "Telegraf", "ytdl-core"],
    source: "https://github.com/Eyob-smax/Media-Downloader-bot",
    visit: "https://t.me/yt_video_dowloader_bot/",
    detailedDescription: `Turbo Social Media Downloader Bot — Fast, Reliable, and Scalable

Turbo Social Media Downloader Bot is a high-performance Telegram bot designed to download and convert media from major social platforms like TikTok, YouTube, Instagram, Facebook, and Twitter. Built with Node.js and the Telegram Bot API, it enables users to download videos or extract audio—individually or in bulk—with lightning-fast performance.

The bot’s architecture focuses on speed, scalability, and reliability, featuring parallel downloads using child processes, and a robust queue system to manage large batches without overloading the system. It integrates yt-dlp for versatile platform support, ensuring users receive original-quality media with minimal processing time.

Technically, it’s powered by Node.js, leveraging asynchronous event-driven programming for efficient handling of multiple concurrent downloads. The design ensures smooth user interaction within Telegram, and flexible configuration via environment variables for easy setup and deployment.

Whether for content creators, archivists, or casual users, Turbo Downloader Bot simplifies bulk video and audio saving into a single, automated command system, combining performance with simplicity and modern backend engineering principles.`,
  },
];

export const TimeLineData = [
  { year: 2023, text: "Started my journey as a developer." },
  { year: 2023, text: "Worked as a freelance developer." },
  { year: 2024, text: "Shared my projects with the world." },
  { year: 2024, text: "Started my own platform." },
  { year: 2024, text: "Start building real-world applications and systems" },
  { year: 2025, text: "Start my telegram community and share insights there" },
];

export const tech_stack = [
  {
    category: "Frontend",
    skills: [
      { name: "JavaScript", proficiency: "Proficient" },
      { name: "TypeScript", proficiency: "Proficient" },
      { name: "React", proficiency: "Proficient" },
      { name: "Next.js", proficiency: "Intermediate" },
      { name: "Tailwind CSS", proficiency: "Proficient" },
      { name: "Redux", proficiency: "Intermediate" },
    ],
  },
  {
    category: "Backend",
    skills: [
      { name: "Node.js", proficiency: "Proficient" },
      { name: "Bun", proficiency: "Intermediate" },
      { name: "Express.js", proficiency: "Proficient" },
      { name: "Hono.js", proficiency: "Intermediate" },
      { name: "NestJS", proficiency: "Proficient" },
      { name: "Supabase", proficiency: "Proficient" },
      { name: "PostgreSQL", proficiency: "Proficient" },
      { name: "MongoDB", proficiency: "Proficient" },
      { name: "Redis", proficiency: "Proficient" },
      { name: "GraphQL", proficiency: "Intermediate" },
      { name: "Prisma", proficiency: "Proficient" },
      {
        name: "Socket.IO",
        proficiency: "Intermediate",
      },
    ],
  },
  {
    category: "DevOps / Deployment",
    skills: [
      { name: "Docker", proficiency: "Proficient" },
      { name: "Kubernetes", proficiency: "Intermediate" },
      { name: "Vercel", proficiency: "Proficient" },
      {
        name: "GitHub Actions",
        proficiency: "Intermediate",
      },
    ],
  },
  {
    category: "Version Control / Collaboration",
    skills: [
      { name: "Git", proficiency: "Proficient" },
      { name: "GitHub", proficiency: "Proficient" },
    ],
  },
  {
    category: "Tools / Utilities",
    skills: [
      { name: "VS Code", proficiency: "Proficient" },
      { name: "Postman", proficiency: "Proficient" },
      { name: "Figma", proficiency: "Intermediate" },
      { name: "Chrome DevTools", proficiency: "Proficient" },
    ],
  },
];

export const experience = [
  {
    role: "Frontend Developer (React & Tailwind)",
    company: "Codsoft",
    type: "Internship",
    duration: "1 Month",
    period: "2024",
    responsibilities: [
      "Built responsive UI components using React and Tailwind CSS",
      "Delivered real-world project features under strict deadlines",
      "Collaborated with team members to improve product quality",
      "Gained hands-on experience in frontend development practices",
    ],
    projects: ["DevElevate", "Spacecast"],
    location: "Remote",
  },
  {
    role: "Backend Mentor (Node.js)",
    company: "GDG (Google Developer Group) AAU",
    type: "Part-Time",
    duration: "2025 - Present",
    period: "2025 - Present",
    responsibilities: [
      "Teach backend fundamentals to students",
      "Guide learners through Node.js best practices",
      "Support students in building real applications",
      "Strengthen community knowledge and coding culture",
    ],
    location: "Addis Ababa, Ethiopia",
  },
  {
    role: "Founder & Developer",
    company: "Maya Tutorials",
    type: "Startup / Personal Project",
    duration: "2023 - Present",
    period: "2023/24 - Present",
    responsibilities: [
      "Developed a student-focused tutorial platform",
      "Designed UI/UX and implemented responsive features",
      "Built a scalable backend system to store exam data",
      "Helped students study past exam questions efficiently",
    ],
    impact:
      "Addresses university learning resource challenges and improves exam preparation accessibility",
    location: "Addis Ababa, Ethiopia",
  },
];

const qualities = [
  "Quick learner",
  "Long-life learner",
  "Delivers on time",
  "Prefers simple and clean solutions",
  "Adaptable to new technology",
  "Architecture-focused mindset",
];

export const blogPosts = [
  {
    id: 1,
    title: "Progress on LeetCode Problem Solving",
    category: "Competitive Programming",
    topic: "Problem Solving & Growth",
    summary:
      "Reflecting on personal growth solving medium and hard LeetCode problems compared to struggling with easy level a year ago.",
    link: "https://t.me/devwitheyob/1519",
    tags: ["leetcode", "growth", "problem-solving"],
    date: "2025-11-07",
  },
  {
    id: 2,
    title: "Android vs iPhone & The Power of Storytelling",
    category: "Tech Culture",
    topic: "Branding & Market Perception",
    summary:
      "A take on how effective marketing and storytelling overshadow technical creators and products.",
    link: "https://t.me/devwitheyob/1520",
    tags: ["storytelling", "tech-culture", "marketing"],
    date: "2025-11-07",
  },
  {
    id: 3,
    title: "Article of the Day: Motion Moving Away from TypeScript",
    category: "Articles",
    topic: "TypeScript Ecosystem",
    summary:
      "A highlight of Motion’s shift away from TypeScript while discussing TypeScript’s scalability in large monorepos.",
    link: "https://t.me/devwitheyob/1521",
    tags: ["TypeScript", "ArticleOfTheDay", "frontend"],
    date: "2025-11-07",
  },
  {
    id: 4,
    title: "Lesson Learned: Don't Rely on AI for App Architecture",
    category: "Personal Lessons",
    topic: "AI in Development",
    summary:
      "Discussing how AI-generated application logic can slow developers if architecture and state flow aren't designed thoughtfully.",
    link: "https://t.me/devwitheyob/1522",
    tags: ["lessons", "AI", "frontend", "architecture"],
    date: "2025-11-07",
  },
  {
    id: 5,
    title: "Article of the Day: Vibe Coders Will Struggle",
    category: "Articles",
    topic: "AI Impact on Developers",
    summary:
      "Exploring how AI shifts value toward debugging, architecture, security, and code understanding as trivial coding becomes automated.",
    link: "https://t.me/devwitheyob/1523",
    tags: ["ArticleOfTheDay", "AI", "career"],
    date: "2025-11-07",
  },
  {
    id: 6,
    title: "MIT Mindset: Understand the System",
    category: "Mindset",
    topic: "Engineering Philosophy",
    summary:
      "Emphasizing the importance of deep system understanding to innovate safely without breaking structure.",
    link: "https://t.me/devwitheyob/1524",
    tags: ["MITMindset", "quote", "engineering"],
    date: "2025-11-07",
  },
];

export async function* streamGroqResponse(
  topic: string
): AsyncGenerator<AiStreamChunk, void, unknown> {
  dotenv.config({
    path: "./.env",
  });
  if (!topic?.trim()) {
    throw new Error("Topic cannot be empty");
  }

  const apiKey = process.env["GROQ_API_KEY"];
  if (!apiKey) {
    throw new Error("GROQ_API_KEY is not configured");
  }

  const groq = new Groq({ apiKey });
  const model = process.env["AI_MODEL"];

  const systemPrompt = `
You are an AI assistant embedded in Eyob's personal portfolio website. Your purpose is to help visitors learn more about Eyob by answering questions ONLY using the provided JSON context. Be friendly, approachable, and never boring. You can respond naturally to casual greetings or small talk (e.g., "Hi" → "Hey! How’s it going? I’m Eyob's AI assistant, ask me anything about his projects, skills, or journey!").

Your responsibilities:
- Provide accurate information about Eyob's skills, background, timeline, and experience.
- Explain project details clearly, including:
  • Project name
  • What it does
  • Technologies used
  • Live URL (if available)
  • GitHub repository link (if available)
- Reference blog posts from Eyob's active Telegram coding community to illustrate achievements, learning experiences, or insights when relevant. Eyob shares his daily coding journey and progress in this community.
- Respond in a friendly and concise way; make answers engaging and human-like.

Rules:
- Do NOT use external knowledge.
- If the answer is not found in the context JSON, respond with:
  "I don't know. Try asking about my projects, timeline, experience, skills, or blog posts."
- Never fabricate URLs, details, or repositories.
- Never hallucinate unknown information.
- If the user asks about multiple projects or posts, return results in a clean bullet or list format.
- Keep answers concise and to the point.

Important:
- Always refer to the provided JSON context for answers.
- Always return answers in good markdown format for better readability(this is very important).
- Don't ever send the thinking steps to the use just the final answers
Goal:
Help visitors get to know Eyob better through his timeline, experience, skillset, projects, and insights shared in his Telegram coding community.

Context:
Projects = ${JSON.stringify(projects)}
Timeline = ${JSON.stringify(TimeLineData)}
Skills = ${JSON.stringify(tech_stack)}
Experience = ${JSON.stringify(experience)}
Personal Qualities = ${JSON.stringify(qualities)}
Blog Posts (Telegram Community) = ${JSON.stringify(blogPosts)}
`;

  try {
    const stream = await groq.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: topic },
      ],
      model: model as string,
      temperature: 0.7,
      max_tokens: 1024,
      stream: true,
    });

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content;

      if (content) {
        yield { data: content };
      }
    }
  } catch (error: any) {
    console.error("Groq streaming error:", error.message);
    yield { data: `[Error: ${error.message}]` };
  }
}
