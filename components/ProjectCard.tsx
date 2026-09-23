import Link from "next/link";
import type { Project } from "@/lib/projects";
import { LivePreview } from "./LivePreview";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group flex flex-col">
      <LivePreview
        liveUrl={project.liveUrl}
        domain={project.domain}
        screenshotUrl={project.screenshot}
        name={project.name}
        allowEmbed={project.allowEmbed}
        compact
        className="mb-5"
      />
      <div className="flex items-center gap-2 text-xs">
        <span className="rounded-full border border-base-border bg-base-panel/60 px-2.5 py-1 font-medium text-ink-muted">
          {project.category}
        </span>
        {project.allowEmbed && (
          <span className="inline-flex items-center gap-1 rounded-full border border-[#28c840]/30 bg-[#28c840]/10 px-2.5 py-1 font-medium text-[#4ade80]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#4ade80]" />
            Live demo
          </span>
        )}
      </div>
      <h3 className="mt-3 text-xl font-bold">
        <Link
          href={`/work/${project.slug}`}
          className="transition-colors hover:text-accent-soft"
        >
          {project.name}
        </Link>
      </h3>
      <p className="mt-1 text-sm text-ink-muted">{project.result}</p>
      <Link
        href={`/work/${project.slug}`}
        className="link-accent mt-3 inline-flex items-center gap-1 text-sm font-semibold"
      >
        Read the case study
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
    </article>
  );
}
