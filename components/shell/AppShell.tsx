"use client";

import React, { useCallback, useState } from "react";

import { SettingsProvider } from "@/components/settings/SettingsProvider";
import { Navbar } from "@/components/ui/Navbar";
import { Sidebar } from "@/components/ui/Sidebar";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [settingsOpen, setSettingsOpen] = useState(false);

  const open = useCallback(() => setSettingsOpen(true), []);
  const close = useCallback(() => setSettingsOpen(false), []);

  return (
    <SettingsProvider>
      <Navbar onOpenSettings={open} />
      <Sidebar open={settingsOpen} onClose={close} />
      <div className="flex flex-1">
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6">{children}</main>
      </div>
      <footer className="border-t border-black/10 py-6 text-center text-xs text-zinc-500 dark:border-white/10 dark:text-zinc-400">
        Built with Next.js + Tailwind. Settings are saved in your browser.
      </footer>
    </SettingsProvider>
  );
}

