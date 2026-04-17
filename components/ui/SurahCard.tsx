import Link from "next/link";
import React from "react";

import type { SurahSummary } from "@/types/quran";

export function SurahCard({ surah }: { surah: SurahSummary }) {
  return (
    <Link
      href={`/surah/${surah.id}`}
      className="group rounded-2xl border border-black/10 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-500/40 hover:shadow-md dark:border-white/10 dark:bg-zinc-950"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="text-sm font-semibold text-zinc-950 dark:text-zinc-50">
            {surah.id}. {surah.englishName}
          </div>
          <div className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
            {surah.ayahCount} ayah{surah.ayahCount === 1 ? "" : "s"}
          </div>
        </div>
        <div className="text-lg text-zinc-800 dark:text-zinc-100" dir="rtl">
          {surah.arabicName}
        </div>
      </div>
      <div className="mt-3 text-xs text-emerald-700 opacity-0 transition group-hover:opacity-100 dark:text-emerald-400">
        Open Surah →
      </div>
    </Link>
  );
}

