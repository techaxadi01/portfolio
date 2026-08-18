import "./globals.css";

export const metadata = {
  title: "Curriculum Vitae",
  description: "Next.js CV for Lab 9 and Lab 10"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
