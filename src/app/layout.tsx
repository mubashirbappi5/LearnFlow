import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LearnFlow | Free Career Learning Platform",
  description: "Learn career skills without requiring expensive paid courses. Get a personalized roadmap and start learning for free.",
};

import { ThemeProvider } from '@/components/ThemeProvider';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import AiTutor from "@/components/learning/AiTutor";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="data-theme" defaultTheme="dark" enableSystem={false}>
          <main className="min-h-screen">
            {children}
          </main>
          <AiTutor />
        </ThemeProvider>
      </body>
    </html>
  );
}
