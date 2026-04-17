"use client";

import React from "react";

export function SearchBar({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="relative">
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search in translations (e.g. mercy, guidance...)"
        className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-zinc-900 shadow-sm outline-none ring-emerald-500/40 transition focus:ring-4 dark:border-white/10 dark:bg-zinc-950 dark:text-zinc-50"
      />
      {value.length > 0 ? (
        <button
          type="button"
          onClick={() => onChange("")}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full px-3 py-1 text-xs font-medium text-zinc-600 hover:bg-black/[.04] dark:text-zinc-300 dark:hover:bg-white/[.06]"
        >
          Clear
        </button>
      ) : null}
    </div>
  );
}

