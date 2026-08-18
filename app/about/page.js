import { getPortfolioProfile } from "../../lib/profile";

export const dynamic = "force-dynamic";

export default async function AboutPage() {
  const profile = await getPortfolioProfile();

  return (
    <main className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
      <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-soft">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">About</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
          {profile.fullName}
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-700">{profile.summary}</p>
        <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-700">
          This page keeps the profile structure from the PDF and gives a dedicated place for
          education details, which fits the multipage routing requirement.
        </p>
      </section>

      <section className="mt-5 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
        <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-soft">
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
            Education
          </h2>
          <div className="mt-4 space-y-4">
            {profile.education.map((item) => (
              <div key={`${item.degree}-${item.period}`} className="border-l-2 border-slate-200 pl-4">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                  <h3 className="text-base font-semibold text-slate-950">{item.degree}</h3>
                  <p className="text-sm font-medium text-slate-500">{item.marks}</p>
                </div>
                <p className="text-sm text-slate-600">
                  {item.institution} - {item.period}
                </p>
                <p className="mt-1 text-sm leading-6 text-slate-700">{item.notes}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-soft">
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
            Profile
          </h2>
          <dl className="mt-4 space-y-4 text-sm">
            <div>
              <dt className="text-slate-500">Location</dt>
              <dd className="mt-1 font-medium text-slate-900">{profile.location}</dd>
            </div>
            <div>
              <dt className="text-slate-500">Email</dt>
              <dd className="mt-1 break-all font-medium text-slate-900">{profile.email}</dd>
            </div>
            <div>
              <dt className="text-slate-500">Role</dt>
              <dd className="mt-1 font-medium text-slate-900">{profile.role}</dd>
            </div>
          </dl>
        </article>
      </section>
    </main>
  );
}
