import { HomePage } from "@/components/home/HomePage";
import { getAllSurahs } from "@/lib/quran";

export default async function Home() {
  const surahs = await getAllSurahs();
  return <HomePage surahs={surahs} />;
}
