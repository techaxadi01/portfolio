import type { Metadata } from "next";
import Link from "next/link";
import { getPortfolioProfile, slugify } from "@/lib/profile";
import { AcademicCapIcon, ArrowRightIcon, ExternalLinkIcon } from "@/components/icons";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const profile = await getPortfolioProfile();
  return {
    title: `Education | ${profile.fullName}`,
    description: `Academic qualifications, degrees, marks, and educational milestones of ${profile.fullName}.`
  };
}

export default async function EducationPage() {
  const profile = await getPortfolioProfile();

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Header Banner */}
      <section className="glass-card p-6 sm:p-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#58a6ff]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#58a6ff]/30 bg-[#58a6ff]/10 px-3 py-1 text-xs font-mono text-[#58a6ff] mb-4">
            <AcademicCapIcon className="h-3.5 w-3.5" />
            <span>ACADEMIC BACKGROUND</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Academic <span className="gradient-text">Qualifications</span>
          </h1>

          <p className="mt-4 text-base text-[#8b949e] leading-relaxed">
            A comprehensive record of formal academic degrees, qualifications{profile.education[0] ? ` at ${profile.education[0].institution}` : ""}, and continuous technical foundations. Each degree is accessible via both slug and numeric index routing.
          </p>
        </div>
      </section>

      {/* Grid of Education Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {profile.education.map((item, idx) => {
          const eduSlug = slugify(item.degree);
          const eduId = item.id ?? idx + 1;

          return (
            <article
              key={item.degree}
              className="glass-card p-6 flex flex-col justify-between group hover:border-[#00e676]/50 transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#00e676]/5 rounded-full blur-xl pointer-events-none group-hover:bg-[#00e676]/10 transition-all" />

              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="tag text-xs font-mono">{item.period}</span>
                  <span className="tag tag-blue text-xs font-mono">#{eduId}</span>
                </div>

                <h2 className="text-xl font-bold text-white group-hover:text-[#00e676] transition-colors">
                  <Link href={`/education/${eduSlug}`}>
                    {item.degree}
                  </Link>
                </h2>

                <p className="text-sm font-medium text-[#58a6ff] mt-1.5">
                  {item.website ? (
                    <a
                      href={item.website}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:underline hover:text-[#00e676] inline-flex items-center gap-1 transition-colors"
                    >
                      {item.institution}
                      <ExternalLinkIcon className="h-3 w-3" />
                    </a>
                  ) : (
                    item.institution
                  )}
                </p>

                <div className="mt-3 inline-block rounded-md border border-[#30363d] bg-[#161b22] px-3 py-1 text-xs font-mono text-[#00e676]">
                  Grade / Marks: {item.marks}
                </div>

                <p className="mt-3 text-xs sm:text-sm text-[#8b949e] leading-relaxed">
                  {item.notes}
                </p>
              </div>

              {/* Bottom Routes and Action */}
              <div className="mt-6 pt-4 border-t border-[#30363d]/60">
                <div className="flex items-center justify-between text-xs font-mono mb-3">
                  <span className="text-[11px] text-[#6e7681]">Routes:</span>
                  <div className="flex items-center gap-2 text-[11px]">
                    <Link
                      href={`/education/${eduSlug}`}
                      className="text-[#58a6ff] hover:underline"
                    >
                      /{eduSlug}
                    </Link>
                    <span className="text-[#30363d]">&bull;</span>
                    <Link
                      href={`/education/${eduId}`}
                      className="text-[#00e676] hover:underline"
                    >
                      /{eduId}
                    </Link>
                  </div>
                </div>

                <Link
                  href={`/education/${eduSlug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#00e676] hover:underline"
                >
                  View full details
                  <ArrowRightIcon className="h-3.5 w-3.5" />
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
