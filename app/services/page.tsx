import type { Metadata } from "next";
import Link from "next/link";
import { services } from "@/lib/services";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { CtaBand } from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "Services — Web design, apps & local growth",
  description:
    "Outcome-based web development services: business websites, web apps & dashboards, and local business growth. Every project scoped individually. Free quote, fast reply.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <section className="section pb-0">
        <div className="container-page">
          <SectionHeading
            eyebrow="Services"
            title={
              <>
                Simple packages.{" "}
                <span className="accent-text">Built around your goal.</span>
              </>
            }
            subtitle="Pick the outcome you want. Every project is scoped and quoted individually, with a clear fixed price agreed before any work begins."
          />
        </div>
      </section>

      <section className="section">
        <div className="container-page space-y-8">
          {services.map((s, i) => (
            <Reveal
              key={s.slug}
              id={s.slug}
              as="article"
              className="glass scroll-mt-24 grid gap-8 p-6 sm:p-10 lg:grid-cols-[1.2fr_1fr]"
            >
              <div>
                <div className="flex items-center gap-3">
                  <span className="font-display text-sm font-bold text-accent">
                    0{i + 1}
                  </span>
                  <span className="h-px flex-1 bg-base-border" />
                </div>
                <h2 className="mt-4 text-2xl font-bold sm:text-3xl">{s.title}</h2>
                <p className="mt-2 text-lg font-medium accent-text">
                  {s.outcome}
                </p>
                <p className="mt-4 leading-relaxed text-ink-muted">
                  {s.description}
                </p>

                <details className="group mt-6 rounded-xl border border-base-border bg-base/40 p-4">
                  <summary className="cursor-pointer list-none text-sm font-semibold text-ink-muted transition-colors hover:text-accent-soft">
                    <span className="inline-flex items-center gap-2">
                      <span className="text-accent transition-transform group-open:rotate-90">
                        ▸
                      </span>
                      Under the hood (for the curious)
                    </span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-ink-faint">
                    {s.underTheHood}
                  </p>
                </details>
              </div>

              <div className="rounded-xl2 border border-base-border bg-base/50 p-6">
                <div className="text-xs uppercase tracking-[0.18em] text-ink-faint">
                  Pricing
                </div>
                <div className="mt-1 font-display text-3xl font-bold accent-text">
                  Tailored to your project
                </div>
                <p className="mt-2 text-sm text-ink-muted">
                  Every project is scoped and quoted individually — you get a
                  clear, fixed price before any work begins. No surprises.
                </p>
                <h3 className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-ink-faint">
                  What you get
                </h3>
                <ul className="mt-3 space-y-2.5">
                  {s.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm">
                      <svg
                        width="18"
                        height="18"
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
                      <span className="text-ink">{item}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/contact" className="btn-primary mt-6 w-full">
                  Get a quote
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
