"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export type ArabicFont = "amiri" | "scheherazade";

export type ReaderSettings = {
  arabicFont: ArabicFont;
  arabicFontSizePx: number;
  translationFontSizePx: number;
};

type SettingsContextValue = {
  settings: ReaderSettings;
  setArabicFont: (font: ArabicFont) => void;
  setArabicFontSizePx: (px: number) => void;
  setTranslationFontSizePx: (px: number) => void;
  reset: () => void;
};

const STORAGE_KEY = "quran_settings_v1";

const defaultSettings: ReaderSettings = {
  arabicFont: "amiri",
  arabicFontSizePx: 28,
  translationFontSizePx: 16,
};

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

function safeParseSettings(raw: string | null): ReaderSettings | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as Partial<ReaderSettings>;
    if (parsed.arabicFont !== "amiri" && parsed.arabicFont !== "scheherazade") return null;
    const arabicFontSizePx = clamp(Number(parsed.arabicFontSizePx ?? defaultSettings.arabicFontSizePx), 18, 44);
    const translationFontSizePx = clamp(
      Number(parsed.translationFontSizePx ?? defaultSettings.translationFontSizePx),
      12,
      28,
    );
    return { arabicFont: parsed.arabicFont, arabicFontSizePx, translationFontSizePx };
  } catch {
    return null;
  }
}

const SettingsContext = createContext<SettingsContextValue | null>(null);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<ReaderSettings>(defaultSettings);

  useEffect(() => {
    const fromStorage = safeParseSettings(localStorage.getItem(STORAGE_KEY));
    if (!fromStorage) return;
    const t = window.setTimeout(() => setSettings(fromStorage), 0);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    document.documentElement.style.setProperty("--arabic-font-size", `${settings.arabicFontSizePx}px`);
    document.documentElement.style.setProperty("--translation-font-size", `${settings.translationFontSizePx}px`);
    document.documentElement.dataset.arabicFont = settings.arabicFont;
  }, [settings]);

  const setArabicFont = useCallback((font: ArabicFont) => {
    setSettings((s) => ({ ...s, arabicFont: font }));
  }, []);

  const setArabicFontSizePx = useCallback((px: number) => {
    setSettings((s) => ({ ...s, arabicFontSizePx: clamp(px, 18, 44) }));
  }, []);

  const setTranslationFontSizePx = useCallback((px: number) => {
    setSettings((s) => ({ ...s, translationFontSizePx: clamp(px, 12, 28) }));
  }, []);

  const reset = useCallback(() => setSettings(defaultSettings), []);

  const value = useMemo<SettingsContextValue>(
    () => ({ settings, setArabicFont, setArabicFontSizePx, setTranslationFontSizePx, reset }),
    [settings, setArabicFont, setArabicFontSizePx, setTranslationFontSizePx, reset],
  );

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useReaderSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useReaderSettings must be used within SettingsProvider");
  return ctx;
}

