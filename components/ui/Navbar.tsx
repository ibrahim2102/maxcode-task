"use client";

import Link from "next/link";
import React from "react";

export function Navbar({ onOpenSettings }: { onOpenSettings: () => void }) {
  return (
    <header className="sticky top-0 z-20 border-b border-black/10 bg-white/80 backdrop-blur dark:border-white/10 dark:bg-zinc-950/70">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Link href="/" className="group flex items-baseline gap-2">
          <span className="text-lg font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
            Quran
          </span>
          <span className="text-sm text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-700 dark:group-hover:text-zinc-300">
            Reader
          </span>
        </Link>

        <button
          type="button"
          onClick={onOpenSettings}
          className="inline-flex items-center justify-center rounded-full border border-black/10 px-4 py-2 text-sm font-medium text-zinc-900 shadow-sm transition hover:bg-black/[.03] active:scale-[0.99] dark:border-white/10 dark:text-zinc-50 dark:hover:bg-white/[.06]"
        >
          Settings
        </button>
      </div>
    </header>
  );
}

