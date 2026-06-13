import Link from "next/link";
import { PlayCircle } from "lucide-react";

export default function EpisodeList({ drama, activeEpisode }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur">
      <h3 className="mb-4 text-xl font-black">Episode</h3>

      <div className="grid gap-3">
        {drama.episodes.map((episode) => {
          const isActive = Number(activeEpisode) === Number(episode.episode);

          return (
            <Link
              key={episode.episode}
              href={`/drama/${drama.slug}?ep=${episode.episode}`}
              className={`flex items-center justify-between rounded-2xl border px-4 py-4 transition ${
                isActive
                  ? "border-gold/50 bg-gold/15 text-gold"
                  : "border-white/10 bg-white/5 text-white/75 hover:bg-white/10 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <PlayCircle className="h-5 w-5" />
                <div>
                  <p className="font-bold">Episode {episode.episode}</p>
                  <p className="text-sm opacity-70">{episode.title}</p>
                </div>
              </div>

              <span className="text-sm opacity-70">{episode.duration}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
