import { notFound } from "next/navigation";

import { SurahPage } from "@/components/surah/SurahPage";
import { getSurahById } from "@/lib/quran";

export const dynamic = "force-dynamic";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const surahId = Number(id);
  if (!Number.isFinite(surahId)) notFound();

  const surah = await getSurahById(surahId);
  if (!surah) notFound();

  return <SurahPage surah={surah} />;
}

