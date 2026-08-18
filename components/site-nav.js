"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/education", label: "Education" },
  { href: "/projects", label: "Projects" },
  { href: "/skills", label: "Skills" },
  { href: "/achievements", label: "Achievements" },
  { href: "/contact", label: "Contact" }
];

export default function SiteNav() {
  const pathname = usePathname();

  return (
    <header className="no-print border-b border-amber-200/80 bg-amber-50/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
              Portfolio
            </p>
            <p className="text-sm font-medium text-slate-700">Aditya Kumar</p>
          </div>
          <p className="text-sm text-slate-600">
            Next.js developer focused on server rendering, client rendering, and responsive UI work.
          </p>
        </div>

        <nav aria-label="Primary" className="flex flex-wrap gap-2 text-sm">
          {links.map((link) => {
            const active = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={[
                  "rounded-full border px-4 py-2 transition",
                  active
                    ? "border-slate-900 bg-slate-900 text-white"
                    : "border-amber-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-amber-100"
                ].join(" ")}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
