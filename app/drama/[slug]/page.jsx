import { notFound } from "next/navigation";
import { getDrama } from "@/data/dramas";
import VideoPlayer from "@/components/VideoPlayer";
import EpisodeList from "@/components/EpisodeList";
import { Star, Film } from "lucide-react";

export default function DramaDetailPage({ params, searchParams }) {
  const drama = getDrama(params.slug);

  if (!drama) return notFound();

  const activeEpisodeNumber = Number(searchParams?.ep || 1);

  const activeEpisode =
    drama.episodes.find((item) => item.episode === activeEpisodeNumber) ||
    drama.episodes[0];

  return (
    <main className="mx-auto max-w-7xl px-5 py-10">
      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <section>
          <VideoPlayer
            src={activeEpisode.streamUrl}
            poster={drama.image}
            title={`${drama.title} - Episode ${activeEpisode.episode}`}
          />

          <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur">
            <div className="flex flex-wrap items-center gap-3 text-sm">
              <span className="rounded-full bg-gold/15 px-3 py-1 font-bold text-gold">
                {drama.genre}
              </span>

              <span className="flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-white/70">
                <Star className="h-4 w-4 fill-gold text-gold" />
                {drama.rating}
              </span>

              <span className="flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-white/70">
                <Film className="h-4 w-4" />
                {drama.episodes.length} Episodes
              </span>
            </div>

            <h1 className="mt-5 text-3xl font-black md:text-5xl">
              {drama.title}
            </h1>

            <p className="mt-4 max-w-3xl leading-8 text-white/60">
              {drama.description}
            </p>

            <div className="mt-6 rounded-2xl border border-white/10 bg-black/25 p-4">
              <p className="text-sm text-white/45">Episode aktif</p>
              <h2 className="mt-1 text-xl font-black">
                Episode {activeEpisode.episode}: {activeEpisode.title}
              </h2>
            </div>
          </div>
        </section>

        <aside>
          <EpisodeList drama={drama} activeEpisode={activeEpisode.episode} />
        </aside>
      </div>
    </main>
  );
}
