import { getAllSurahs } from "@/lib/quran";

export const dynamic = "force-dynamic";

export async function GET() {
  const allSurahs = await getAllSurahs();
  const surahs = allSurahs.map((s) => ({
    id: s.id,
    englishName: s.englishName,
    arabicName: s.arabicName,
    ayahCount: s.ayahCount,
  }));

  return Response.json({ surahs });
}

