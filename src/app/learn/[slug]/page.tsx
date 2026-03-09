"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useState, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { SECTIONS } from "@/lib/sections";

/* ──────────────────────────────────────────────
   Content Types & Data
   ────────────────────────────────────────────── */

type GlossaryTerm = { term: string; definition: string };

type Block =
  | { type: "text"; content: string }
  | { type: "quote"; content: string }
  | { type: "callout"; title: string; items: string[] }
  | { type: "video"; title: string; url: string }
  | { type: "link"; title: string; url: string; description: string }
  | { type: "glossary"; title: string; terms: GlossaryTerm[] };

type SectionContent = {
  blocks: Block[];
};

const SECTION_CONTENT: Record<string, SectionContent> = {
  "why-this-matters": {
    blocks: [
      {
        type: "text",
        content:
          "At Olive Garden, we're not just adopting AI — we're building with it. Claude Code represents a fundamental shift in how we work: faster iteration, deeper insight, and a new kind of creative partnership between humans and machines.",
      },
      {
        type: "quote",
        content:
          "Claude Code isn't a chatbot. It's a collaborator that understands your codebase, your intent, and your workflow.",
      },
      {
        type: "text",
        content:
          "This pre-work prepares you for your upcoming facilitated session. By completing these sections, you'll arrive ready to dive deep — not just watch. Each section builds on the last, giving you the context and confidence to make the most of your hands-on time.",
      },
      {
        type: "glossary",
        title: "Key Terms to Know",
        terms: [
          {
            term: "AI (Artificial Intelligence)",
            definition: "Software that can learn, reason, and generate content — like text, code, or images. Think of it as a very capable assistant that can process information and create output at superhuman speed.",
          },
          {
            term: "Claude",
            definition: "An AI model made by Anthropic. It's the \"brain\" behind Claude Code. Claude can understand natural language, write code, analyze documents, and reason through complex problems. It's like talking to a very knowledgeable colleague.",
          },
          {
            term: "Claude Code",
            definition: "Anthropic's tool that lets you use Claude directly in your terminal (command line). It reads your files, writes code, runs commands, and works alongside you — like a pair programmer that never sleeps.",
          },
          {
            term: "CLI (Command Line Interface)",
            definition: "A text-based way to interact with your computer by typing commands instead of clicking buttons. It's the black screen with text that developers use. Claude Code runs here.",
          },
          {
            term: "Terminal",
            definition: "The application on your computer that provides the CLI. On Mac it's called Terminal, on Windows it's Command Prompt or PowerShell. This is where you'll run Claude Code.",
          },
          {
            term: "Prompt",
            definition: "The instruction or question you give to an AI. A good prompt is clear, specific, and gives context. The better your prompt, the better the output. Think of it as briefing a colleague.",
          },
          {
            term: "MCP (Model Context Protocol)",
            definition: "A way to connect Claude to external tools and data sources — like Slack, GitHub, databases, or internal systems. MCPs extend what Claude can see and do beyond just text conversations.",
          },
          {
            term: "Skills",
            definition: "Reusable instruction sets that teach Claude how to perform specific tasks — like following your brand guidelines, writing tests, or reviewing code. Think of them as playbooks that Claude follows.",
          },
          {
            term: "Agent / Agentic AI",
            definition: "AI that can independently plan and execute multi-step tasks — not just answer one question at a time. Claude Code is agentic: it can break down a big task, work through each step, and course-correct along the way.",
          },
          {
            term: "LLM (Large Language Model)",
            definition: "The type of AI that powers Claude. It's trained on vast amounts of text to understand and generate human language. \"Large\" refers to the billions of parameters (settings) that shape its understanding.",
          },
          {
            term: "Context Window",
            definition: "The amount of information Claude can \"see\" at once. Think of it as Claude's working memory. Larger context windows mean Claude can process longer documents or bigger codebases in a single conversation.",
          },
          {
            term: "Token",
            definition: "The basic unit AI uses to process text. Roughly, 1 token ≈ 4 characters or ¾ of a word. When people talk about AI costs or limits, they're usually talking about tokens.",
          },
        ],
      },
      {
        type: "callout",
        title: "What to expect",
        items: [
          "6 sections of pre-work",
          "A facilitated hands-on session",
          "Real Olive Garden use cases to practice with",
        ],
      },
    ],
  },
  "what-is-claude-code": {
    blocks: [
      {
        type: "text",
        content:
          "Claude Code is Anthropic's agentic coding tool. It lives in your terminal, reads your codebase, writes code, runs commands, and iterates with you in real-time. It's not an autocomplete engine — it's an autonomous agent that can plan, execute, and refine complex tasks.",
      },
      {
        type: "quote",
        content:
          "Think of it as pair programming with a senior developer who has read every file in your project.",
      },
      {
        type: "text",
        content:
          "Unlike ChatGPT or Copilot, Claude Code doesn't just autocomplete — it reasons. It can plan multi-step implementations, debug complex issues, refactor entire modules, and explain architectural decisions. It operates directly in your terminal, with full access to your project files and tools.",
      },
      {
        type: "video",
        title: "Claude Code in Action",
        url: "https://www.youtube.com/embed/placeholder",
      },
      {
        type: "callout",
        title: "Key capabilities",
        items: [
          "Reads and understands your entire codebase",
          "Writes, edits, and creates files",
          "Runs terminal commands and tests",
          "Multi-step planning and execution",
          "Git operations and PR creation",
        ],
      },
      {
        type: "text",
        content:
          "Before we go further, let's demystify some of the technology behind the tools we use at Olive Garden. You don't need to be an engineer to understand this — and understanding it will make you far more effective with Claude Code.",
      },
      {
        type: "glossary",
        title: "Front-End vs Back-End",
        terms: [
          {
            term: "Front-End",
            definition: "Everything the user sees and interacts with — buttons, pages, forms, animations. It's the visual layer. When you visit olivegarden.com and click around, that's the front-end. Built with HTML, CSS, and JavaScript (often using frameworks like React or Next.js).",
          },
          {
            term: "Back-End",
            definition: "The behind-the-scenes engine that powers the app. It handles data, logic, user accounts, and communication with databases. You never see it directly, but it's why you can log in, save progress, and see a leaderboard. Think of it as the kitchen in a restaurant — the front-end is the dining room.",
          },
          {
            term: "Full-Stack",
            definition: "When someone works on both front-end and back-end. Claude Code is a full-stack tool — it can build the UI you see AND the server logic behind it, all in one conversation.",
          },
          {
            term: "Database",
            definition: "Where all the app's data lives — user accounts, progress, scores, content. It's like a giant organized spreadsheet that the back-end reads from and writes to. At Olive Garden, we use Supabase, which is a database with superpowers (auth, real-time updates, and more).",
          },
          {
            term: "API (Application Programming Interface)",
            definition: "The way different systems talk to each other. When the front-end needs data from the back-end, it makes an API call. Think of it as a waiter taking your order (front-end) to the kitchen (back-end) and bringing back food (data).",
          },
          {
            term: "Deployment",
            definition: "The process of making your app live on the internet so others can use it. You write code locally, then \"deploy\" it to a server. At Olive Garden, we deploy to Vercel — it takes our code and makes it available at a URL anyone can visit.",
          },
        ],
      },
      {
        type: "glossary",
        title: "The Olive Garden Toolkit",
        terms: [
          {
            term: "GitHub",
            definition: "Where all of Olive Garden's code lives. Think of it as Google Drive, but for code. Every change is tracked, so you can see who changed what and when. Teams collaborate here by creating \"branches\" (copies) and \"pull requests\" (proposals to merge changes). Claude Code connects directly to GitHub.",
          },
          {
            term: "Vercel",
            definition: "Our hosting platform — it takes code from GitHub and puts it live on the internet. When an engineer pushes code, Vercel automatically builds and deploys it. This training portal you're using right now is hosted on Vercel.",
          },
          {
            term: "Claude Code (Mac App)",
            definition: "The desktop application you'll download from Anthropic. It gives you a terminal interface to chat with Claude, who can read your project files, write code, run commands, and help you build things. Download it at claude.ai and install it like any Mac app.",
          },
          {
            term: "Supabase",
            definition: "Our back-end platform. It provides the database (where data is stored), authentication (Google sign-in), and real-time features (live leaderboard updates). Think of it as the engine room — you don't see it, but everything runs on it.",
          },
          {
            term: "Next.js",
            definition: "The framework we use to build web apps (like this portal). It's built on top of React and handles both the front-end (what you see) and back-end (server logic) in one project. Claude Code is excellent at writing Next.js code.",
          },
          {
            term: "Tailwind CSS",
            definition: "A tool for styling web pages. Instead of writing custom design code from scratch, you use pre-built utility classes. It's how this portal gets its Olive Garden brand colors, spacing, and typography without writing thousands of lines of CSS.",
          },
        ],
      },
      {
        type: "quote",
        content:
          "You don't need to memorize any of this. The goal is familiarity — when someone says \"push to GitHub\" or \"check the Supabase dashboard,\" you'll know what they mean.",
      },
    ],
  },
  "claude-at-clutch": {
    blocks: [
      {
        type: "text",
        content:
          "Claude Code isn't just for engineers. At Olive Garden, we see opportunity across every role — from leadership to production to customer-facing teams. The key is learning to think in terms of delegation: what tasks can you hand off to a brilliant, tireless assistant?",
      },
      {
        type: "callout",
        title: "Leaders & Managers",
        items: [
          "Generate reports and data analysis faster",
          "Draft strategic documents and presentations",
          "Automate repetitive operational tasks",
        ],
      },
      {
        type: "callout",
        title: "Production & Operations",
        items: [
          "Streamline inspection workflows",
          "Automate quality checklists",
          "Process documentation at scale",
        ],
      },
      {
        type: "callout",
        title: "Engineers & Developers",
        items: [
          "Ship features faster with AI pair programming",
          "Debug complex issues with codebase-aware AI",
          "Automate testing and code review",
        ],
      },
      {
        type: "callout",
        title: "All Roles",
        items: [
          "Writing and editing with AI assistance",
          "Research and summarization",
          "Building custom tools and automations",
        ],
      },
      {
        type: "quote",
        content:
          "Join the conversation in #appliedai on Slack — share what you're building, ask questions, and learn from your teammates.",
      },
      {
        type: "link",
        title: "#appliedai on Slack",
        url: "#",
        description:
          "Our internal community for Claude experiments and wins",
      },
    ],
  },
  "the-rules": {
    blocks: [
      {
        type: "text",
        content:
          "With great power comes great responsibility. Claude Code is incredibly capable, but using it responsibly is non-negotiable at Olive Garden. These rules aren't restrictions — they're the foundation of trust that lets us move fast.",
      },
      {
        type: "quote",
        content:
          "Everything Claude writes, you own. It represents you. Review it like you wrote it yourself.",
      },
      {
        type: "callout",
        title: "Claude Represents YOU",
        items: [
          "Every output carries your name — review everything before sharing",
          "You are accountable for what Claude produces",
          "If you wouldn't put your name on it manually, don't put it on AI output",
        ],
      },
      {
        type: "callout",
        title: "Customer Data & Privacy",
        items: [
          "NEVER paste customer PII into Claude",
          "Don't share financial data, addresses, or phone numbers",
          "Use anonymized or synthetic data for testing",
          "When in doubt, ask your manager",
        ],
      },
      {
        type: "callout",
        title: "Information Security",
        items: [
          "Don't share API keys, passwords, or credentials",
          "Don't paste proprietary business logic into external AI tools",
          "Claude Code (CLI) keeps data local — prefer it over web-based AI",
          "Follow Olive Garden's security policies at all times",
        ],
      },
      {
        type: "callout",
        title: "Safety Guardrails",
        items: [
          "Claude will refuse harmful or unethical requests — this is by design",
          "If something feels wrong, it probably is — escalate",
          "AI is a tool, not a replacement for human judgment",
        ],
      },
    ],
  },
  "getting-started": {
    blocks: [
      {
        type: "text",
        content:
          "Ready to get your hands dirty? Here's everything you need to set up Claude Code and start your journey. Don't worry — it takes less than five minutes.",
      },
      {
        type: "callout",
        title: "Setup Steps",
        items: [
          "1. Install Claude Code CLI from Anthropic",
          "2. Authenticate with your Olive Garden credentials",
          "3. Open a project in your terminal",
          "4. Run: claude and start a conversation",
        ],
      },
      {
        type: "video",
        title: "Getting Started with Claude Code",
        url: "https://www.youtube.com/embed/placeholder",
      },
      {
        type: "link",
        title: "Anthropic Training Portal",
        url: "https://docs.anthropic.com/en/docs/claude-code",
        description: "Official documentation and tutorials",
      },
      {
        type: "link",
        title: "Claude Code GitHub",
        url: "https://github.com/anthropics/claude-code",
        description: "Source code, examples, and community",
      },
      {
        type: "text",
        content:
          "Don't worry about mastering everything before the session. The goal is to be familiar enough to jump right in during the facilitated training. Curiosity is your best tool right now.",
      },
    ],
  },
  "whats-next": {
    blocks: [
      {
        type: "text",
        content:
          "You've done the pre-work. You understand what Claude Code is, how Olive Garden plans to use it, and the rules of engagement. Now it's time for the real thing.",
      },
      {
        type: "quote",
        content:
          "The facilitated session is where theory becomes practice. Come ready to build something real.",
      },
      {
        type: "callout",
        title: "What to expect in the session",
        items: [
          "Hands-on exercises with Claude Code",
          "Real Olive Garden use cases tailored to your role",
          "Live coding and problem-solving",
          "Q&A with your facilitator",
          "Tips and advanced techniques",
        ],
      },
      {
        type: "callout",
        title: "How to prepare",
        items: [
          "Complete all 6 sections of this pre-work",
          "Have Claude Code installed (Getting Started section)",
          "Bring a laptop with terminal access",
          "Think of a task you do repeatedly — we'll automate it",
        ],
      },
      {
        type: "text",
        content:
          "See you there. Let's build the future of Olive Garden together.",
      },
    ],
  },
};

