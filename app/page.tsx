import Link from "next/link";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { CtaBand } from "@/components/CtaBand";
import { LivePreview } from "@/components/LivePreview";
import { services } from "@/lib/services";
import { featuredProjects } from "@/lib/projects";

const process = [
  {
    step: "01",
    title: "Tell us your goal",
    body: "A quick chat about your business and what a win looks like — more bookings, more sales, more sign-ups. Plain language, no tech quiz.",
  },
  {
    step: "02",
    title: "We design & build",
    body: "You see progress on a real, live link — not slides. We refine together until it feels right on every screen.",
  },
  {
    step: "03",
    title: "Launch & grow",
    body: "We ship it fast, wire up SEO and analytics, and hand over something you can be proud of — and that keeps working.",
  },
];

const testimonials = [
  {
    quote:
      "They made something genuinely complex feel simple — and it looks better than anything our competitors have.",
    name: "Founder",
    role: "AI consulting client",
  },
  {
    quote:
      "Bookings went up almost immediately. Customers actually understand how to reach us now.",
    name: "Owner",
    role: "Local business client",
  },
  {
    quote:
      "Fast, communicative, and the live preview meant zero surprises at launch. Exactly what we wanted.",
    name: "Practice Manager",
    role: "Healthcare client",
  },
];

export default function HomePage() {
  const hero = featuredProjects[0];

  return (
    <>
      <Hero />
      <Marquee />

      {/* Services — outcome-led */}
      <section className="section">
        <div className="container-page">
          <SectionHeading
            eyebrow="What we do"
            title={
              <>
                Built around <span className="accent-text">your outcome</span>,
                not our tech stack.
              </>
            }
            subtitle="Pick the result you're after. The engineering that makes it happen stays quietly under the hood."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {services.map((s, i) => (
              <Reveal
                key={s.slug}
                delay={i * 0.08}
                as="article"
                className="glass group flex flex-col p-6 transition-all hover:border-accent/40 hover:shadow-glow"
              >
                <div className="flex items-center justify-between">
                  <span className="font-display text-sm font-bold text-accent">
                    0{i + 1}
                  </span>
                  <span className="text-xs text-ink-faint">Free quote</span>
                </div>
                <h3 className="mt-4 text-xl font-bold">{s.title}</h3>
                <p className="mt-2 font-medium text-ink">{s.outcome}</p>
                <p className="mt-2 flex-1 text-sm text-ink-muted">
                  {s.description}
                </p>
                <Link
                  href={`/services#${s.slug}`}
                  className="link-accent mt-5 inline-flex items-center gap-1 text-sm font-semibold"
                >
                  What you get
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M5 12h14M13 6l6 6-6 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Flagship: featured live preview */}
      <section className="section border-t border-base-border bg-base-soft/30">
        <div className="container-page">
          <SectionHeading
            eyebrow="The RA difference"
            title={
              <>
                Don&apos;t take our word for it —{" "}
                <span className="accent-text">scroll the real thing.</span>
              </>
            }
            subtitle="Most agencies show you a screenshot. We embed the actual live site, right here. Try the device toggle, then open it in a new tab."
          />

          {hero && (
            <Reveal className="mt-12">
              <LivePreview
                liveUrl={hero.liveUrl}
                domain={hero.domain}
                screenshotUrl={hero.screenshot}
                name={hero.name}
                allowEmbed={hero.allowEmbed}
              />
            </Reveal>
          )}

          <div className="mt-14 grid gap-x-8 gap-y-12 md:grid-cols-3">
            {featuredProjects.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.08} as="article">
                <LivePreview
                  liveUrl={p.liveUrl}
                  domain={p.domain}
                  screenshotUrl={p.screenshot}
                  name={p.name}
                  allowEmbed={p.allowEmbed}
                  compact
                  className="mb-4"
                />
                <h3 className="text-lg font-bold">
                  <Link href={`/work/${p.slug}`} className="hover:text-accent-soft">
                    {p.name}
                  </Link>
                </h3>
                <p className="mt-1 text-sm text-ink-muted">{p.result}</p>
              </Reveal>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/work" className="btn-ghost">
              Explore all projects
            </Link>
          </div>
        </div>
      </section>

      {/* Proof / testimonials */}
      <section className="section">
        <div className="container-page">
          <SectionHeading
            eyebrow="Proof"
            title="Results our clients can feel."
            align="center"
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal
                key={i}
                delay={i * 0.08}
                as="article"
                className="glass flex flex-col p-6"
              >
                <div className="mb-4 flex gap-0.5 text-accent" aria-hidden="true">
                  {"★★★★★".split("").map((s, j) => (
                    <span key={j}>{s}</span>
                  ))}
                </div>
                <blockquote className="flex-1 text-ink">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <footer className="mt-5 text-sm">
                  <div className="font-semibold">{t.name}</div>
                  <div className="text-ink-faint">{t.role}</div>
                </footer>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 3-step process */}
      <section className="section border-t border-base-border bg-base-soft/30">
        <div className="container-page">
          <SectionHeading
            eyebrow="How it works"
            title="Three simple steps to launch."
            subtitle="No lengthy contracts before you know it's a fit. Just a clear, friendly path from idea to live."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {process.map((p, i) => (
              <Reveal
                key={p.step}
                delay={i * 0.08}
                as="article"
                className="relative glass p-6"
              >
                <span className="font-display text-5xl font-bold text-base-border">
                  {p.step}
                </span>
                <h3 className="mt-3 text-xl font-bold">{p.title}</h3>
                <p className="mt-2 text-sm text-ink-muted">{p.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
