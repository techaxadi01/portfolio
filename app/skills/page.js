import { getPortfolioProfile } from "../../lib/profile";

export const dynamic = "force-dynamic";

export default async function SkillsPage() {
  const profile = await getPortfolioProfile();

  return (
    <main className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
      <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-soft">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Skills</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
          Technical stack
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-700">
          This route isolates the skill section so the portfolio reads as a proper multipage site.
        </p>
      </section>

      <section className="mt-5 rounded-xl border border-slate-200 bg-white p-5 shadow-soft">
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {profile.skills.map((skill) => (
            <div key={skill} className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
              <p className="text-sm font-medium text-slate-800">{skill}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
