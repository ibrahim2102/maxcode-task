import type { Metadata } from "next";
import { Amiri, Geist, Geist_Mono, Scheherazade_New } from "next/font/google";
import "./globals.css";
import { AppShell } from "@/components/shell/AppShell";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const amiri = Amiri({
  variable: "--font-arabic-amiri",
  subsets: ["arabic"],
  weight: ["400", "700"],
});

const scheherazade = Scheherazade_New({
  variable: "--font-arabic-scheherazade",
  subsets: ["arabic"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Quran Reader",
  description: "A modern Quran reader built with Next.js and Tailwind CSS.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${amiri.variable} ${scheherazade.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-zinc-50 text-zinc-950 dark:bg-black dark:text-zinc-50">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
