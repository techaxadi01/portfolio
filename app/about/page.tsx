import type { Metadata } from "next";
import Link from "next/link";
import { getPortfolioProfile, slugify } from "@/lib/profile";
import { AcademicCapIcon, TrophyIcon, LocationIcon, MailIcon, ArrowRightIcon, ExternalLinkIcon } from "@/components/icons";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "About | Aditya Kumar",
  description: "Learn more about Aditya Kumar, MCA student at Christ University, background, education, and development focus."
};

export default async function AboutPage() {
  const profile = await getPortfolioProfile();

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Header Banner */}
      <section className="glass-card p-6 sm:p-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#00e676]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#00e676]/30 bg-[#00e676]/10 px-3 py-1 text-xs font-mono text-[#00e676] mb-4">
            <span>ABOUT ME</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Building with <span className="gradient-text">Precision</span> &amp; Modern Frameworks
          </h1>

          <p className="mt-4 text-base sm:text-lg text-[#8b949e] leading-relaxed">
            {profile.intro}
          </p>

          <p className="mt-3 text-sm text-[#8b949e] leading-relaxed">
            {profile.summary} Currently pursuing Master of Computer Applications (MCA) at Christ Deemed to be University, Bengaluru, bridging computer science fundamentals with modern production-grade Next.js, React, and REST API architectures.
          </p>
        </div>
      </section>

      {/* Grid: Details and Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Quick Profile Info */}
        <div className="space-y-6">
          <div className="glass-card p-6">
            <h2 className="font-mono text-xs uppercase tracking-wider text-[#00e676] mb-4">
              Quick Details
            </h2>

            <dl className="space-y-4 text-sm">
              <div className="border-b border-[#30363d]/60 pb-3">
                <dt className="text-xs font-mono text-[#6e7681]">Full Name</dt>
                <dd className="font-medium text-white mt-0.5">{profile.fullName}</dd>
              </div>

              <div className="border-b border-[#30363d]/60 pb-3">
                <dt className="text-xs font-mono text-[#6e7681]">Current Status</dt>
                <dd className="font-medium text-[#00e676] mt-0.5">{profile.role}</dd>
              </div>

              <div className="border-b border-[#30363d]/60 pb-3">
                <dt className="text-xs font-mono text-[#6e7681]">Location</dt>
                <dd className="font-medium text-white mt-0.5 flex items-center gap-1.5">
                  <LocationIcon className="h-3.5 w-3.5 text-[#58a6ff]" />
                  {profile.location}
                </dd>
              </div>

              <div className="border-b border-[#30363d]/60 pb-3">
                <dt className="text-xs font-mono text-[#6e7681]">Email</dt>
                <dd className="font-mono text-xs text-[#58a6ff] mt-0.5 break-all">
                  <a href={`mailto:${profile.email}`} className="hover:underline">
                    {profile.email}
                  </a>
                </dd>
              </div>

              <div>
                <dt className="text-xs font-mono text-[#6e7681]">GitHub &amp; LinkedIn</dt>
                <dd className="flex items-center gap-3 mt-1.5 font-mono text-xs">
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#00e676] hover:underline"
                  >
                    GitHub &rarr;
                  </a>
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#58a6ff] hover:underline"
                  >
                    LinkedIn &rarr;
                  </a>
                </dd>
              </div>
            </dl>
          </div>

          {/* Quick CTA Card */}
          <div className="glass-card p-6 border-[#00e676]/30 bg-gradient-to-br from-[#161b22] to-[#1c2128]">
            <h3 className="text-base font-bold text-white">Interested in collaborating?</h3>
            <p className="text-xs text-[#8b949e] mt-2">
              I am open to software developer internships, full-stack projects, and innovative technical roles.
            </p>
            <div className="mt-4 flex flex-col gap-2">
              <Link href="/contact" className="btn-accent text-xs py-2">
                Send a Message
              </Link>
              <Link href="/resume" className="btn-outline text-xs py-2">
                View Curriculum Vitae
              </Link>
            </div>
          </div>
        </div>

        {/* Right 2 Columns: Experience & Educational Progression */}
        <div className="lg:col-span-2 space-y-8">
          {/* Experience & Leadership */}
          <div className="glass-card p-6 sm:p-8">
            <div className="flex items-center gap-2 border-b border-[#30363d] pb-4 mb-6">
              <TrophyIcon className="h-5 w-5 text-[#00e676]" />
              <h2 className="text-xl font-bold text-white">Leadership &amp; Experience</h2>
            </div>

            <div className="space-y-6">
              {profile.experience.map((item) => (
                <div key={item.role} className="border-l-2 border-[#00e676] pl-5 relative">
                  <div className="absolute -left-[7px] top-1.5 h-3 w-3 rounded-full bg-[#00e676] shadow-[0_0_8px_#00e676]" />
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <h3 className="text-lg font-bold text-white">{item.role}</h3>
                    <span className="tag text-xs">{item.period}</span>
                  </div>
                  <p className="text-sm font-medium text-[#58a6ff] mt-0.5">
                    {item.organization} &bull; {item.location}
                  </p>
                  <ul className="mt-3 space-y-2 text-sm text-[#8b949e]">
                    {item.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-2">
                        <span className="text-[#00e676] mt-1">&bull;</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Academic Background */}
          <div className="glass-card p-6 sm:p-8">
            <div className="flex items-center justify-between border-b border-[#30363d] pb-4 mb-6">
              <div className="flex items-center gap-2">
                <AcademicCapIcon className="h-5 w-5 text-[#58a6ff]" />
                <h2 className="text-xl font-bold text-white">Academic Journey</h2>
              </div>
              <Link href="/education" className="text-xs font-mono text-[#00e676] hover:underline">
                Dedicated View &rarr;
              </Link>
            </div>

            <div className="space-y-6">
              {profile.education.map((item, idx) => {
                const eduSlug = slugify(item.degree);
                const eduId = item.id ?? idx + 1;

                return (
                  <div
                    key={`${item.degree}-${item.period}`}
                    className="border-l border-[#30363d] pl-5 pb-6 last:pb-0 relative"
                  >
                    <div className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full bg-[#58a6ff]" />
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <h3 className="text-base font-semibold text-white">
                        <Link href={`/education/${eduSlug}`} className="hover:text-[#00e676] transition-colors">
                          {item.degree}
                        </Link>
                      </h3>
                      <span className="font-mono text-xs text-[#00e676]">{item.marks}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#8b949e] mt-1">
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
                    <p className="text-xs text-[#6e7681] mt-1">{item.notes}</p>
                    <div className="flex items-center gap-2 font-mono text-[11px] text-[#6e7681] mt-2">
                      <Link href={`/education/${eduSlug}`} className="text-[#58a6ff] hover:underline">
                        /{eduSlug}
                      </Link>
                      <span>&bull;</span>
                      <Link href={`/education/${eduId}`} className="text-[#00e676] hover:underline">
                        /{eduId}
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
