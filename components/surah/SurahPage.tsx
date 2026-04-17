"use client";

import Link from "next/link";
import React from "react";

import { AyahCard } from "@/components/ui/AyahCard";
import type { SurahDetail } from "@/types/quran";

export function SurahPage({ surah }: { surah: SurahDetail }) {
  return (
    <div className="space-y-5">
      <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-950">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
              Surah {surah.id}
            </div>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
              {surah.englishName}
            </h1>
          </div>
          <div className="text-3xl text-zinc-900 dark:text-zinc-50" dir="rtl">
            {surah.arabicName}
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <Link
            href="/"
            className="rounded-full border border-black/10 px-4 py-2 text-sm font-medium text-zinc-900 transition hover:bg-black/[.03] dark:border-white/10 dark:text-zinc-50 dark:hover:bg-white/[.06]"
          >
            ← Back to all Surahs
          </Link>
          <div className="text-xs text-zinc-500 dark:text-zinc-400">
            {surah.ayahs.length} ayah{surah.ayahs.length === 1 ? "" : "s"} loaded from API
          </div>
        </div>
      </div>

      <div className="grid gap-3">
        {surah.ayahs.map((ayah) => (
          <AyahCard key={ayah.number} ayah={ayah} />
        ))}
      </div>
    </div>
  );
}

