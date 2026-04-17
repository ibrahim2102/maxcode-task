export type Ayah = {
  number: number;
  arabic: string;
  translation: string;
};

export type SurahSummary = {
  id: number;
  englishName: string;
  arabicName: string;
  ayahCount: number;
  englishNameTranslation?: string;
  revelationType?: string;
};

export type SurahDetail = {
  id: number;
  englishName: string;
  arabicName: string;
  ayahs: Ayah[];
};

export type SearchMatch = {
  surahId: number;
  surahEnglishName: string;
  surahArabicName: string;
  ayahNumber: number;
  translation: string;
};

