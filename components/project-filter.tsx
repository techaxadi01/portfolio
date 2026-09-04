"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Project } from "@/types/portfolio";
import { slugify } from "@/lib/slug";
import { GithubIcon, ExternalLinkIcon, CodeIcon } from "@/components/icons";

interface ProjectFilterProps {
  initialProjects: Project[];
}

export default function ProjectFilter({ initialProjects }: ProjectFilterProps) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = useMemo(() => {
    const set = new Set<string>(["All"]);
    initialProjects.forEach((p) => {
      if (p.language) set.add(p.language);
    });
    return Array.from(set);
  }, [initialProjects]);

  const filtered = useMemo(() => {
    return initialProjects.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.summary.toLowerCase().includes(search.toLowerCase()) ||
        (p.language && p.language.toLowerCase().includes(search.toLowerCase()));

      const matchesCat =
        selectedCategory === "All" || p.language === selectedCategory;

      return matchesSearch && matchesCat;
    });
  }, [initialProjects, search, selectedCategory]);

  return (
    <div>
      {/* Search and Filters Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8">
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects by name, stack, or keyword..."
            className="w-full rounded-lg border border-[#30363d] bg-[#161b22] px-4 py-2.5 pl-10 text-sm text-[#e6edf3] placeholder-[#6e7681] focus:border-[#00e676] focus:outline-none focus:ring-1 focus:ring-[#00e676] transition-all"
          />
          <svg
            className="absolute left-3 top-3 h-4 w-4 text-[#6e7681]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="absolute right-3 top-2.5 text-xs text-[#8b949e] hover:text-white"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={[
                "rounded-md px-3 py-1.5 text-xs font-mono transition-all",
                selectedCategory === cat
                  ? "bg-[#00e676]/15 text-[#00e676] border border-[#00e676]/40 shadow-[0_0_10px_rgba(0,230,118,0.2)] font-semibold"
                  : "bg-[#161b22] text-[#8b949e] border border-[#30363d] hover:text-[#e6edf3] hover:border-[#8b949e]"
              ].join(" ")}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Projects */}
      {filtered.length === 0 ? (
        <div className="glass-card p-12 text-center">
          <p className="text-base text-[#8b949e]">No projects match your filter criteria.</p>
          <button
            type="button"
            onClick={() => {
              setSearch("");
              setSelectedCategory("All");
            }}
            className="btn-outline text-xs mt-4"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((project, idx) => {
            const projectSlug = slugify(project.name);
            const projectId = project.id ?? idx + 1;

            return (
              <article
                key={project.name}
                className="glass-card p-6 flex flex-col justify-between group hover:border-[#00e676]/50 transition-all duration-300 relative overflow-hidden"
              >
                {/* Accent glow corner */}
                <div className="absolute top-0 right-0 w-28 h-28 bg-[#00e676]/5 rounded-full blur-xl pointer-events-none group-hover:bg-[#00e676]/10 transition-all" />

                <div>
                  {/* Top bar with tag & id */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="tag text-xs font-mono">
                      {project.language || "Code"}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[11px] text-[#6e7681]">
                        #{projectId}
                      </span>
                    </div>
                  </div>

                  {/* Title & Slug links */}
                  <h3 className="text-xl font-bold text-white group-hover:text-[#00e676] transition-colors">
                    <Link href={`/projects/${projectSlug}`}>
                      {project.name}
                    </Link>
                  </h3>

                  <p className="mt-2.5 text-sm text-[#8b949e] line-clamp-2">
                    {project.summary}
                  </p>
                </div>

                {/* Bottom routes and action bar */}
                <div className="mt-6 pt-4 border-t border-[#30363d]/60">
                  <div className="flex items-center justify-between text-xs mb-3">
                    <span className="text-[11px] font-mono text-[#6e7681]">Routes:</span>
                    <div className="flex items-center gap-2 font-mono text-[11px]">
                      <Link
                        href={`/projects/${projectSlug}`}
                        className="text-[#58a6ff] hover:underline"
                      >
                        /{projectSlug}
                      </Link>
                      <span className="text-[#30363d]">&bull;</span>
                      <Link
                        href={`/projects/${projectId}`}
                        className="text-[#00e676] hover:underline"
                      >
                        /{projectId}
                      </Link>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <Link
                      href={`/projects/${projectSlug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#00e676] hover:underline"
                    >
                      View Details
                      <ExternalLinkIcon className="h-3.5 w-3.5" />
                    </Link>

                    {project.url && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-md border border-[#30363d] bg-[#161b22] px-3 py-1.5 text-xs font-medium text-[#8b949e] hover:border-[#00e676] hover:text-[#00e676] transition-all"
                      >
                        <GithubIcon className="h-3.5 w-3.5" />
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
