import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { CtaBand } from "@/components/CtaBand";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About — A web agency that speaks human",
  description:
    "RA Interactive is a web development agency that pairs engineering-grade craft with plain-language, results-first communication. Meet how we work.",
  alternates: { canonical: "/about" },
};

const principles = [
  {
    title: "Outcomes over jargon",
    body: "We lead with what you get — more bookings, more sales — and keep the technical detail optional. If we can't explain it simply, we haven't finished thinking it through.",
  },
  {
    title: "Proof, not promises",
    body: "Every project we show is genuinely live. You can scroll it, click it, and open it yourself. That's the standard we hold ourselves to.",
  },
  {
    title: "Speed is a feature",
    body: "Fast sites rank better, convert better, and feel premium. We obsess over Core Web Vitals so your visitors never wait.",
  },
  {
    title: "Craft in the details",
    body: "Bold typography, considered motion, and pixel-clean layouts on every screen size. The small things are the whole thing.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="section pb-0">
        <div className="container-page">
          <SectionHeading
            eyebrow="About us"
            title={
              <>
                Engineering craft.{" "}
                <span className="accent-text">Human conversation.</span>
              </>
            }
            subtitle="RA Interactive is a web development agency built on a simple belief: the best software feels effortless — and talking to the people who build it should too."
          />
        </div>
      </section>

      <section className="section">
        <div className="container-page grid gap-12 lg:grid-cols-[1.3fr_1fr]">
          <Reveal className="space-y-5 text-lg leading-relaxed text-ink-muted">
            <p>
              We&apos;re a small, senior team that builds websites and web apps
              for businesses who want to look established and win more customers.
              We&apos;ve shipped everything from local booking sites to AI-powered
              products — and we host our own work, so we can prove it&apos;s real.
            </p>
            <p>
              Our previous brand, Dev Oriented, was built to impress other
              developers. RA Interactive keeps that engineering standard but
              turns it outward: toward the business owner who&apos;s never
              written a line of code and just wants their website to work
              harder.
            </p>
            <p>
              That&apos;s why the site you&apos;re reading is itself our strongest
              sample of work — faster, warmer, and more interactive than what
              you&apos;ll find elsewhere. If a choice doesn&apos;t clearly make
              things better for you, we redo it.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="glass h-fit p-6">
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-faint">
              At a glance
            </h2>
            <dl className="mt-4 space-y-4 text-sm">
              <div>
                <dt className="text-ink-faint">Where</dt>
                <dd className="mt-0.5 font-medium text-ink">{site.location}</dd>
              </div>
              <div>
                <dt className="text-ink-faint">What</dt>
                <dd className="mt-0.5 font-medium text-ink">
                  Websites, web apps & local growth
                </dd>
              </div>
              <div>
                <dt className="text-ink-faint">Response time</dt>
                <dd className="mt-0.5 font-medium text-ink">
                  {site.responsePromise}
                </dd>
              </div>
              <div>
                <dt className="text-ink-faint">Get in touch</dt>
                <dd className="mt-0.5">
                  <a href={`mailto:${site.email}`} className="link-accent font-medium">
                    {site.email}
                  </a>
                </dd>
              </div>
            </dl>
            <Link href="/contact" className="btn-primary mt-6 w-full">
              Start a project
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="section border-t border-base-border bg-base-soft/30">
        <div className="container-page">
          <SectionHeading eyebrow="How we work" title="Principles we build by." />
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {principles.map((p, i) => (
              <Reveal
                key={p.title}
                delay={i * 0.06}
                as="article"
                className="glass p-6"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 font-display font-bold text-accent">
                  {i + 1}
                </div>
                <h3 className="mt-4 text-xl font-bold">{p.title}</h3>
                <p className="mt-2 text-ink-muted">{p.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
