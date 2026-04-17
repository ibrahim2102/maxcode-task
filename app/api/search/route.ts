import { searchAyahsByTranslation } from "@/lib/quran";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const q = url.searchParams.get("q") ?? "";
  const matches = await searchAyahsByTranslation(q);

  return Response.json({ query: q.trim().toLowerCase(), matches });
}

