import type { Metadata } from "next";
import { getPortfolioProfile } from "@/lib/profile";
import { MailIcon, GithubIcon, LinkedinIcon, LocationIcon } from "@/components/icons";
import ContactForm from "./contact-form";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const profile = await getPortfolioProfile();
  return {
    title: `Contact | ${profile.fullName}`,
    description: `Connect with ${profile.fullName} for software engineering roles, full-stack projects, and collaborations.`
  };
}

export default async function ContactPage() {
  const profile = await getPortfolioProfile();

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Header Banner */}
      <section className="glass-card p-6 sm:p-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#00e676]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#00e676]/30 bg-[#00e676]/10 px-3 py-1 text-xs font-mono text-[#00e676] mb-4">
            <MailIcon className="h-3.5 w-3.5" />
            <span>LET&apos;S TALK</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Get In <span className="gradient-text">Touch</span>
          </h1>

          <p className="mt-4 text-base text-[#8b949e] leading-relaxed">
            Whether you have an internship opportunity, a project to discuss, or simply want to connect about Next.js and web development, my inbox is always open.
          </p>
        </div>
      </section>

      {/* Main Grid: Direct Channels & Interactive Form */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Direct Channels (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card p-6 sm:p-8 space-y-6">
            <h2 className="font-mono text-xs uppercase tracking-wider text-[#00e676]">
              Direct Contact Details
            </h2>

            <div className="space-y-4">
              <div className="rounded-xl border border-[#30363d] bg-[#161b22]/70 p-4">
                <span className="text-xs font-mono text-[#6e7681] block">Primary Email</span>
                <a
                  href={`mailto:${profile.email}`}
                  className="text-sm font-medium text-[#58a6ff] hover:underline mt-1 block break-all"
                >
                  {profile.email}
                </a>
              </div>

              <div className="rounded-xl border border-[#30363d] bg-[#161b22]/70 p-4">
                <span className="text-xs font-mono text-[#6e7681] block">Location</span>
                <span className="text-sm font-medium text-[#e6edf3] mt-1 flex items-center gap-1.5">
                  <LocationIcon className="h-4 w-4 text-[#00e676]" />
                  {profile.location}
                </span>
              </div>

              <div className="rounded-xl border border-[#30363d] bg-[#161b22]/70 p-4">
                <span className="text-xs font-mono text-[#6e7681] block">Affiliation</span>
                <span className="text-sm font-medium text-[#e6edf3] mt-1 block">
                  {profile.education[0]?.institution || profile.role}
                </span>
              </div>
            </div>

            {/* Social Cards */}
            <div className="pt-4 border-t border-[#30363d]/60 space-y-3">
              <h3 className="text-xs font-mono text-[#8b949e]">Connect Online</h3>
              <div className="flex flex-col gap-2">
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between rounded-lg border border-[#30363d] bg-[#161b22] px-4 py-2.5 text-xs text-[#e6edf3] hover:border-[#00e676] hover:text-[#00e676] transition-all"
                >
                  <span className="flex items-center gap-2">
                    <GithubIcon className="h-4 w-4" />
                    GitHub Profile
                  </span>
                  <span className="font-mono text-[#6e7681]">&rarr;</span>
                </a>

                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between rounded-lg border border-[#30363d] bg-[#161b22] px-4 py-2.5 text-xs text-[#e6edf3] hover:border-[#58a6ff] hover:text-[#58a6ff] transition-all"
                >
                  <span className="flex items-center gap-2">
                    <LinkedinIcon className="h-4 w-4" />
                    LinkedIn Profile
                  </span>
                  <span className="font-mono text-[#6e7681]">&rarr;</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Form (3 cols) */}
        <div className="lg:col-span-3">
          <ContactForm email={profile.email} recipientName={profile.fullName.split(" ")[0]} />
        </div>
      </div>
    </div>
  );
}
