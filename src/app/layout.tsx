import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LearnFlow | Free Career Learning Platform",
  description: "Learn career skills without requiring expensive paid courses. Get a personalized roadmap and start learning for free.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
