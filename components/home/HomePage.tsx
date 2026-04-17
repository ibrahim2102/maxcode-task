"use client";

import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";

import { SearchBar } from "@/components/ui/SearchBar";
import { SurahCard } from "@/components/ui/SurahCard";
import type { SearchMatch, SurahSummary } from "@/types/quran";

function normalize(s: string) {
  return s.trim().toLowerCase();
}

function highlightSnippet(text: string, query: string) {
  const q = normalize(query);
  const idx = normalize(text).indexOf(q);
  if (!q || idx === -1) return { before: text, match: "", after: "" };

  const before = text.slice(0, idx);
  const match = text.slice(idx, idx + q.length);
  const after = text.slice(idx + q.length);
  return { before, match, after };
}

export function HomePage({ surahs }: { surahs: SurahSummary[] }) {
  const [query, setQuery] = useState("");
  const [matches, setMatches] = useState<SearchMatch[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const q = normalize(query);
    if (q.length < 2) {
      setMatches([]);
      setIsSearching(false);
      return;
    }

    const controller = new AbortController();
    const timeout = window.setTimeout(async () => {
      setIsSearching(true);
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(q)}`, {
          signal: controller.signal,
        });
        if (!response.ok) {
          throw new Error("Search request failed");
        }

        const data = (await response.json()) as { matches: SearchMatch[] };
        setMatches(data.matches);
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          setMatches([]);
        }
      } finally {
        setIsSearching(false);
      }
    }, 250);

    return () => {
      controller.abort();
      window.clearTimeout(timeout);
    };
  }, [query]);

  const isSearchMode = useMemo(() => query.trim().length >= 2, [query]);

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-950">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
              Browse Surahs
            </h1>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
              Search across translations, then open any Surah.
            </p>
          </div>
          <div className="text-xs text-zinc-500 dark:text-zinc-400">
            {surahs.length} surahs
          </div>
        </div>

        <div className="mt-5">
          <SearchBar value={query} onChange={setQuery} />
          <div className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
            Tip: type at least 2 characters to search.
          </div>
        </div>
      </div>

      {isSearchMode ? (
        <section className="space-y-3">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
              Search results
            </h2>
            <div className="text-xs text-zinc-500 dark:text-zinc-400">
              {isSearching
                ? "Searching..."
                : `Showing ${matches.length} match${matches.length === 1 ? "" : "es"}`}
            </div>
          </div>

          {!isSearching && matches.length === 0 ? (
            <div className="rounded-2xl border border-black/10 bg-white p-5 text-sm text-zinc-600 shadow-sm dark:border-white/10 dark:bg-zinc-950 dark:text-zinc-300">
              No matches found. Try another word.
            </div>
          ) : isSearching ? (
            <div className="rounded-2xl border border-black/10 bg-white p-5 text-sm text-zinc-600 shadow-sm dark:border-white/10 dark:bg-zinc-950 dark:text-zinc-300">
              Loading search results from API...
            </div>
          ) : (
            <div className="grid gap-3">
              {matches.map((m) => {
                const snippet = highlightSnippet(m.translation, query);
                return (
                  <Link
                    key={`${m.surahId}-${m.ayahNumber}-${m.translation}`}
                    href={`/surah/${m.surahId}#ayah-${m.ayahNumber}`}
                    className="rounded-2xl border border-black/10 bg-white p-4 shadow-sm transition hover:border-emerald-500/40 hover:shadow-md dark:border-white/10 dark:bg-zinc-950"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="text-sm font-semibold text-zinc-950 dark:text-zinc-50">
                        {m.surahId}. {m.surahEnglishName}{" "}
                        <span className="text-xs font-normal text-zinc-500 dark:text-zinc-400">
                          • Ayah {m.ayahNumber}
                        </span>
                      </div>
                      <div className="text-sm text-zinc-800 dark:text-zinc-100" dir="rtl">
                        {m.surahArabicName}
                      </div>
                    </div>
                    <div className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
                      {snippet.before}
                      {snippet.match ? (
                        <mark className="rounded bg-emerald-500/20 px-1 text-inherit">
                          {snippet.match}
                        </mark>
                      ) : null}
                      {snippet.after}
                    </div>
                    <div className="mt-3 text-xs text-emerald-700 dark:text-emerald-400">
                      Open in Surah →
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </section>
      ) : (
        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">All Surahs</h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {surahs.map((surah) => (
              <SurahCard key={surah.id} surah={surah} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

