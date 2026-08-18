import Link from "next/link";
import { notFound } from "next/navigation";
import { getPortfolioEducation, getPortfolioProfile, slugify } from "../../../lib/profile";

export async function generateStaticParams() {
  const profile = await getPortfolioProfile();
  return profile.education.flatMap((item, index) => [
    { slug: slugify(item.degree) },
    { slug: String(item.id ?? index + 1) }
  ]);
}

export default async function EducationDetailPage({ params }) {
  const item = await getPortfolioEducation(params.slug);

  if (!item) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-5 sm:px-6 lg:px-8">
      <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-soft">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
          Education detail
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
          {item.degree}
        </h1>
        <p className="mt-3 text-sm text-slate-600">{item.institution}</p>

        <dl className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <dt className="text-sm text-slate-500">Period</dt>
            <dd className="mt-1 text-sm font-medium text-slate-900">{item.period}</dd>
          </div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <dt className="text-sm text-slate-500">Marks</dt>
            <dd className="mt-1 text-sm font-medium text-slate-900">{item.marks}</dd>
          </div>
        </dl>

        <p className="mt-6 max-w-2xl text-sm leading-6 text-slate-700">{item.notes}</p>

        <div className="mt-6">
          <Link
            href="/education"
            className="inline-flex rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-800 transition hover:bg-slate-100"
          >
            Back to education
          </Link>
        </div>
      </section>
    </main>
  );
}
