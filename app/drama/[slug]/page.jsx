import { notFound } from "next/navigation";
import { scrapeDetail } from "@/lib/scraper";
import VideoPlayer from "@/components/VideoPlayer";
import EpisodeList from "@/components/EpisodeList";
import { Star, Film } from "lucide-react";

export const revalidate = 1800; // Simpan cache selama 30 menit

export default async function DramaDetailPage({ params, searchParams }) {
  const { slug } = params;
  const activeEpisodeNumber = Number(searchParams?.ep || 1);

  // Memanggil scraper detail drama
  const data = await scrapeDetail(slug, activeEpisodeNumber);

  if (!data || !data.Status) {
    return notFound();
  }

  const drama = data.Result;
  const activeEpisode = drama.activeEpisode;

  return (
    <main className="mx-auto max-w-7xl px-5 py-10 min-h-screen bg-gray-950 text-gray-100">
      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <section>
          {/* Video Player memutar streamUrl asli hasil scrape */}
          <VideoPlayer
            src={activeEpisode.streamUrl}
            poster={drama.image}
            title={`${drama.title} - ${activeEpisode.title}`}
          />

          <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur">
            <div className="flex flex-wrap items-center gap-3 text-sm">
              <span className="rounded-full bg-emerald-500/15 px-3 py-1 font-bold text-emerald-400 border border-emerald-500/30">
                {drama.genre}
              </span>

              <span className="flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-white/70">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                {drama.rating}
              </span>

              <span className="flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-white/70">
                <Film className="h-4 w-4" />
                {drama.episodes.length} Episodes
              </span>
            </div>

            <h1 className="mt-5 text-3xl md:text-5xl font-extrabold text-white tracking-tight">
              {drama.title}
            </h1>

            <p className="mt-4 max-w-3xl leading-8 text-gray-400">
              {drama.description}
            </p>

            <div className="mt-6 rounded-2xl border border-white/10 bg-black/45 p-4">
              <p className="text-xs uppercase tracking-wider font-semibold text-emerald-400">Sedang Diputar</p>
              <h2 className="mt-1 text-xl font-bold text-white">
                {activeEpisode.title}
              </h2>
            </div>
          </div>
        </section>

        <aside>
          {/* Komponen daftar episode samping tetap bekerja menggunakan struktur data yang sama */}
          <EpisodeList drama={drama} activeEpisode={activeEpisode.episode} />
        </aside>
      </div>
    </main>
  );
}
