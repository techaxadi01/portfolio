"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import Image from "next/image";

interface NavLink {
  href: string;
  label: string;
}

const navLinks: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/education", label: "Education" },
  { href: "/projects", label: "Projects" },
  { href: "/skills", label: "Skills" },
  { href: "/achievements", label: "Achievements" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" }
];

interface SiteNavProps {
  fullName?: string;
  role?: string;
}

export default function SiteNav({
  fullName = "Aditya Kumar",
  role = "MCA • Next.js Dev"
}: SiteNavProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#30363d] bg-[#0d1117]/85 backdrop-blur-md no-print">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link href="/" className="group flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#30363d] bg-[#161b22] group-hover:border-[#00e676] group-hover:shadow-[0_0_12px_rgba(0,230,118,0.3)] transition-all overflow-hidden p-1">
            <Image
              src="/logo.svg"
              alt={`${fullName} Logo`}
              width={28}
              height={28}
              className="h-full w-full object-contain rounded"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold tracking-tight text-white group-hover:text-[#00e676] transition-colors">
              {fullName}
            </span>
            <span className="text-[11px] font-mono text-[#8b949e]">
              {role}
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav aria-label="Primary" className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={[
                  "rounded-md px-3 py-1.5 text-xs font-medium transition-all duration-150",
                  active
                    ? "bg-[#00e676]/10 text-[#00e676] border border-[#00e676]/30 shadow-[0_0_10px_rgba(0,230,118,0.15)]"
                    : "text-[#8b949e] hover:text-[#e6edf3] hover:bg-[#161b22]"
                ].join(" ")}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right action button */}
        <div className="hidden lg:flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-full border border-[#30363d] bg-[#161b22] px-3 py-1 text-xs">
            <span className="live-dot" />
            <span className="font-mono text-[11px] text-[#8b949e]">Open to opportunities</span>
          </div>
          <Link
            href="/contact"
            className="btn-accent text-xs py-1.5 px-3.5"
          >
            Get In Touch
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#30363d] bg-[#161b22] text-[#8b949e] hover:text-white md:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? (
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="border-b border-[#30363d] bg-[#0d1117] px-4 py-3 md:hidden">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={[
                    "rounded-lg px-3 py-2 text-sm font-medium transition",
                    active
                      ? "bg-[#00e676]/10 text-[#00e676] border border-[#00e676]/30"
                      : "text-[#8b949e] hover:bg-[#161b22] hover:text-white"
                  ].join(" ")}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="pt-2 border-t border-[#30363d] mt-2">
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="btn-accent w-full text-center text-xs py-2"
              >
                Get In Touch
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
