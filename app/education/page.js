import Link from "next/link";
import { getPortfolioProfile, slugify } from "../../lib/profile";

export const dynamic = "force-dynamic";

export default async function EducationPage() {
  const profile = await getPortfolioProfile();

  return (
    <main className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
      <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-soft">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
          Education
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
          Academic record
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-700">
          This route separates the education content from the home page, matching the multipage
          portfolio structure and the PDF routing step.
        </p>
      </section>

      <section className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {profile.education.map((item) => {
          const slug = slugify(item.degree);

          return (
            <Link
              key={item.degree}
              href={`/education/${slug}`}
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-soft transition hover:border-slate-300 hover:bg-slate-50"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold text-slate-950">{item.degree}</h2>
                  <p className="mt-1 text-sm text-slate-600">{item.institution}</p>
                </div>
                <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600">
                  {item.period}
                </span>
              </div>
              <p className="mt-4 text-sm font-medium text-slate-700">{item.marks}</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">{item.notes}</p>
            </Link>
          );
        })}
      </section>
    </main>
  );
}
