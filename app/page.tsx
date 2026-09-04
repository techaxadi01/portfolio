import Image from "next/image";
import Link from "next/link";
import { getPortfolioProfile, slugify } from "@/lib/profile";
import { GithubIcon, LinkedinIcon, MailIcon, ExternalLinkIcon, CodeIcon, AcademicCapIcon, ArrowRightIcon } from "@/components/icons";
import ClientProfileCard from "@/components/client-profile-card";

export const dynamic = "force-dynamic";

export default async function Home() {
  const profile = await getPortfolioProfile();

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16">
      {/* Hero Section */}
      <section className="glass-card p-6 sm:p-10 lg:p-12 relative overflow-hidden">
        {/* Glow ambient circle */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#00e676]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-[#58a6ff]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col-reverse lg:flex-row items-center justify-between gap-8 lg:gap-12">
          {/* Left Hero Details */}
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#00e676]/30 bg-[#00e676]/10 px-3.5 py-1.5 text-xs font-mono text-[#00e676] mb-6">
              <span className="live-dot" />
              <span>Available for Opportunities &bull; MCA @ Christ</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white">
              Hi, I&apos;m{" "}
              <span className="gradient-text">{profile.fullName}</span>
            </h1>

            <p className="mt-3 text-lg sm:text-xl font-medium text-[#58a6ff]">
              {profile.role}
            </p>

            <p className="mt-4 max-w-2xl text-sm sm:text-base leading-relaxed text-[#8b949e]">
              {profile.intro}
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-3">
              <Link href="/projects" className="btn-accent text-sm">
                Explore Projects
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
              <Link href="/resume" className="btn-outline text-sm">
                View Resume
              </Link>
              <Link href="/contact" className="btn-outline text-sm">
                Contact Me
              </Link>
            </div>

            {/* Social Links */}
            <div className="mt-8 flex items-center justify-center lg:justify-start gap-3 border-t border-[#30363d]/60 pt-6">
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#30363d] bg-[#161b22] text-[#8b949e] hover:border-[#00e676] hover:text-[#00e676] hover:shadow-[0_0_12px_rgba(0,230,118,0.2)] transition-all"
                aria-label="GitHub Profile"
              >
                <GithubIcon className="h-4 w-4" />
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#30363d] bg-[#161b22] text-[#8b949e] hover:border-[#00e676] hover:text-[#00e676] hover:shadow-[0_0_12px_rgba(0,230,118,0.2)] transition-all"
                aria-label="LinkedIn Profile"
              >
                <LinkedinIcon className="h-4 w-4" />
              </a>
              <a
                href={`mailto:${profile.email}`}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#30363d] bg-[#161b22] text-[#8b949e] hover:border-[#00e676] hover:text-[#00e676] hover:shadow-[0_0_12px_rgba(0,230,118,0.2)] transition-all"
                aria-label="Send Email"
              >
                <MailIcon className="h-4 w-4" />
              </a>
              <span className="text-xs font-mono text-[#6e7681] ml-2">
                {profile.location}
              </span>
            </div>
          </div>

          {/* Right Hero Image - Oval Shape */}
          <div className="relative group flex items-center justify-center">
            {/* Ambient oval glow behind portrait */}
            <div className="absolute -inset-2 rounded-[50%] bg-gradient-to-tr from-[#00e676] via-[#00b0ff] to-[#bc8cff] opacity-35 blur-xl group-hover:opacity-65 group-hover:blur-2xl transition-all duration-500" />
            
            {/* Oval frame with glowing accent border */}
            <div className="relative h-[270px] w-[210px] sm:h-[295px] sm:w-[230px] overflow-hidden rounded-[50%] border-2 border-[#00e676]/60 bg-[#161b22] p-1 shadow-[0_0_25px_rgba(0,230,118,0.25)] group-hover:border-[#00e676] group-hover:shadow-[0_0_35px_rgba(0,230,118,0.45)] transition-all duration-500">
              <div className="h-full w-full overflow-hidden rounded-[50%]">
                <Image
                  src={profile.photo}
                  alt={`${profile.fullName} Portrait`}
                  width={240}
                  height={300}
                  priority
                  className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats Grid */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-card p-5 text-center">
          <p className="font-mono text-3xl font-bold text-[#00e676]">2028</p>
          <p className="text-xs font-medium text-[#8b949e] mt-1">MCA Graduation Year</p>
        </div>
        <div className="glass-card p-5 text-center">
          <p className="font-mono text-3xl font-bold text-[#58a6ff]">{profile.projects.length}</p>
          <p className="text-xs font-medium text-[#8b949e] mt-1">Featured Projects</p>
        </div>
        <div className="glass-card p-5 text-center">
          <p className="font-mono text-3xl font-bold text-[#bc8cff]">8.08</p>
          <p className="text-xs font-medium text-[#8b949e] mt-1">BSc (PCM) CGPA</p>
        </div>
        <div className="glass-card p-5 text-center flex flex-col justify-center">
          <p className="font-mono text-xl sm:text-2xl font-bold text-[#00e676] leading-snug">
            NCC
            <span className="block text-xs sm:text-sm font-semibold mt-0.5">&apos;C Certificate&apos;</span>
          </p>
          <p className="text-xs font-medium text-[#8b949e] mt-1">Senior Division Cert</p>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-[#00e676]">
              <CodeIcon className="h-4 w-4" />
              <span>SHOWCASE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
              Featured Projects
            </h2>
          </div>
          <Link
            href="/projects"
            className="text-xs font-mono text-[#00e676] hover:underline inline-flex items-center gap-1"
          >
            View all {profile.projects.length} projects &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {profile.projects.slice(0, 3).map((project, idx) => {
            const projectSlug = slugify(project.name);
            const projectId = project.id ?? idx + 1;

            return (
              <article
                key={project.name}
                className="glass-card p-6 flex flex-col justify-between group hover:border-[#00e676]/50 transition-all duration-300 relative"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="tag text-xs font-mono">{project.language}</span>
                    <span className="font-mono text-xs text-[#6e7681]">#{projectId}</span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-[#00e676] transition-colors">
                    <Link href={`/projects/${projectSlug}`}>
                      {project.name}
                    </Link>
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm text-[#8b949e] line-clamp-2">
                    {project.summary}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#30363d]/60 flex items-center justify-between">
                  <div className="flex items-center gap-2 font-mono text-xs">
                    <Link
                      href={`/projects/${projectSlug}`}
                      className="text-[#58a6ff] hover:underline"
                    >
                      slug
                    </Link>
                    <span className="text-[#30363d]">&bull;</span>
                    <Link
                      href={`/projects/${projectId}`}
                      className="text-[#00e676] hover:underline"
                    >
                      id: {projectId}
                    </Link>
                  </div>

                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-mono text-[#8b949e] hover:text-white flex items-center gap-1"
                    >
                      <GithubIcon className="h-3.5 w-3.5" />
                      Code
                    </a>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Main Two-Column Content: Education & Skills + Client Profile Card */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Education & Experience */}
        <div className="lg:col-span-2 space-y-8">
          {/* Education Highlights */}
          <div className="glass-card p-6 sm:p-8">
            <div className="flex items-center justify-between border-b border-[#30363d] pb-4 mb-6">
              <div className="flex items-center gap-2">
                <AcademicCapIcon className="h-5 w-5 text-[#00e676]" />
                <h3 className="text-lg font-bold text-white">Education Milestones</h3>
              </div>
              <Link href="/education" className="text-xs font-mono text-[#00e676] hover:underline">
                View all &rarr;
              </Link>
            </div>

            <div className="space-y-6">
              {profile.education.slice(0, 3).map((item, idx) => {
                const eduSlug = slugify(item.degree);
                const eduId = item.id ?? idx + 1;

                return (
                  <div key={item.degree} className="relative pl-6 border-l border-[#30363d] pb-6 last:pb-0">
                    <div className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-[#00e676] shadow-[0_0_8px_#00e676]" />
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <h4 className="text-base font-semibold text-white hover:text-[#00e676] transition-colors">
                        <Link href={`/education/${eduSlug}`}>{item.degree}</Link>
                      </h4>
                      <span className="tag text-[11px] py-0.5 px-2">{item.marks}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#58a6ff] mt-1">
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
                    <div className="flex items-center gap-3 mt-2 text-xs font-mono text-[#6e7681]">
                      <span>{item.period}</span>
                      <span>&bull;</span>
                      <Link href={`/education/${eduSlug}`} className="text-[#8b949e] hover:text-[#00e676]">
                        Route: /{eduSlug}
                      </Link>
                      <span>&bull;</span>
                      <Link href={`/education/${eduId}`} className="text-[#8b949e] hover:text-[#00e676]">
                        /{eduId}
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Technical Skills */}
          <div className="glass-card p-6 sm:p-8">
            <div className="flex items-center gap-2 border-b border-[#30363d] pb-4 mb-6">
              <CodeIcon className="h-5 w-5 text-[#58a6ff]" />
              <h3 className="text-lg font-bold text-white">Core Competencies &amp; Skills</h3>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {profile.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-lg border border-[#30363d] bg-[#161b22] px-3.5 py-2 text-xs font-mono text-[#e6edf3] hover:border-[#00e676] hover:text-[#00e676] transition-all"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right 1 Col: Summary & Client Inspector */}
        <div className="space-y-8">
          {/* About / Summary Box */}
          <div className="glass-card p-6 sm:p-8">
            <h3 className="font-mono text-xs uppercase tracking-wider text-[#00e676] mb-3">
              Professional Summary
            </h3>
            <p className="text-sm text-[#8b949e] leading-relaxed">
              {profile.summary}
            </p>
            <div className="mt-6 pt-4 border-t border-[#30363d]/60">
              <Link
                href="/about"
                className="inline-flex items-center gap-1 text-xs font-mono text-[#00e676] hover:underline"
              >
                Read full background &rarr;
              </Link>
            </div>
          </div>

          {/* Client-side profile card demonstrating full-stack API integration */}
          <ClientProfileCard />
        </div>
      </section>
    </div>
  );
}
