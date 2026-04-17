"use client";

import React from "react";

import { useReaderSettings } from "@/components/settings/SettingsProvider";
import type { Ayah } from "@/types/quran";

export function AyahCard({ ayah }: { ayah: Ayah }) {
  const { settings } = useReaderSettings();

  return (
    <article
      id={`ayah-${ayah.number}`}
      className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-zinc-950"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
          Ayah {ayah.number}
        </div>
      </div>

      <div
        dir="rtl"
        className={[
          "mt-4 text-zinc-950 dark:text-zinc-50 leading-[1.9] text-right",
          settings.arabicFont === "amiri" ? "font-arabic-amiri" : "font-arabic-scheherazade",
        ].join(" ")}
        style={{ fontSize: "var(--arabic-font-size)" }}
      >
        {ayah.arabic}
      </div>

      <div
        className="mt-3 text-zinc-700 dark:text-zinc-300 leading-relaxed"
        style={{ fontSize: "var(--translation-font-size)" }}
      >
        {ayah.translation}
      </div>
    </article>
  );
}

