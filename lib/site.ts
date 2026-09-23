export const site = {
  name: "RA Interactive",
  shortName: "RA Interactive",
  domain: "rainteractive.com",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://rainteractive.com",
  tagline: "Websites & apps that get you more customers",
  description:
    "RA Interactive is a web development agency that builds fast, beautiful websites and web apps with genuinely live, interactive previews. We turn visitors into customers.",
  email: "hello@rainteractive.com",
  phone: "+92 300 0000000",
  location: "Islamabad, Pakistan · Working worldwide",
  responsePromise: "We reply to every inquiry within 1 business day.",
  social: {
    // Placeholders — swap for real handles at launch.
    twitter: "@rainteractive",
    linkedin: "https://www.linkedin.com/company/rainteractive",
    github: "https://github.com/rainteractive",
  },
  nav: [
    { label: "Work", href: "/work" },
    { label: "Services", href: "/services" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
} as const;

export const stats = [
  { value: "5+", label: "Live projects shipped" },
  { value: "≥90", label: "Lighthouse performance" },
  { value: "<1 day", label: "Reply to inquiries" },
  { value: "100%", label: "Mobile-first builds" },
] as const;
