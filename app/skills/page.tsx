import type { Metadata } from "next";
import Link from "next/link";
import { getPortfolioProfile } from "@/lib/profile";
import { CodeIcon, ExternalLinkIcon } from "@/components/icons";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const profile = await getPortfolioProfile();
  return {
    title: `Skills | ${profile.fullName}`,
    description: `Technical stack, tools, languages, and frameworks mastered by ${profile.fullName}.`
  };
}

interface SkillCategory {
  title: string;
  description: string;
  badge: string;
  badgeColor: "green" | "blue" | "purple";
  skills: {
    name: string;
    level: string;
    note: string;
  }[];
}

export default async function SkillsPage() {
  const profile = await getPortfolioProfile();

  const skillCategories: SkillCategory[] = [
    {
      title: "Frontend Engineering",
      description: "Modern, component-driven, responsive user interface development",
      badge: "Core Stack",
      badgeColor: "green",
      skills: [
        {
          name: "Next.js (App Router)",
          level: "Advanced",
          note: "Server components, streaming SSR, layouts, dynamic routes, API routes"
        },
        {
          name: "React 18",
          level: "Proficient",
          note: "Hooks, state management, client vs server boundaries, component architecture"
        },
        {
          name: "Tailwind CSS",
          level: "Proficient",
          note: "Utility-first responsive layouts, glassmorphism, dark themes, animations"
        },
        {
          name: "HTML5 & Modern CSS3",
          level: "Expert",
          note: "Semantic markup, CSS Grid, Flexbox, accessible UI design"
        }
      ]
    },
    {
      title: "Backend & Systems",
      description: "Server architectures, RESTful API design, and web backend logic",
      badge: "Full Stack",
      badgeColor: "blue",
      skills: [
        {
          name: "REST API Design",
          level: "Proficient",
          note: "Standard HTTP methods, JSON contract design, status codes, query handling"
        },
        {
          name: "Node.js & Express",
          level: "Working Knowledge",
          note: "Middleware chains, authentication routines, modular routing"
        },
        {
          name: "MongoDB & Atlas",
          level: "Familiar",
          note: "Document schemas, Atlas cloud clusters, MERN stack integration"
        },
        {
          name: "JavaScript (ES6+)",
          level: "Proficient",
          note: "Async/await, Promises, functional array pipelines, DOM operations"
        }
      ]
    },
    {
      title: "Tools, Workflow & Leadership",
      description: "Development workflows, version control, and team disciplines",
      badge: "Methodology",
      badgeColor: "purple",
      skills: [
        {
          name: "Git & GitHub",
          level: "Daily Driver",
          note: "Branching, PRs, version tracking, multi-repository management"
        },
        {
          name: "TypeScript Foundations",
          level: "Intermediate",
          note: "Strongly typed data contracts, interface definitions, Next.js type safety"
        },
        {
          name: "Leadership & Discipline",
          level: "Certified",
          note: profile.certifications.length > 0
            ? profile.certifications.map((c) => `${c.name} (Grade ${c.grade})`).join(", ")
            : "Disciplined execution, peer leadership, and proactive accountability."
        },
        {
          name: "Academic Computer Science",
          level: profile.education[0]?.degree ? `Ongoing (${profile.education[0].degree})` : "Coursework",
          note: profile.education[0]
            ? `${profile.education[0].institution}: ${profile.education[0].notes}`
            : "Advanced data structures, computer networks, and software engineering principles."
        }
      ]
    }
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Header Banner */}
      <section className="glass-card p-6 sm:p-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#00e676]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#00e676]/30 bg-[#00e676]/10 px-3 py-1 text-xs font-mono text-[#00e676] mb-4">
            <CodeIcon className="h-3.5 w-3.5" />
            <span>TECHNICAL CAPABILITIES</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Skills &amp; <span className="gradient-text">Technologies</span>
          </h1>

          <p className="mt-4 text-base text-[#8b949e] leading-relaxed">
            A specialized overview of programming languages, modern frameworks, database technologies, and developer tooling utilized across my academic and open-source projects.
          </p>

          {/* Quick pills from CV data */}
          <div className="mt-6 flex flex-wrap gap-2">
            {profile.skills.map((skill) => (
              <span
                key={skill}
                className="tag text-xs"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Categorized Detailed Skill Blocks */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {skillCategories.map((category) => {
          const badgeClass =
            category.badgeColor === "green"
              ? "tag"
              : category.badgeColor === "blue"
              ? "tag tag-blue"
              : "tag tag-purple";

          return (
            <div
              key={category.title}
              className="glass-card p-6 sm:p-8 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className={badgeClass}>{category.badge}</span>
                </div>

                <h2 className="text-xl font-bold text-white">{category.title}</h2>
                <p className="text-xs text-[#8b949e] mt-1 mb-6">
                  {category.description}
                </p>

                <div className="space-y-4">
                  {category.skills.map((item) => (
                    <div
                      key={item.name}
                      className="rounded-lg border border-[#30363d]/70 bg-[#161b22]/70 p-3.5 hover:border-[#00e676]/40 transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-sm text-[#e6edf3]">
                          {item.name}
                        </span>
                        <span className="font-mono text-[11px] text-[#00e676]">
                          {item.level}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-[#8b949e] leading-relaxed">
                        {item.note}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#30363d]/60 text-right">
                <Link
                  href="/projects"
                  className="text-xs font-mono text-[#00e676] hover:underline inline-flex items-center gap-1"
                >
                  See projects built with this stack &rarr;
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
