"use client";

import { useState } from "react";
import { projects, projectCategories } from "@/lib/projects";
import { ProjectCard } from "./ProjectCard";

type Filter = "All" | (typeof projectCategories)[number];

export function WorkGrid() {
  const [filter, setFilter] = useState<Filter>("All");
  const filters: Filter[] = ["All", ...projectCategories];
  const shown =
    filter === "All"
      ? projects
      : projects.filter((p) => p.category === filter);

  return (
    <div>
      <div
        className="flex flex-wrap gap-2"
        role="group"
        aria-label="Filter projects by type"
      >
        {filters.map((f) => {
          const count =
            f === "All"
              ? projects.length
              : projects.filter((p) => p.category === f).length;
          return (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              aria-pressed={filter === f}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                filter === f
                  ? "border-accent bg-accent text-base"
                  : "border-base-border bg-base-panel/50 text-ink-muted hover:border-accent/50 hover:text-ink"
              }`}
            >
              {f}
              <span className="ml-1.5 opacity-60">{count}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-10 grid gap-x-8 gap-y-14 md:grid-cols-2">
        {shown.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}
