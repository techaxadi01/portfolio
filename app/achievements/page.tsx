import type { Metadata } from "next";
import Link from "next/link";
import { getPortfolioProfile } from "@/lib/profile";
import { TrophyIcon, ArrowRightIcon } from "@/components/icons";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Achievements | Aditya Kumar",
  description: "National Cadet Corps (NCC) senior division certifications, awards, and credentials of Aditya Kumar."
};

export default async function AchievementsPage() {
  const profile = await getPortfolioProfile();

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Header Banner */}
      <section className="glass-card p-6 sm:p-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#00e676]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#00e676]/30 bg-[#00e676]/10 px-3 py-1 text-xs font-mono text-[#00e676] mb-4">
            <TrophyIcon className="h-3.5 w-3.5" />
            <span>HONORS &amp; SERVICE</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Achievements &amp; <span className="gradient-text">Certifications</span>
          </h1>

          <p className="mt-4 text-base text-[#8b949e] leading-relaxed">
            Military discipline, rigorous training, and national-level cadet leadership distinctions earned through the National Cadet Corps (NCC) Senior Division, alongside technical proficiencies.
          </p>
        </div>
      </section>

      {/* Grid: NCC Experience & Official Certifications */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* NCC Experience */}
        <section className="glass-card p-6 sm:p-8">
          <div className="flex items-center gap-2.5 border-b border-[#30363d] pb-4 mb-6">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#00e676]/10 text-[#00e676]">
              <TrophyIcon className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">NCC Senior Division Experience</h2>
              <span className="text-xs font-mono text-[#8b949e]">National Cadet Corps &bull; Raipur</span>
            </div>
          </div>

          <div className="space-y-6">
            {profile.experience.map((item) => (
              <div key={item.role} className="rounded-xl border border-[#30363d] bg-[#161b22]/70 p-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-lg font-bold text-[#e6edf3]">{item.role}</h3>
                  <span className="tag text-xs">{item.period}</span>
                </div>
                <p className="text-sm font-medium text-[#58a6ff] mt-1">
                  {item.organization} &bull; {item.location}
                </p>

                <ul className="mt-4 space-y-2.5 text-sm text-[#8b949e]">
                  {item.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2.5">
                      <span className="text-[#00e676] font-bold mt-0.5">&bull;</span>
                      <span className="leading-relaxed">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-lg border border-[#00e676]/20 bg-[#00e676]/5 p-4">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#00e676] mb-1">
              Core Takeaways
            </h4>
            <p className="text-xs text-[#8b949e] leading-relaxed">
              Drill discipline, crisis management under physical pressure, team coordination, and perseverance directly applicable to high-paced software engineering sprints.
            </p>
          </div>
        </section>

        {/* Official Certifications */}
        <section className="glass-card p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2.5 border-b border-[#30363d] pb-4 mb-6">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#58a6ff]/10 text-[#58a6ff]">
                <TrophyIcon className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Awarded Certifications</h2>
                <span className="text-xs font-mono text-[#8b949e]">Ministry of Defence Validated</span>
              </div>
            </div>

            <div className="space-y-4">
              {profile.certifications.map((cert) => (
                <div
                  key={cert.name}
                  className="rounded-xl border border-[#30363d] bg-[#161b22]/70 p-5 hover:border-[#00e676]/50 transition-all group"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-base font-bold text-white group-hover:text-[#00e676] transition-colors">
                        {cert.name}
                      </h3>
                      <p className="text-xs font-mono text-[#8b949e] mt-1">
                        Year Awarded: {cert.year}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="tag text-xs font-mono">
                        Grade {cert.grade}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-[#30363d]/60 flex flex-wrap items-center justify-between gap-4">
            <Link href="/resume" className="btn-accent text-xs">
              View Verified Resume
              <ArrowRightIcon className="h-3.5 w-3.5" />
            </Link>
            <Link href="/contact" className="btn-outline text-xs">
              Contact Aditya
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
