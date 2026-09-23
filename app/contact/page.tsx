import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { Reveal } from "@/components/Reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact — Start your project",
  description:
    "Tell us about your project and get honest advice plus a clear, tailored quote. RA Interactive replies to every inquiry within one business day.",
  alternates: { canonical: "/contact" },
};

const reasons = [
  "A fixed quote before any work begins",
  "Plain-language advice, zero jargon",
  "A reply within one business day",
  "Live previews so there are no surprises",
];

export default function ContactPage() {
  return (
    <section className="section">
      <div className="container-page grid gap-12 lg:grid-cols-[1fr_1.1fr]">
        <Reveal>
          <span className="eyebrow">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Contact
          </span>
          <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl">
            Let&apos;s build something{" "}
            <span className="accent-text">worth showing off.</span>
          </h1>
          <p className="mt-4 text-lg text-ink-muted">
            Tell us where you want to get to. We&apos;ll tell you honestly how
            we&apos;d get you there — and what it costs.
          </p>

          <ul className="mt-8 space-y-3">
            {reasons.map((r) => (
              <li key={r} className="flex items-start gap-3">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="mt-0.5 shrink-0 text-accent"
                  aria-hidden="true"
                >
                  <path
                    d="m5 13 4 4L19 7"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-ink">{r}</span>
              </li>
            ))}
          </ul>

          <div className="mt-10 glass p-5">
            <div className="text-xs uppercase tracking-[0.18em] text-ink-faint">
              Prefer email?
            </div>
            <a
              href={`mailto:${site.email}`}
              className="mt-1 block font-display text-lg font-bold hover:text-accent-soft"
            >
              {site.email}
            </a>
            <p className="mt-1 text-sm text-ink-faint">{site.location}</p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
