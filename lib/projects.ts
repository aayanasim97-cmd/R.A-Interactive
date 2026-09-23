export type ProjectCategory = "Business Websites" | "Web Apps" | "Local Business";

export type Project = {
  slug: string;
  name: string;
  type: string;
  category: ProjectCategory;
  liveUrl: string;
  domain: string;
  // Whether we're confident the site permits framing. Our own hosted projects = true.
  // Anything uncertain defaults to the screenshot fallback until confirmed per-site.
  allowEmbed: boolean;
  // Screenshot used as the default lightweight preview + fallback.
  screenshot: string;
  result: string; // one-line outcome shown on cards
  tags: string[];
  accentResults: { value: string; label: string }[];
  summary: string;
  problem: string;
  build: string;
  outcome: string;
  featured: boolean;
};

export const projects: Project[] = [
  {
    slug: "studyforge-ai",
    name: "StudyForge AI",
    type: "AI SaaS web app",
    category: "Web Apps",
    liveUrl: "https://fabolous-ai.vercel.app",
    domain: "fabolous-ai.vercel.app",
    allowEmbed: true, // hosted on our own Vercel — full control of embedding headers
    screenshot: "/previews/studyforge.svg",
    result: "One workspace for tutoring, summaries & active recall.",
    tags: ["AI", "SaaS", "Next.js", "Vercel"],
    accentResults: [
      { value: "3-in-1", label: "study tools unified" },
      { value: "Live", label: "fully interactive demo" },
    ],
    summary:
      "An AI-powered study workspace that brings Socratic tutoring, an academic summarizer, and an active-recall engine into one minimal interface.",
    problem:
      "Students juggle a dozen disconnected apps — chatbots, flashcards, note summarizers — losing focus switching between them.",
    build:
      "A single, distraction-free workspace with a clean three-step study pipeline: learn with a Socratic AI tutor, summarize source material, then lock it in with active recall. Built and hosted on our own Vercel infrastructure, which makes it the ideal genuinely-live preview.",
    outcome:
      "A cohesive product that replaces three tools with one — and, because we control the hosting, the perfect showcase for a real, scrollable live preview embedded right on this site.",
    featured: true,
  },
  {
    slug: "5fourteen",
    name: "5Fourteen",
    type: "AI & business consulting",
    category: "Business Websites",
    liveUrl: "https://5-fourteen.com",
    domain: "5-fourteen.com",
    allowEmbed: true, // verified: no X-Frame-Options / frame-ancestors — embeds live
    screenshot: "/previews/5fourteen.svg",
    result: "Enterprise-grade B2B site for a complex offering.",
    tags: ["B2B", "Consulting", "Corporate"],
    accentResults: [
      { value: "Enterprise", label: "lead positioning" },
      { value: "Clear", label: "complex offering made simple" },
    ],
    summary:
      "A corporate website for an AI strategy and business-transformation consultancy, built to communicate a complex offering clearly and convert enterprise leads.",
    problem:
      "A sophisticated consulting offering was hard to grasp quickly, and the brand needed to signal credibility to enterprise buyers.",
    build:
      "A strong B2B visual identity paired with structured service and industry pages, a case-study-driven layout, and a clear engagement process — readable on desktop and mobile.",
    outcome:
      "A site that makes a complex, high-value service understandable in seconds and routes serious buyers toward a conversation.",
    featured: true,
  },
  {
    slug: "capital-rent-a-car",
    name: "Capital Rent A Car",
    type: "Car rental / local business",
    category: "Local Business",
    liveUrl: "https://capitalrentacar.pk",
    domain: "capitalrentacar.pk",
    allowEmbed: false, // sends X-Frame-Options: SAMEORIGIN — cannot be framed; snapshot fallback
    screenshot: "/previews/capital.svg",
    result: "3-step booking with instant WhatsApp confirmation.",
    tags: ["Local", "Booking", "WhatsApp"],
    accentResults: [
      { value: "3 steps", label: "to a booking" },
      { value: "Instant", label: "WhatsApp confirmation" },
    ],
    summary:
      "A conversion-focused website for a Pakistan-based car rental business offering self-drive and chauffeur options to a non-technical local audience.",
    problem:
      "A local rental business needed a simple way for non-technical customers to browse the fleet and book without friction.",
    build:
      "Fleet presented by category, a simple three-step booking flow with instant WhatsApp confirmation, service pages (airport transfers, city tours, outstation trips, weddings), trust stats, and testimonials.",
    outcome:
      "A booking experience anyone can complete in under a minute — turning local searches into confirmed rentals over WhatsApp.",
    featured: true,
  },
  {
    slug: "sherry-lane-dental",
    name: "Sherry Lane Dental",
    type: "Healthcare / dental",
    category: "Business Websites",
    liveUrl: "https://sherrylanedental.com",
    domain: "sherrylanedental.com",
    allowEmbed: true, // verified: no X-Frame-Options / frame-ancestors — embeds live
    screenshot: "/previews/sherrylane.svg",
    result: "Turns first-time visitors into booked patients.",
    tags: ["Healthcare", "Dental", "Bookings"],
    accentResults: [
      { value: "Patient-first", label: "navigation" },
      { value: "Prominent", label: "booking CTAs" },
    ],
    summary:
      "A polished business website for a modern dental practice, focused on approachable, healthcare-appropriate design.",
    problem:
      "A dental practice needed a welcoming, trustworthy online presence that made booking obvious for anxious first-time patients.",
    build:
      "Clear service presentation, patient-focused navigation, a fully responsive layout, and prominent appointment and contact CTAs throughout.",
    outcome:
      "A warm, credible site that converts first-time visitors into booked patients.",
    featured: false,
  },
  {
    slug: "dev-oriented",
    name: "Dev Oriented",
    type: "Software agency (our previous brand)",
    category: "Business Websites",
    liveUrl: "https://devoriented.com",
    domain: "devoriented.com",
    allowEmbed: true, // verified: no X-Frame-Options / frame-ancestors — embeds live
    screenshot: "/previews/devoriented.svg",
    result: "The engineering-led brand this site evolves from.",
    tags: ["Agency", "Portfolio", "Motion"],
    accentResults: [
      { value: "Benchmark", label: "our visual baseline" },
      { value: "Evolved", label: "warmer, faster, live" },
    ],
    summary:
      "Our previous agency/portfolio site and the visual benchmark this project builds on — a dark, engineering-led brand with bold typography, scroll-reveal motion, and glassmorphic UI.",
    problem:
      "A dark, developer-focused brand looked impressive to engineers but spoke past non-technical buyers, and only faked its live previews.",
    build:
      "RA Interactive keeps that craft — bold type, scroll-reveal motion, glassmorphic panels — while adding genuinely live previews, warmer and more approachable messaging, and a stronger SEO foundation.",
    outcome:
      "The starting point we measured everything against — and beat, with the site you're reading now.",
    featured: false,
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export const projectCategories: ProjectCategory[] = [
  "Business Websites",
  "Web Apps",
  "Local Business",
];

export const featuredProjects = projects.filter((p) => p.featured);
