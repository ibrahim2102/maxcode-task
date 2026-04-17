import type { SearchMatch, SurahDetail, SurahSummary } from "@/types/quran";

const API_BASE = "https://api.alquran.cloud/v1";
const TRANSLATION_EDITION = "en.asad";
const ARABIC_EDITION = "quran-uthmani";
const REVALIDATE_SECONDS = 60 * 60 * 24;

type ApiListSurah = {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
};

type ApiSurahAyah = {
  numberInSurah: number;
  text: string;
};

type ApiSurahDetail = {
  number: number;
  name: string;
  englishName: string;
  ayahs: ApiSurahAyah[];
};

type QuranTranslationSurah = {
  number: number;
  name: string;
  englishName: string;
  ayahs: Array<{
    numberInSurah: number;
    text: string;
  }>;
};

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    next: { revalidate: REVALIDATE_SECONDS },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch Quran API: ${response.status} ${response.statusText}`);
  }

  const payload = (await response.json()) as { data: T };
  return payload.data;
}

export async function getAllSurahs(): Promise<SurahSummary[]> {
  const surahs = await fetchJson<ApiListSurah[]>(`${API_BASE}/surah`);

  return surahs.map((surah) => ({
    id: surah.number,
    englishName: surah.englishName,
    arabicName: surah.name,
    ayahCount: surah.numberOfAyahs,
    englishNameTranslation: surah.englishNameTranslation,
    revelationType: surah.revelationType,
  }));
}

export async function getSurahById(id: number): Promise<SurahDetail | undefined> {
  if (!Number.isInteger(id) || id < 1 || id > 114) {
    return undefined;
  }

  const [arabicSurah, translatedSurah] = await Promise.all([
    fetchJson<ApiSurahDetail>(`${API_BASE}/surah/${id}/${ARABIC_EDITION}`),
    fetchJson<ApiSurahDetail>(`${API_BASE}/surah/${id}/${TRANSLATION_EDITION}`),
  ]);

  return {
    id: arabicSurah.number,
    englishName: arabicSurah.englishName,
    arabicName: arabicSurah.name,
    ayahs: arabicSurah.ayahs.map((ayah, index) => ({
      number: ayah.numberInSurah,
      arabic: ayah.text,
      translation: translatedSurah.ayahs[index]?.text ?? "",
    })),
  };
}

export async function searchAyahsByTranslation(query: string): Promise<SearchMatch[]> {
  const normalizedQuery = query.trim().toLowerCase();
  if (normalizedQuery.length < 2) {
    return [];
  }

  const translatedQuran = await fetchJson<{ surahs: QuranTranslationSurah[] }>(
    `${API_BASE}/quran/${TRANSLATION_EDITION}`,
  );
  const surahSummaries = await getAllSurahs();
  const metadataById = new Map(surahSummaries.map((surah) => [surah.id, surah]));

  const matches: SearchMatch[] = [];

  for (const surah of translatedQuran.surahs) {
    const meta = metadataById.get(surah.number);
    for (const ayah of surah.ayahs) {
      if (ayah.text.toLowerCase().includes(normalizedQuery)) {
        matches.push({
          surahId: surah.number,
          surahEnglishName: surah.englishName,
          surahArabicName: meta?.arabicName ?? surah.name,
          ayahNumber: ayah.numberInSurah,
          translation: ayah.text,
        });
      }
    }
  }

  return matches.slice(0, 100);
}

