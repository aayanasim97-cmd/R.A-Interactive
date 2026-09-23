export type Service = {
  slug: string;
  title: string;
  outcome: string;
  description: string;
  includes: string[];
  underTheHood: string;
};

// Outcome-first: what the client GETS, not the tech we use.
export const services: Service[] = [
  {
    slug: "business-websites",
    title: "Business Websites",
    outcome: "A site that makes you look established and books more calls.",
    description:
      "A fast, polished website that earns trust in the first few seconds and turns visitors into inquiries. Perfect for local businesses, clinics, consultancies, and service providers.",
    includes: [
      "Custom design in your brand",
      "Mobile-perfect, loads in under 2 seconds",
      "Clear calls-to-action & contact forms",
      "Google-ready SEO foundation",
      "Copywriting guidance in plain language",
    ],
    underTheHood:
      "Next.js static generation, Tailwind design system, image optimization, and Core Web Vitals tuned to green.",
  },
  {
    slug: "web-apps",
    title: "Web Apps & Dashboards",
    outcome: "Software your customers actually enjoy using.",
    description:
      "Interactive products — dashboards, portals, AI tools, booking systems — built to feel effortless. We handle the hard engineering so the experience stays simple.",
    includes: [
      "Product & UX design",
      "Secure user accounts & data",
      "Third-party & AI integrations",
      "Realtime, responsive interfaces",
      "Deployment & handover",
    ],
    underTheHood:
      "React + TypeScript, serverless APIs on Vercel, Supabase/Postgres, and LLM orchestration where it earns its place.",
  },
  {
    slug: "local-business",
    title: "Local Business Growth",
    outcome: "Get found on Google and win the customers nearby.",
    description:
      "A conversion-focused site plus the local SEO setup that gets you into the top results when someone nearby searches for what you offer.",
    includes: [
      "Conversion-focused landing pages",
      "Local SEO & Google Business setup",
      "WhatsApp / call / booking flows",
      "Reviews & trust signals",
      "Per-service and per-city pages",
    ],
    underTheHood:
      "LocalBusiness schema, per-location landing pages, structured data, and analytics wired to Search Console.",
  },
];
