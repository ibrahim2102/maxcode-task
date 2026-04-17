import { getSurahById } from "@/lib/quran";

export const dynamic = "force-dynamic";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const surahId = Number(id);
  if (!Number.isFinite(surahId)) {
    return Response.json({ error: "Invalid surah id" }, { status: 400 });
  }

  const surah = await getSurahById(surahId);
  if (!surah) {
    return Response.json({ error: "Surah not found" }, { status: 404 });
  }

  return Response.json({ surah });
}

