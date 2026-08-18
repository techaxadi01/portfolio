import "./globals.css";
import SiteNav from "../components/site-nav";

export const metadata = {
  title: "Aditya Kumar | Portfolio",
  description: "Next.js portfolio for lab 9 and lab 10"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen">
          <SiteNav />
          {children}
        </div>
      </body>
    </html>
  );
}
