import type { Metadata } from "next";
import "./globals.css";
import SiteNav from "@/components/site-nav";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Aditya Kumar | MCA Student & Next.js Developer",
  description:
    "Portfolio of Aditya Kumar - MCA Student at Christ Deemed to be University, Bengaluru. Specializing in Next.js App Router, TypeScript, React, and full-stack web applications.",
  keywords: [
    "Aditya Kumar",
    "Portfolio",
    "Next.js Developer",
    "MCA Student",
    "Christ University",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "Full Stack Developer"
  ],
  authors: [{ name: "Aditya Kumar" }],
  creator: "Aditya Kumar",
  openGraph: {
    title: "Aditya Kumar | MCA Student & Next.js Developer",
    description:
      "Modern Next.js developer portfolio featuring dynamic routing, clean dark UI, and academic & project highlights.",
    type: "website",
    locale: "en_US"
  },
  icons: {
    icon: "/logo.svg",
    shortcut: "/logo.svg",
    apple: "/logo.svg"
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="min-h-screen bg-[#0d1117] text-[#e6edf3] antialiased selection:bg-[#00e676]/20 selection:text-white">
        {/* Ambient background glow and grid */}
        <div className="ambient-glow" />
        <div className="fixed inset-0 grid-bg pointer-events-none z-0 opacity-80" />

        <div className="relative z-10 flex min-h-screen flex-col justify-between">
          <SiteNav />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
