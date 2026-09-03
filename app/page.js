import Image from "next/image";
import { GithubIcon, LinkedinIcon, MailIcon } from "../components/icons";
import { getBaseUrl } from "../lib/get-base-url";

export const dynamic = "force-dynamic";

async function getServerProfile() {
  const response = await fetch(`${getBaseUrl()}/api/profile`, {
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error("Failed to fetch profile on the server.");
  }

  return response.json();
}

export default async function Home() {
  const { profile } = await getServerProfile();

  return (
    <main className="mx-auto min-h-screen max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
      <header className="grid gap-5 rounded-xl border border-slate-200 bg-white p-5 shadow-soft lg:grid-cols-[1fr_190px] lg:items-start">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
            Curriculum Vitae
          </p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            {profile.fullName}
          </h1>
          <p className="mt-2 text-lg text-slate-600">{profile.role}</p>
          <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-700">{profile.intro}</p>

          <div className="no-print mt-4 flex flex-wrap gap-3 text-sm">
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 font-medium text-slate-800 transition hover:bg-slate-100"
            >
              <MailIcon />
              Email
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 font-medium text-slate-800 transition hover:bg-slate-100"
            >
              <GithubIcon />
              GitHub
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 font-medium text-slate-800 transition hover:bg-slate-100"
            >
              <LinkedinIcon />
              LinkedIn
            </a>
          </div>
        </div>

        <Image
          src={profile.photo}
          alt={`${profile.fullName} portrait`}
          width={165}
          height={210}
          className="h-[210px] w-[165px] rounded-xl border border-slate-300 bg-white object-cover object-top shadow-sm"
          priority
        />
      </header>

      <section className="mt-5 grid gap-5 lg:grid-cols-[300px_1fr]">
        <aside className="space-y-5">
          <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-soft">
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
              Contact
            </h2>
            <dl className="mt-4 space-y-3 text-sm">
              <div>
                <dt className="text-slate-500">Location</dt>
                <dd className="mt-1 font-medium text-slate-900">{profile.location}</dd>
              </div>
              <div>
                <dt className="text-slate-500">Email</dt>
                <dd className="mt-1 break-all font-medium text-slate-900">{profile.email}</dd>
              </div>
            </dl>
          </article>

          <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-soft">
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
              Projects
            </h2>
            <div className="mt-4 space-y-4">
              {profile.projects.slice(0, 3).map((project) => (
                <a
                  key={project.name}
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                  className="block rounded-lg border border-slate-200 p-3 transition hover:border-slate-300 hover:bg-slate-50"
                >
                  <h3 className="text-sm font-semibold text-slate-950">{project.name}</h3>
                  <p className="mt-1 text-sm text-slate-600">{project.summary}</p>
                </a>
              ))}
            </div>
          </article>

          <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-soft">
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
              Experience
            </h2>
            <div className="mt-4 space-y-4">
              {profile.experience.map((item) => (
                <div key={item.role} className="border-l-2 border-slate-200 pl-4">
                  <h3 className="text-sm font-semibold text-slate-950">{item.role}</h3>
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
        </aside>

        <section className="space-y-5">
          <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-soft">
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
              Summary
            </h2>
            <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-700">{profile.summary}</p>
          </article>

          <div className="grid gap-5 xl:grid-cols-2">
            <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-soft">
              <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                Education
              </h2>
              <div className="mt-4 space-y-4">
                {profile.education.map((item) => (
                  <div key={item.degree} className="border-l-2 border-slate-200 pl-4">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                      <h3 className="text-base font-semibold text-slate-950">{item.degree}</h3>
                      <p className="text-sm font-medium text-slate-500">{item.marks}</p>
                    </div>
                    <p className="text-sm text-slate-600">
                      {item.institution} - {item.period}
                    </p>
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
          </div>

          <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-soft">
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
              Skills
            </h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {profile.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm text-slate-700"
                >
                  {skill}
                </span>
              ))}
            </div>
          </article>
        </section>
      </section>
    </main>
  );
}
