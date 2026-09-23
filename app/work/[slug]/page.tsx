import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { projects, getProject } from "@/lib/projects";
import { LivePreview } from "@/components/LivePreview";
import { Reveal } from "@/components/Reveal";
import { CtaBand } from "@/components/CtaBand";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.name} — ${project.type}`,
    description: project.summary,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      title: `${project.name} — Case study`,
      description: project.summary,
      url: `${site.url}/work/${project.slug}`,
    },
  };
}

const storySections = [
  { key: "problem" as const, label: "The problem" },
  { key: "build" as const, label: "What we built" },
  { key: "outcome" as const, label: "The outcome" },
];

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const idx = projects.findIndex((p) => p.slug === slug);
  const next = projects[(idx + 1) % projects.length];

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: "Work", item: `${site.url}/work` },
      {
        "@type": "ListItem",
        position: 3,
        name: project.name,
        item: `${site.url}/work/${project.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />

      <article className="section">
        <div className="container-page">
          <nav className="text-sm text-ink-faint" aria-label="Breadcrumb">
            <Link href="/work" className="hover:text-accent-soft">
              Work
            </Link>
            <span className="mx-2">/</span>
            <span className="text-ink-muted">{project.name}</span>
          </nav>

          <Reveal className="mt-6 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-base-border bg-base-panel/60 px-3 py-1 text-xs font-medium text-ink-muted">
                {project.category}
              </span>
              {project.allowEmbed && (
                <span className="inline-flex items-center gap-1 rounded-full border border-[#28c840]/30 bg-[#28c840]/10 px-3 py-1 text-xs font-medium text-[#4ade80]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#4ade80]" />
                  Fully live preview
                </span>
              )}
            </div>
            <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl">
              {project.name}
            </h1>
            <p className="mt-2 text-lg text-ink-muted">{project.type}</p>
            <p className="mt-5 text-lg leading-relaxed text-ink">
              {project.summary}
            </p>
          </Reveal>

          <Reveal delay={0.1} className="mt-10">
            <LivePreview
              liveUrl={project.liveUrl}
              domain={project.domain}
              screenshotUrl={project.screenshot}
              name={project.name}
              allowEmbed={project.allowEmbed}
            />
          </Reveal>

          {/* Result stats */}
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {project.accentResults.map((r) => (
              <Reveal key={r.label} as="div" className="glass p-5 text-center">
                <div className="font-display text-3xl font-bold accent-text">
                  {r.value}
                </div>
                <div className="mt-1 text-sm text-ink-muted">{r.label}</div>
              </Reveal>
            ))}
            <Reveal as="div" className="glass flex flex-col justify-center p-5 text-center">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Open live site
              </a>
            </Reveal>
          </div>

          {/* Story */}
          <div className="mt-16 grid gap-10 md:grid-cols-3">
            {storySections.map((s, i) => (
              <Reveal key={s.key} delay={i * 0.08} as="div">
                <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                  {s.label}
                </h2>
                <p className="mt-3 leading-relaxed text-ink-muted">
                  {project[s.key]}
                </p>
              </Reveal>
            ))}
          </div>

          {/* Tags */}
          <div className="mt-12 flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-base-border px-3 py-1 text-xs text-ink-faint"
              >
                {t}
              </span>
            ))}
          </div>

          {/* Next project */}
          <div className="mt-16 flex items-center justify-between border-t border-base-border pt-8">
            <Link href="/work" className="btn-ghost">
              All work
            </Link>
            <Link
              href={`/work/${next.slug}`}
              className="group text-right"
            >
              <span className="text-xs text-ink-faint">Next project</span>
              <div className="flex items-center gap-2 font-display text-lg font-bold group-hover:text-accent-soft">
                {next.name}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M5 12h14M13 6l6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </Link>
          </div>
        </div>
      </article>

      <CtaBand />
    </>
  );
}
