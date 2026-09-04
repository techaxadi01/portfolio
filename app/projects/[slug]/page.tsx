import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPortfolioProfile, getPortfolioProject, slugify } from "@/lib/profile";
import { ArrowLeftIcon, GithubIcon, ExternalLinkIcon, CodeIcon } from "@/components/icons";

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const profile = await getPortfolioProfile();
  return profile.projects.flatMap((project, index) => [
    { slug: slugify(project.name) },
    { slug: String(project.id ?? index + 1) }
  ]);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const project = await getPortfolioProject(params.slug);
  if (!project) {
    return { title: "Project Not Found" };
  }
  return {
    title: `${project.name} | Projects`,
    description: project.summary
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const project = await getPortfolioProject(params.slug);

  if (!project) {
    notFound();
  }

  const isNumeric = /^\d+$/.test(params.slug);
  const projectSlug = slugify(project.name);
  const projectId = String(project.id ?? 1);

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Back button */}
      <div>
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-xs font-mono text-[#8b949e] hover:text-[#00e676] transition-colors"
        >
          <ArrowLeftIcon className="h-3.5 w-3.5" />
          Back to all projects
        </Link>
      </div>

      {/* Main Project Card */}
      <article className="glass-card p-6 sm:p-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#00e676]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header with Route Resolution Info */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#30363d] pb-6">
          <div className="flex items-center gap-2">
            <span className="tag text-xs font-mono">{project.language}</span>
            <span className="tag tag-blue text-xs font-mono">ID #{projectId}</span>
          </div>

          {/* Dynamic route status badge */}
          <div className="flex items-center gap-2 rounded-full border border-[#30363d] bg-[#161b22] px-3 py-1 text-xs font-mono text-[#8b949e]">
            <span className="text-[#6e7681]">Route:</span>
            <span className="text-[#00e676]">
              {isNumeric ? `index (/projects/${params.slug})` : `slug (/projects/${params.slug})`}
            </span>
          </div>
        </div>

        {/* Project Title and Overview */}
        <div className="mt-6">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {project.name}
          </h1>

          <p className="mt-4 text-base sm:text-lg text-[#8b949e] leading-relaxed">
            {project.summary}
          </p>
        </div>

        {/* Specifications Grid */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="rounded-xl border border-[#30363d] bg-[#161b22]/70 p-4">
            <span className="text-xs font-mono text-[#6e7681] block">Primary Language</span>
            <span className="text-base font-semibold text-[#e6edf3] mt-1 block">
              {project.language}
            </span>
          </div>

          <div className="rounded-xl border border-[#30363d] bg-[#161b22]/70 p-4">
            <span className="text-xs font-mono text-[#6e7681] block">Source Code Repository</span>
            {project.url ? (
              <a
                href={project.url}
                target="_blank"
                rel="noreferrer"
                className="text-sm font-semibold text-[#00e676] hover:underline mt-1 inline-flex items-center gap-1.5"
              >
                View on GitHub
                <ExternalLinkIcon className="h-3.5 w-3.5" />
              </a>
            ) : (
              <span className="text-sm text-[#8b949e] mt-1 block">Internal Coursework</span>
            )}
          </div>

          <div className="rounded-xl border border-[#30363d] bg-[#161b22]/70 p-4">
            <span className="text-xs font-mono text-[#6e7681] block">Slug URL</span>
            <Link
              href={`/projects/${projectSlug}`}
              className="text-xs font-mono text-[#58a6ff] hover:underline mt-1 block"
            >
              /projects/{projectSlug}
            </Link>
          </div>

          <div className="rounded-xl border border-[#30363d] bg-[#161b22]/70 p-4">
            <span className="text-xs font-mono text-[#6e7681] block">Index URL</span>
            <Link
              href={`/projects/${projectId}`}
              className="text-xs font-mono text-[#00e676] hover:underline mt-1 block"
            >
              /projects/{projectId}
            </Link>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 pt-6 border-t border-[#30363d] flex flex-wrap items-center gap-4">
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noreferrer"
              className="btn-accent text-sm"
            >
              <GithubIcon className="h-4 w-4" />
              Open GitHub Repository
            </a>
          )}
          <Link href="/projects" className="btn-outline text-sm">
            View All Projects
          </Link>
        </div>
      </article>
    </div>
  );
}