/* ──────────────────────────────────────────────
   Confetti Particles
   ────────────────────────────────────────────── */

function ConfettiParticle({ index }: { index: number }) {
  const colors = ["#A8AD00", "#CA7C30", "#54301A", "#C4C84D", "#CA7C30"];
  const color = colors[index % colors.length];
  const angle = (index / 12) * 360;
  const distance = 60 + Math.random() * 80;
  const x = Math.cos((angle * Math.PI) / 180) * distance;
  const y = Math.sin((angle * Math.PI) / 180) * distance;
  const rotation = Math.random() * 720 - 360;
  const size = 4 + Math.random() * 6;

  return (
    <motion.div
      initial={{ opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 }}
      animate={{
        opacity: 0,
        x,
        y: y - 40,
        scale: 0,
        rotate: rotation,
      }}
      transition={{ duration: 0.8, ease: "easeOut" as const }}
      className="absolute rounded-full"
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        top: "50%",
        left: "50%",
      }}
    />
  );
}

/* ──────────────────────────────────────────────
   Block Renderers
   ────────────────────────────────────────────── */

function TextBlock({ content, index }: { content: string; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="cream-card p-6 md:p-8"
    >
      <p className="font-body text-og-dark leading-[1.8] text-base md:text-lg">
        {content}
      </p>
    </motion.div>
  );
}

