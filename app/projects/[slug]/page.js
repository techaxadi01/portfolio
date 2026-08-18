import Link from "next/link";
import { notFound } from "next/navigation";
import { getPortfolioProfile, getPortfolioProject, slugify } from "../../../lib/profile";

export async function generateStaticParams() {
  const profile = await getPortfolioProfile();
  return profile.projects.flatMap((project, index) => [
    { slug: slugify(project.name) },
    { slug: String(project.id ?? index + 1) }
  ]);
}

export default async function ProjectDetailPage({ params }) {
  const project = await getPortfolioProject(params.slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-5 sm:px-6 lg:px-8">
      <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-soft">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
          Project detail
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
          {project.name}
        </h1>
        <p className="mt-3 text-sm text-slate-600">{project.summary}</p>

        <dl className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <dt className="text-sm text-slate-500">Language</dt>
            <dd className="mt-1 text-sm font-medium text-slate-900">{project.language}</dd>
          </div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <dt className="text-sm text-slate-500">Source</dt>
            <dd className="mt-1 text-sm font-medium text-slate-900">
              <a href={project.url} target="_blank" rel="noreferrer" className="underline">
                GitHub repository
              </a>
            </dd>
          </div>
        </dl>

        <div className="mt-6">
          <Link
            href="/projects"
            className="inline-flex rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-800 transition hover:bg-slate-100"
          >
            Back to projects
          </Link>
        </div>
      </section>
    </main>
  );
}
