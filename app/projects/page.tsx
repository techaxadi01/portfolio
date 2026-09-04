import type { Metadata } from "next";
import { getPortfolioProfile } from "@/lib/profile";
import ProjectFilter from "@/components/project-filter";
import ClientProfileCard from "@/components/client-profile-card";
import { CodeIcon } from "@/components/icons";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Projects | Aditya Kumar",
  description: "Browse GitHub repositories, full-stack web applications, and lab projects built by Aditya Kumar."
};

export default async function ProjectsPage() {
  const profile = await getPortfolioProfile();

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Header Banner */}
      <section className="glass-card p-6 sm:p-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#00e676]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#00e676]/30 bg-[#00e676]/10 px-3 py-1 text-xs font-mono text-[#00e676] mb-4">
            <CodeIcon className="h-3.5 w-3.5" />
            <span>PORTFOLIO SHOWCASE</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Featured <span className="gradient-text">Projects</span> &amp; Repositories
          </h1>

          <p className="mt-4 text-base text-[#8b949e] leading-relaxed">
            Full-stack deliverables, MERN applications, and interactive web tools created as part of Christ University coursework and personal engineering experiments. Each project supports dual routing by both slug name and numeric index.
          </p>
        </div>
      </section>

      {/* Main Filterable Project Grid */}
      <section>
        <ProjectFilter initialProjects={profile.projects} />
      </section>

      {/* Live Client Card Demonstration */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-4">
        <div className="glass-card p-6 sm:p-8 lg:col-span-2">
          <h3 className="font-mono text-xs uppercase tracking-wider text-[#00e676] mb-2">
            Dynamic Routing Architecture
          </h3>
          <h4 className="text-xl font-bold text-white mb-3">
            Slug &amp; Index Dual Route Resolution
          </h4>
          <p className="text-sm text-[#8b949e] leading-relaxed mb-4">
            Every project route in this Next.js App Router application is dual-resolving. For instance, <code className="text-[#00e676] bg-[#161b22] px-2 py-0.5 rounded font-mono text-xs">/projects/cia-3-fsd</code> and <code className="text-[#58a6ff] bg-[#161b22] px-2 py-0.5 rounded font-mono text-xs">/projects/1</code> resolve to the exact same project entry, supporting both human-friendly URLs and predictable database index parameters.
          </p>
          <div className="flex flex-wrap gap-2 text-xs font-mono text-[#8b949e]">
            <span className="tag text-[11px]">Server Component</span>
            <span className="tag tag-blue text-[11px]">generateStaticParams</span>
            <span className="tag tag-purple text-[11px]">Dynamic Matcher</span>
          </div>
        </div>

        <div>
          <ClientProfileCard />
        </div>
      </section>
    </div>
  );
}