function QuoteBlock({ content }: { content: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: "easeOut" as const }}
      className="wood-quote rounded-xl -mx-4 md:-mx-12"
    >
      <p className="relative z-1">
        <span className="text-og-warm-gray/40 mr-2" aria-hidden="true">&mdash;&ensp;</span>
        {content}
        <span className="text-og-warm-gray/40 ml-2" aria-hidden="true">&ensp;&mdash;</span>
      </p>
    </motion.div>
  );
}

function CalloutBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5 }}
      className="cream-card overflow-hidden border-l-4 border-og-orange"
    >
      <div className="p-5">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-og-orange/15">
            <svg
              className="h-4 w-4 text-og-orange"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="font-display font-bold text-og-dark text-lg">
            {title}
          </h3>
        </div>
      </div>
      <ul className="space-y-3 px-6 pb-6">
        {items.map((item, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: i * 0.08 }}
            className="flex items-start gap-3 text-og-dark/80"
          >
            <span className="mt-1.5 block h-2 w-2 flex-shrink-0 rounded-full bg-og-green" />
            <span className="font-body text-base leading-relaxed md:text-lg">
              {item}
            </span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}

function VideoBlock({ title, url }: { title: string; url: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6 }}
      className="cream-card overflow-hidden"
    >
      <div className="border-b border-og-brown/15 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-og-green">
            <svg
              className="h-4 w-4 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
          <span className="font-display font-bold text-og-dark text-sm uppercase tracking-widest">
            {title}
          </span>
        </div>
      </div>
      <div className="relative aspect-video w-full bg-og-dark">
        <iframe
          src={url}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      </div>
    </motion.div>
  );
}

