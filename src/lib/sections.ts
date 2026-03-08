export type Section = {
  id: string;
  title: string;
  slug: string;
  order: number;
  points: number;
  description: string;
  heroImage: string;
  accentColor: string;
};

export const SECTIONS: Section[] = [
  {
    id: "welcome",
    title: "Welcome",
    slug: "why-this-matters",
    order: 1,
    points: 100,
    description: "Clutch's AI vision and why Claude Code matters",
    heroImage: "hero-building.jpg",
    accentColor: "#FF464C",
  },
  {
    id: "what-is-claude-code",
    title: "What is Claude Code?",
    slug: "what-is-claude-code",
    order: 2,
    points: 100,
    description: "Overview, capabilities, and what sets it apart",
    heroImage: "hero-3d-logo.jpg",
    accentColor: "#550E30",
  },
  {
    id: "claude-at-clutch",
    title: "Claude @ Clutch",
    slug: "claude-at-clutch",
    order: 3,
    points: 150,
    description:
      "How every role at Clutch — from leaders to engineers — uses Claude",
    heroImage: "hero-sunglasses.jpg",
    accentColor: "#FF464C",
  },
  {
    id: "the-rules",
    title: "The Rules",
    slug: "the-rules",
    order: 4,
    points: 150,
    description:
      "Responsible AI: Claude represents you, data safety, and guardrails",
    heroImage: "hero-billboard.jpg",
    accentColor: "#550E30",
  },
  {
    id: "getting-started",
    title: "Getting Started",
    slug: "getting-started",
    order: 5,
    points: 100,
    description: "Setup, resources, and your first steps with Claude Code",
    heroImage: "hero-sunset-truck.jpg",
    accentColor: "#FF464C",
  },
  {
    id: "whats-next",
    title: "What's Next",
    slug: "whats-next",
    order: 6,
    points: 100,
    description:
      "Preview of your facilitated session and how to come prepared",
    heroImage: "brand-collage.jpg",
    accentColor: "#550E30",
  },
];

export const TOTAL_POINTS = 700;
