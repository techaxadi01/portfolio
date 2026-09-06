import Image from "next/image";
import { GithubIcon, LinkedinIcon, MailIcon } from "@/components/icons";
import { getPortfolioProfile } from "@/lib/profile";

export default async function Footer() {
  const profile = await getPortfolioProfile();

  return (
    <footer className="border-t border-[#30363d] bg-[#0d1117] py-12 text-[#8b949e] no-print">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Info */}
          <div className="flex flex-col items-center md:items-start gap-2 text-center md:text-left">
            <div className="flex items-center gap-2.5">
              <div className="h-6 w-6 overflow-hidden rounded bg-[#161b22] border border-[#30363d] p-0.5 flex items-center justify-center">
                <Image
                  src="/logo.svg"
                  alt={`${profile.fullName} Logo`}
                  width={20}
                  height={20}
                  className="h-full w-full object-contain"
                />
              </div>
              <span className="text-sm font-semibold text-[#e6edf3]">{profile.fullName}</span>
            </div>
            <p className="text-xs text-[#8b949e] max-w-md">
              {profile.summary || profile.intro}
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            {profile.github && (
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#30363d] bg-[#161b22] text-[#8b949e] hover:border-[#00e676] hover:text-[#00e676] hover:shadow-[0_0_12px_rgba(0,230,118,0.25)] transition-all"
                aria-label="GitHub Profile"
              >
                <GithubIcon className="h-4 w-4" />
              </a>
            )}
            {profile.linkedin && (
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#30363d] bg-[#161b22] text-[#8b949e] hover:border-[#00e676] hover:text-[#00e676] hover:shadow-[0_0_12px_rgba(0,230,118,0.25)] transition-all"
                aria-label="LinkedIn Profile"
              >
                <LinkedinIcon className="h-4 w-4" />
              </a>
            )}
            {profile.email && (
              <a
                href={`mailto:${profile.email}`}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#30363d] bg-[#161b22] text-[#8b949e] hover:border-[#00e676] hover:text-[#00e676] hover:shadow-[0_0_12px_rgba(0,230,118,0.25)] transition-all"
                aria-label="Send Email"
              >
                <MailIcon className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 border-t border-[#30363d]/60" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p className="font-mono text-[#6e7681]">
            &copy; {new Date().getFullYear()} {profile.fullName}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-4 text-[#8b949e]">
            <span className="tag text-[11px] py-0.5 px-2">Next.js 14 App Router</span>
            <span className="tag tag-blue text-[11px] py-0.5 px-2">TypeScript</span>
            <span className="tag tag-purple text-[11px] py-0.5 px-2">Tailwind CSS</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