function LinkBlock({
  title,
  url,
  description,
}: {
  title: string;
  url: string;
  description: string;
}) {
  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -2 }}
      className="group block cream-card p-6 border-l-4 border-og-green"
    >
      <div className="flex items-center gap-4">
        <div className="min-w-0 flex-1">
          <h4 className="font-display font-bold text-og-teal group-hover:text-og-green transition-colors text-lg">
            {title}
          </h4>
          <p className="mt-1 font-body text-og-dark/60 text-sm">
            {description}
          </p>
        </div>
        <svg
          className="h-5 w-5 flex-shrink-0 text-og-dark/30 transition-all group-hover:translate-x-1 group-hover:text-og-green"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
          />
        </svg>
      </div>
    </motion.a>
  );
}

/* ──────────────────────────────────────────────
   Glossary Block
   ────────────────────────────────────────────── */

function GlossaryBlock({
  title,
  terms,
}: {
  title: string;
  terms: GlossaryTerm[];
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6 }}
      className="cream-card p-6 md:p-8"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-og-brown/10">
          <svg className="h-5 w-5 text-og-brown" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </div>
        <h3 className="font-display font-bold text-og-dark text-2xl">
          {title}
        </h3>
      </div>

      {/* Terms grid */}
      <div className="grid gap-4 sm:grid-cols-2">
        {terms.map((item, i) => (
          <motion.div
            key={item.term}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="rounded-lg bg-og-warm-gray/20 p-4"
          >
            <dt className="font-display font-bold text-og-brown text-base mb-2">
              {item.term}
            </dt>
            <dd className="font-body text-og-dark/70 text-sm leading-relaxed">
              {item.definition}
            </dd>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

/* ──────────────────────────────────────────────
   Block Router
   ────────────────────────────────────────────── */

function ContentBlock({ block, index }: { block: Block; index: number }) {
  switch (block.type) {
    case "text":
      return <TextBlock content={block.content} index={index} />;
    case "quote":
      return <QuoteBlock content={block.content} />;
    case "callout":
      return <CalloutBlock title={block.title} items={block.items} />;
    case "video":
      return <VideoBlock title={block.title} url={block.url} />;
    case "link":
      return (
        <LinkBlock
          title={block.title}
          url={block.url}
          description={block.description}
        />
      );
    case "glossary":
      return <GlossaryBlock title={block.title} terms={block.terms} />;
    default:
      return null;
  }
}

/* ──────────────────────────────────────────────
   Main Page Component
   ────────────────────────────────────────────── */

/* ──────────────────────────────────────────────
   Photo Strip Images (cycle through)
   ────────────────────────────────────────────── */

const PHOTO_STRIP_IMAGES = [
  "/images/og-extracted/page5-img1.jpg",
  "/images/og-extracted/page5-img4.jpg",
  "/images/og-extracted/page5-img5.jpg",
];

/* ──────────────────────────────────────────────
   Scroll Progress Bar
   ────────────────────────────────────────────── */

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <motion.div
      style={{ scaleX, transformOrigin: "0%" }}
      className="fixed top-0 left-0 right-0 h-[3px] z-[9999] bg-og-green"
    />
  );
}

/* ──────────────────────────────────────────────
   Main Page Component
   ────────────────────────────────────────────── */

export default function LearnSectionPage() {
  const params = useParams();
  const slug = params.slug as string;

  const sectionIndex = SECTIONS.findIndex((s) => s.slug === slug);
  const section = SECTIONS[sectionIndex];
  const content = SECTION_CONTENT[slug];

  const prevSection = sectionIndex > 0 ? SECTIONS[sectionIndex - 1] : null;
  const nextSection =
    sectionIndex < SECTIONS.length - 1 ? SECTIONS[sectionIndex + 1] : null;

  const [completed, setCompleted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [pointsVisible, setPointsVisible] = useState(false);

  const handleComplete = useCallback(() => {
    if (completed || !section) return;
    setCompleted(true);
    setShowConfetti(true);

    setTimeout(() => {
      setPointsVisible(true);
    }, 600);

    setTimeout(() => {
      setShowConfetti(false);
    }, 1200);
  }, [completed, section]);

  /* ── 404 state ── */
  if (!section || !content) {
    return (
      <div className="relative z-2 min-h-screen flex flex-col items-center justify-center px-6">
        <div className="cream-card p-8 text-center max-w-md">
          <h1 className="font-display text-3xl font-bold text-og-dark mb-3">
            Section Not Found
          </h1>
          <p className="font-body text-og-dark/60 mb-6">
            The section you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link
            href="/dashboard"
            className="inline-block bg-og-green text-og-dark font-display font-bold rounded-xl px-6 py-3 text-sm transition-transform hover:scale-105"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative z-2 min-h-screen">
      {/* ═══════════════════════════════════════════
          SCROLL PROGRESS BAR
          ═══════════════════════════════════════════ */}
      <ScrollProgress />

      {/* ═══════════════════════════════════════════
          NAV BAR (same as dashboard)
          ═══════════════════════════════════════════ */}
      <nav className="sticky top-0 z-50 bg-og-brown/95 backdrop-blur-sm border-b border-og-brown-light/30 border-b-2 border-b-og-green/40">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-8 py-3">
          {/* Left: Logo */}
          <Link href="/dashboard" className="flex-shrink-0">
            <Image
              src="/images/og-extracted/page1-img2.jpg"
              alt="Olive Garden"
              width={80}
              height={40}
              className="rounded-md h-10 w-auto object-contain"
            />
          </Link>

          {/* Center: Nav links */}
          <div className="flex items-center gap-6">
            <Link
              href="/dashboard"
              className="font-display text-sm text-og-warm-gray/60 hover:text-og-cream transition-colors"
            >
              Dashboard
            </Link>
            <Link
              href="/leaderboard"
              className="font-display text-sm text-og-warm-gray/60 hover:text-og-cream transition-colors"
            >
              Leaderboard
            </Link>
          </div>

          {/* Right: Back to dashboard */}
          <Link
            href="/dashboard"
            className="font-display text-xs font-bold text-og-cream/70 hover:text-og-cream bg-og-brown-light/20 hover:bg-og-brown-light/30 px-3 py-1.5 rounded-lg transition-colors"
          >
            Back to Dashboard
          </Link>
        </div>
      </nav>

      {/* ═══════════════════════════════════════════
          LESSON HEADER — Cream Banner Card
          ═══════════════════════════════════════════ */}
      <section className="relative z-2 px-4 md:px-8 pt-8 md:pt-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="cream-card max-w-[780px] mx-auto overflow-hidden"
        >
          {/* Hero photo banner */}
          <div className="relative h-56 w-full">
            <Image
              src={`/images/${section.heroImage}`}
              alt={section.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Content area */}
          <div className="p-8">
            <h1 className="script-heading text-og-dark text-3xl md:text-4xl">
              {section.title}
            </h1>
            <p className="font-body italic text-og-dark/60 mt-2 text-lg">
              {section.description}
            </p>

            {/* Points badge */}
            <div className="mt-4">
              <span className="bg-og-green text-og-dark font-display font-bold text-xs px-3 py-1 rounded-full inline-flex items-center gap-1.5">
                <svg
                  className="h-3.5 w-3.5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                {section.points} pts
              </span>
            </div>

            {/* Olive divider */}
            <div className="olive-divider mt-6" />
          </div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════
          CONTENT BODY
          ═══════════════════════════════════════════ */}
      <section className="relative z-2 px-4 md:px-8 py-12 md:py-16">
        <div className="max-w-[680px] mx-auto space-y-8">
          {content.blocks.map((block, i) => (
            <div key={i}>
              <ContentBlock block={block} index={i} />

              {/* Photo strip after every 3rd block */}
              {(i + 1) % 3 === 0 && i < content.blocks.length - 1 && (
                <div className="photo-strip mt-8 rounded-xl overflow-hidden">
                  <Image
                    src={PHOTO_STRIP_IMAGES[Math.floor(i / 3) % PHOTO_STRIP_IMAGES.length]}
                    alt="Italian cuisine"
                    width={680}
                    height={200}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          MARK COMPLETE — Completion Footer
          ═══════════════════════════════════════════ */}
      <section className="relative z-2 px-4 md:px-8 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="cream-card p-8 text-center max-w-[680px] mx-auto"
        >
          <h2 className="font-display font-bold text-og-dark text-2xl">
            {completed ? "Section Complete!" : "Finished reading?"}
          </h2>
          <p className="mt-3 max-w-md mx-auto font-body text-og-dark/50">
            {completed
              ? "Great work. Keep the momentum going."
              : "Mark this section complete to earn your points and unlock the next step."}
          </p>

          {/* Button area */}
          <div className="relative mt-8 inline-block">
            {/* Confetti */}
            <AnimatePresence>
              {showConfetti && (
                <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <ConfettiParticle key={i} index={i} />
                  ))}
                </div>
              )}
            </AnimatePresence>

            <motion.button
              onClick={handleComplete}
              disabled={completed}
              whileHover={completed ? {} : { scale: 1.05 }}
              whileTap={completed ? {} : { scale: 0.97 }}
              className={`relative overflow-hidden rounded-xl px-8 py-4 font-display font-bold text-base transition-all duration-300 shadow-lg ${
                completed
                  ? "cursor-default bg-og-green/20 text-og-green"
                  : "bg-og-green text-og-dark hover:shadow-xl"
              }`}
            >
              <AnimatePresence mode="wait">
                {completed ? (
                  <motion.span
                    key="done"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center gap-2"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Completed
                  </motion.span>
                ) : (
                  <motion.span
                    key="action"
                    exit={{ opacity: 0, scale: 0.5 }}
                  >
                    Mark as Complete
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>

          {/* Points counter */}
          <AnimatePresence>
            {pointsVisible && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" as const }}
                className="mt-5 flex items-center justify-center gap-2"
              >
                <svg
                  className="h-5 w-5 text-og-green"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                <span className="font-display text-lg font-bold text-og-green">
                  +{section.points} pts
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════
          PREVIOUS / NEXT NAVIGATION
          ═══════════════════════════════════════════ */}
      <nav className="relative z-2 px-4 md:px-8 pb-24 pt-4">
        <div className="max-w-[680px] mx-auto flex items-stretch gap-4">
          {/* Previous */}
          {prevSection ? (
            <Link
              href={`/learn/${prevSection.slug}`}
              className="group flex flex-1 flex-col items-start cream-card p-6 transition-transform hover:-translate-y-0.5"
            >
              <span className="font-display text-xs font-bold uppercase tracking-widest text-og-dark/40">
                Previous
              </span>
              <span className="mt-2 font-display text-lg font-bold text-og-dark transition-colors group-hover:text-og-green">
                {prevSection.title}
              </span>
            </Link>
          ) : (
            <Link
              href="/dashboard"
              className="group flex flex-1 flex-col items-start cream-card p-6 transition-transform hover:-translate-y-0.5"
            >
              <span className="font-display text-xs font-bold uppercase tracking-widest text-og-dark/40">
                Back to
              </span>
              <span className="mt-2 font-display text-lg font-bold text-og-dark transition-colors group-hover:text-og-green">
                Dashboard
              </span>
            </Link>
          )}

          {/* Next */}
          {nextSection ? (
            <Link
              href={`/learn/${nextSection.slug}`}
              className="group flex flex-1 flex-col items-end cream-card p-6 text-right transition-transform hover:-translate-y-0.5"
            >
              <span className="font-display text-xs font-bold uppercase tracking-widest text-og-dark/40">
                Next Course
              </span>
              <span className="mt-2 font-display text-lg font-bold text-og-dark transition-colors group-hover:text-og-green">
                {nextSection.title}
              </span>
            </Link>
          ) : (
            <Link
              href="/dashboard"
              className="group flex flex-1 flex-col items-end cream-card p-6 text-right transition-transform hover:-translate-y-0.5"
            >
              <span className="font-display text-xs font-bold uppercase tracking-widest text-og-dark/40">
                Back to
              </span>
              <span className="mt-2 font-display text-lg font-bold text-og-dark transition-colors group-hover:text-og-green">
                Dashboard
              </span>
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
}
