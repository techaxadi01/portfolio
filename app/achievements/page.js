import { getPortfolioProfile } from "../../lib/profile";

export const dynamic = "force-dynamic";

export default async function AchievementsPage() {
  const profile = await getPortfolioProfile();

  return (
    <main className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
      <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-soft">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
          Achievements
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
          NCC and certificates
        </h1>
      </section>

      <section className="mt-5 grid gap-5 lg:grid-cols-2">
        <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-soft">
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
            NCC experience
          </h2>
          <div className="mt-4 space-y-4">
            {profile.experience.map((item) => (
              <div key={item.role} className="border-l-2 border-slate-200 pl-4">
                <h3 className="text-base font-semibold text-slate-950">{item.role}</h3>
                <p className="text-sm text-slate-600">
                  {item.organization} - {item.location}
                </p>
                <p className="text-sm font-medium text-slate-500">{item.period}</p>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-700">
                  {item.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-soft">
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
            Certifications
          </h2>
          <div className="mt-4 space-y-4">
            {profile.certifications.map((item) => (
              <div key={item.name} className="border-l-2 border-slate-200 pl-4">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                  <h3 className="text-base font-semibold text-slate-950">{item.name}</h3>
                  <p className="text-sm font-medium text-slate-500">
                    {item.year} - Grade {item.grade}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </article>
      </section>
    </main>
  );
}
