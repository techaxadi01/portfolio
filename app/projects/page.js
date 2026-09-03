import ClientProfileCard from "../../components/client-profile-card";
import Link from "next/link";
import { getPortfolioProfile } from "../../lib/profile";

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const profile = await getPortfolioProfile();

  return (
    <main className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
      <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-soft">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Projects</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
          GitHub work and lab deliverables
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-700">
          Project entries live here as a dedicated route, while the live API card below demonstrates
          client-side rendering against the same API used by the server.
        </p>
      </section>

      <section className="mt-5 grid gap-5 lg:grid-cols-[1.25fr_0.75fr]">
        <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-soft">
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
            GitHub projects
          </h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {profile.projects.map((project) => (
              <Link
                key={project.name}
                href={`/projects/${project.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "")}`}
                className="rounded-lg border border-slate-200 p-4 transition hover:border-slate-300 hover:bg-slate-50"
              >
                <h3 className="text-base font-semibold text-slate-950">{project.name}</h3>
                <p className="mt-1 text-sm text-slate-600">{project.summary}</p>
                <p className="mt-3 text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
                  {project.language}
                </p>
              </Link>
            ))}
          </div>
        </article>

        <ClientProfileCard />
      </section>
    </main>
  );
}
