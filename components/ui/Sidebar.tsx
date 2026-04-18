"use client";

import React, { useEffect, useMemo, useRef } from "react";

import { useReaderSettings } from "@/components/settings/SettingsProvider";

export function Sidebar({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { settings, setArabicFont, setArabicFontSizePx, setTranslationFontSizePx, setTheme, reset } =
    useReaderSettings();
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  const themeOptions = useMemo(
    () =>
      [
        { id: "system", label: "System", help: "Follow device setting" },
        { id: "light", label: "Light", help: "Always light" },
        { id: "dark", label: "Dark", help: "Always dark" },
      ] as const,
    [],
  );

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => closeBtnRef.current?.focus(), 0);
    return () => window.clearTimeout(t);
  }, [open]);

  return (
    <>
      <div
        aria-hidden={!open}
        onClick={onClose}
        className={[
          "fixed inset-0 z-30 bg-black/30 backdrop-blur-sm transition-opacity",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        ].join(" ")}
      />

      <aside
        className={[
          "fixed right-0 top-0 z-40 h-dvh w-[min(420px,92vw)] border-l border-black/10 bg-white shadow-xl transition-transform dark:border-white/10 dark:bg-zinc-950",
          open ? "translate-x-0" : "translate-x-full",
        ].join(" ")}
        role="dialog"
        aria-modal="true"
        aria-label="Settings"
      >
        <div className="flex items-center justify-between border-b border-black/10 px-5 py-4 dark:border-white/10">
          <div>
            <div className="text-sm font-semibold text-zinc-950 dark:text-zinc-50">Settings</div>
            <div className="text-xs text-zinc-500 dark:text-zinc-400">Saved to your browser</div>
          </div>
          <button
            type="button"
            onClick={onClose}
            ref={closeBtnRef}
            className="focus-ring rounded-full border border-black/10 px-3 py-1.5 text-sm text-zinc-900 hover:bg-black/[.03] dark:border-white/10 dark:text-zinc-50 dark:hover:bg-white/[.06]"
          >
            Close
          </button>
        </div>

        <div className="flex h-[calc(100dvh-65px)] flex-col gap-6 overflow-auto p-5">
          <section className="space-y-3">
            <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">Theme</div>
            <div className="grid grid-cols-3 gap-2">
              {themeOptions.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTheme(t.id)}
                  className={[
                    "focus-ring rounded-xl border px-3 py-2 text-left text-sm transition",
                    settings.theme === t.id
                      ? "border-emerald-500/70 bg-emerald-500/10 text-zinc-950 dark:text-zinc-50"
                      : "border-black/10 hover:bg-black/[.03] dark:border-white/10 dark:hover:bg-white/[.06]",
                  ].join(" ")}
                >
                  <div className="font-medium">{t.label}</div>
                  <div className="text-xs text-zinc-500 dark:text-zinc-400">{t.help}</div>
                </button>
              ))}
            </div>
          </section>

          <section className="space-y-3">
            <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
              Arabic font
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setArabicFont("amiri")}
                className={[
                  "focus-ring rounded-xl border px-3 py-2 text-left text-sm transition",
                  settings.arabicFont === "amiri"
                    ? "border-emerald-500/70 bg-emerald-500/10 text-zinc-950 dark:text-zinc-50"
                    : "border-black/10 hover:bg-black/[.03] dark:border-white/10 dark:hover:bg-white/[.06]",
                ].join(" ")}
              >
                <div className="font-medium">Amiri</div>
                <div className="text-xs text-zinc-500 dark:text-zinc-400">Classic Naskh</div>
              </button>

              <button
                type="button"
                onClick={() => setArabicFont("scheherazade")}
                className={[
                  "focus-ring rounded-xl border px-3 py-2 text-left text-sm transition",
                  settings.arabicFont === "scheherazade"
                    ? "border-emerald-500/70 bg-emerald-500/10 text-zinc-950 dark:text-zinc-50"
                    : "border-black/10 hover:bg-black/[.03] dark:border-white/10 dark:hover:bg-white/[.06]",
                ].join(" ")}
              >
                <div className="font-medium">Scheherazade</div>
                <div className="text-xs text-zinc-500 dark:text-zinc-400">Readable display</div>
              </button>
            </div>
          </section>

          <section className="space-y-3">
            <div className="flex items-end justify-between gap-3">
              <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                Arabic size
              </div>
              <div className="text-xs text-zinc-500 dark:text-zinc-400">
                {settings.arabicFontSizePx}px
              </div>
            </div>
            <input
              type="range"
              min={18}
              max={44}
              value={settings.arabicFontSizePx}
              onChange={(e) => setArabicFontSizePx(Number(e.target.value))}
              className="w-full accent-emerald-500"
            />
          </section>

          <section className="space-y-3">
            <div className="flex items-end justify-between gap-3">
              <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                Translation size
              </div>
              <div className="text-xs text-zinc-500 dark:text-zinc-400">
                {settings.translationFontSizePx}px
              </div>
            </div>
            <input
              type="range"
              min={12}
              max={28}
              value={settings.translationFontSizePx}
              onChange={(e) => setTranslationFontSizePx(Number(e.target.value))}
              className="w-full accent-emerald-500"
            />
          </section>

          <div className="mt-auto flex items-center justify-between gap-3 pt-2">
            <button
              type="button"
              onClick={reset}
              className="focus-ring rounded-full border border-black/10 px-4 py-2 text-sm font-medium text-zinc-900 transition hover:bg-black/[.03] dark:border-white/10 dark:text-zinc-50 dark:hover:bg-white/[.06]"
            >
              Reset
            </button>
            
          </div>
        </div>
      </aside>
    </>
  );
}

