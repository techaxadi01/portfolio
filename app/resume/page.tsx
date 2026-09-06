import type { Metadata } from "next";
import Link from "next/link";
import { getPortfolioProfile } from "@/lib/profile";
import { MailIcon, GithubIcon, LinkedinIcon, LocationIcon, ExternalLinkIcon } from "@/components/icons";
import PrintButton from "./print-button";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const profile = await getPortfolioProfile();
  return {
    title: `Resume | ${profile.fullName}`,
    description: `Curriculum Vitae and professional resume of ${profile.fullName} - ${profile.role}.`
  };
}

export default async function ResumePage() {
  const profile = await getPortfolioProfile();

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Top action bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 glass-card p-4 sm:p-6 no-print">
        <div>
          <h1 className="text-xl font-bold text-white">Curriculum Vitae</h1>
          <p className="text-xs text-[#8b949e] mt-0.5">
            Updated {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })} &bull; {profile.role}
          </p>
        </div>
        <PrintButton />
      </div>

      {/* Printable CV Document Container */}
      <div className="glass-card p-8 sm:p-12 space-y-10 border border-[#30363d]">
        {/* Document Header */}
        <header className="border-b border-[#30363d] pb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                {profile.fullName}
              </h2>
              <p className="text-base sm:text-lg font-medium text-[#00e676] mt-1">
                {profile.role}
              </p>
              <p className="text-xs text-[#8b949e] mt-1 flex items-center gap-1.5">
                <LocationIcon className="h-3.5 w-3.5" />
                {profile.location}
              </p>
            </div>

            <div className="flex flex-col gap-1.5 text-xs font-mono text-[#8b949e]">
              <a
                href={`mailto:${profile.email}`}
                className="hover:text-[#00e676] transition-colors flex items-center gap-2"
              >
                <MailIcon className="h-3.5 w-3.5" />
                {profile.email}
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#00e676] transition-colors flex items-center gap-2"
              >
                <GithubIcon className="h-3.5 w-3.5" />
                {profile.github.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#00e676] transition-colors flex items-center gap-2"
              >
                <LinkedinIcon className="h-3.5 w-3.5" />
                {profile.linkedin.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}
              </a>
            </div>
          </div>

          <div className="mt-6 text-sm text-[#8b949e] leading-relaxed">
            {profile.intro} {profile.summary}
          </div>
        </header>

        {/* Technical Skills */}
        <section>
          <h3 className="text-xs font-mono uppercase tracking-widest text-[#00e676] border-b border-[#30363d] pb-2 mb-4">
            Technical Competencies
          </h3>
          <div className="flex flex-wrap gap-2">
            {profile.skills.map((skill) => (
              <span key={skill} className="tag text-xs">
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* Education */}
        <section>
          <h3 className="text-xs font-mono uppercase tracking-widest text-[#00e676] border-b border-[#30363d] pb-2 mb-6">
            Education
          </h3>
          <div className="space-y-6">
            {profile.education.map((item) => (
              <div key={item.degree} className="border-l-2 border-[#00e676]/60 pl-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h4 className="text-base font-bold text-white">{item.degree}</h4>
                  <span className="font-mono text-xs text-[#00e676]">{item.period}</span>
                </div>
                <p className="text-xs sm:text-sm text-[#58a6ff] mt-0.5">
                  {item.website ? (
                    <a
                      href={item.website}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:underline hover:text-[#00e676] inline-flex items-center gap-1 transition-colors"
                    >
                      {item.institution}
                      <ExternalLinkIcon className="h-3 w-3 no-print" />
                    </a>
                  ) : (
                    item.institution
                  )}
                </p>
                <p className="text-xs font-mono text-[#8b949e] mt-1">Result: {item.marks}</p>
                <p className="text-xs text-[#8b949e] mt-1.5 leading-relaxed">{item.notes}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section>
          <h3 className="text-xs font-mono uppercase tracking-widest text-[#00e676] border-b border-[#30363d] pb-2 mb-6">
            Selected Projects
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {profile.projects.map((project) => (
              <div
                key={project.name}
                className="rounded-xl border border-[#30363d] bg-[#161b22]/60 p-4"
              >
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-sm font-bold text-white">{project.name}</h4>
                  <span className="tag text-[10px] font-mono py-0 px-2">{project.language}</span>
                </div>
                <p className="text-xs text-[#8b949e] mt-2 leading-relaxed">
                  {project.summary}
                </p>
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 text-xs font-mono text-[#58a6ff] hover:underline inline-block"
                  >
                    View Repository &rarr;
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Experience & NCC Certifications */}
        <section>
          <h3 className="text-xs font-mono uppercase tracking-widest text-[#00e676] border-b border-[#30363d] pb-2 mb-6">
            Leadership, Co-Curricular &amp; Certifications
          </h3>

          <div className="space-y-6">
            {profile.experience.map((exp) => (
              <div key={exp.role} className="border-l-2 border-[#58a6ff]/60 pl-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h4 className="text-base font-bold text-white">{exp.role}</h4>
                  <span className="font-mono text-xs text-[#8b949e]">{exp.period}</span>
                </div>
                <p className="text-xs sm:text-sm text-[#58a6ff] mt-0.5">
                  {exp.organization} - {exp.location}
                </p>
                <ul className="mt-2 space-y-1 text-xs text-[#8b949e]">
                  {exp.bullets.map((b) => (
                    <li key={b}>&bull; {b}</li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {profile.certifications.map((cert) => (
                <div key={cert.name} className="rounded-lg border border-[#30363d] bg-[#161b22]/60 p-3">
                  <p className="text-xs font-medium text-white">{cert.name}</p>
                  <p className="text-[11px] font-mono text-[#00e676] mt-1">
                    Year: {cert.year} &bull; Grade: {cert.grade}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
