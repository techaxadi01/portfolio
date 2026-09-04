import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPortfolioEducation, getPortfolioProfile, slugify } from "@/lib/profile";
import { ArrowLeftIcon, AcademicCapIcon } from "@/components/icons";

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const profile = await getPortfolioProfile();
  return profile.education.flatMap((item, index) => [
    { slug: slugify(item.degree) },
    { slug: String(item.id ?? index + 1) }
  ]);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const item = await getPortfolioEducation(params.slug);
  if (!item) {
    return { title: "Education Milestone Not Found" };
  }
  return {
    title: `${item.degree} | Education`,
    description: `${item.degree} at ${item.institution} (${item.period}) - ${item.marks}`
  };
}

export default async function EducationDetailPage({ params }: PageProps) {
  const item = await getPortfolioEducation(params.slug);

  if (!item) {
    notFound();
  }

  const isNumeric = /^\d+$/.test(params.slug);
  const eduSlug = slugify(item.degree);
  const eduId = String(item.id ?? 1);

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Back button */}
      <div>
        <Link
          href="/education"
          className="inline-flex items-center gap-2 text-xs font-mono text-[#8b949e] hover:text-[#00e676] transition-colors"
        >
          <ArrowLeftIcon className="h-3.5 w-3.5" />
          Back to all education
        </Link>
      </div>

      {/* Main Detail Card */}
      <article className="glass-card p-6 sm:p-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#58a6ff]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header with Route Resolution Info */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#30363d] pb-6">
          <div className="flex items-center gap-2">
            <span className="tag tag-blue text-xs font-mono">{item.period}</span>
            <span className="tag text-xs font-mono">ID #{eduId}</span>
          </div>

          {/* Dynamic route status badge */}
          <div className="flex items-center gap-2 rounded-full border border-[#30363d] bg-[#161b22] px-3 py-1 text-xs font-mono text-[#8b949e]">
            <span className="text-[#6e7681]">Route:</span>
            <span className="text-[#00e676]">
              {isNumeric ? `index (/education/${params.slug})` : `slug (/education/${params.slug})`}
            </span>
          </div>
        </div>

        {/* Title & Institution */}
        <div className="mt-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#00e676]/10 text-[#00e676]">
              <AcademicCapIcon className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                {item.degree}
              </h1>
              <p className="text-base text-[#58a6ff] font-medium mt-0.5">
                {item.institution}
              </p>
            </div>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="rounded-xl border border-[#30363d] bg-[#161b22]/70 p-4">
            <span className="text-xs font-mono text-[#6e7681] block">Academic Period</span>
            <span className="text-base font-semibold text-[#e6edf3] mt-1 block">
              {item.period}
            </span>
          </div>

          <div className="rounded-xl border border-[#30363d] bg-[#161b22]/70 p-4">
            <span className="text-xs font-mono text-[#6e7681] block">Grade / Percentage / Status</span>
            <span className="text-base font-semibold text-[#00e676] mt-1 block">
              {item.marks}
            </span>
          </div>

          <div className="rounded-xl border border-[#30363d] bg-[#161b22]/70 p-4">
            <span className="text-xs font-mono text-[#6e7681] block">Slug URL</span>
            <Link
              href={`/education/${eduSlug}`}
              className="text-xs font-mono text-[#58a6ff] hover:underline mt-1 block"
            >
              /education/{eduSlug}
            </Link>
          </div>

          <div className="rounded-xl border border-[#30363d] bg-[#161b22]/70 p-4">
            <span className="text-xs font-mono text-[#6e7681] block">Index URL</span>
            <Link
              href={`/education/${eduId}`}
              className="text-xs font-mono text-[#00e676] hover:underline mt-1 block"
            >
              /education/{eduId}
            </Link>
          </div>
        </div>

        {/* Academic Notes & Context */}
        <div className="mt-6 rounded-xl border border-[#30363d]/60 bg-[#161b22]/40 p-5">
          <h2 className="text-xs font-mono uppercase tracking-wider text-[#8b949e] mb-2">
            Program Description &amp; Highlights
          </h2>
          <p className="text-sm sm:text-base text-[#e6edf3] leading-relaxed">
            {item.notes}
          </p>
        </div>

        {/* Actions */}
        <div className="mt-8 pt-6 border-t border-[#30363d] flex flex-wrap items-center gap-4">
          <Link href="/education" className="btn-accent text-sm">
            View All Education
          </Link>
          <Link href="/projects" className="btn-outline text-sm">
            Explore Projects
          </Link>
        </div>
      </article>
    </div>
  );
}
