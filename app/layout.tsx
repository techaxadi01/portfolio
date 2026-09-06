import type { Metadata } from "next";
import "./globals.css";
import SiteNav from "@/components/site-nav";
import Footer from "@/components/footer";
import { getPortfolioProfile } from "@/lib/profile";

export async function generateMetadata(): Promise<Metadata> {
  const profile = await getPortfolioProfile();

  return {
    title: `${profile.fullName} | ${profile.role}`,
    description: profile.summary || profile.intro,
    keywords: [
      profile.fullName,
      "Portfolio",
      profile.role,
      ...profile.education.map((e) => e.institution),
      ...profile.skills
    ],
    authors: [{ name: profile.fullName }],
    creator: profile.fullName,
    openGraph: {
      title: `${profile.fullName} | ${profile.role}`,
      description: profile.intro || profile.summary,
      type: "website",
      locale: "en_US"
    },
    icons: {
      icon: "/logo.svg",
      shortcut: "/logo.svg",
      apple: "/logo.svg"
    }
  };
}

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const profile = await getPortfolioProfile();

  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="min-h-screen bg-[#0d1117] text-[#e6edf3] antialiased selection:bg-[#00e676]/20 selection:text-white">
        {/* Ambient background glow and grid */}
        <div className="ambient-glow" />
        <div className="fixed inset-0 grid-bg pointer-events-none z-0 opacity-80" />

        <div className="relative z-10 flex min-h-screen flex-col justify-between">
          <SiteNav fullName={profile.fullName} role={profile.role} />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
