import { GithubIcon, LinkedinIcon, MailIcon } from "../../components/icons";
import { getPortfolioProfile } from "../../lib/profile";

export const dynamic = "force-dynamic";

export default async function ContactPage() {
  const profile = await getPortfolioProfile();

  return (
    <main className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
      <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-soft">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Contact</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
          Reach out
        </h1>
      </section>

      <section className="mt-5 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-soft">
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
            Social links
          </h2>
          <div className="mt-4 space-y-3">
            <a
              href={`mailto:${profile.email}`}
              className="flex items-center gap-3 rounded-lg border border-slate-200 px-4 py-3 text-sm text-slate-800 transition hover:bg-slate-50"
            >
              <MailIcon />
              {profile.email}
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 rounded-lg border border-slate-200 px-4 py-3 text-sm text-slate-800 transition hover:bg-slate-50"
            >
              <GithubIcon />
              GitHub
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 rounded-lg border border-slate-200 px-4 py-3 text-sm text-slate-800 transition hover:bg-slate-50"
            >
              <LinkedinIcon />
              LinkedIn
            </a>
          </div>
        </article>

        <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-soft">
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
            Contact details
          </h2>
          <dl className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <dt className="text-sm text-slate-500">Name</dt>
              <dd className="mt-1 text-sm font-medium text-slate-900">{profile.fullName}</dd>
            </div>
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <dt className="text-sm text-slate-500">Location</dt>
              <dd className="mt-1 text-sm font-medium text-slate-900">{profile.location}</dd>
            </div>
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 sm:col-span-2">
              <dt className="text-sm text-slate-500">Email</dt>
              <dd className="mt-1 break-all text-sm font-medium text-slate-900">{profile.email}</dd>
            </div>
          </dl>
        </article>
      </section>
    </main>
  );
}
