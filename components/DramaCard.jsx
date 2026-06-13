import Link from "next/link";
import { Star } from "lucide-react";

export default function DramaCard({ drama }) {
  return (
    <Link
      href={`/drama/${drama.slug}`}
      className="group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-3 backdrop-blur transition hover:-translate-y-1 hover:bg-white/[0.07]"
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-soft">
        <img
          src={drama.image}
          alt={drama.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
        />

        <div className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-black/60 px-3 py-1 text-sm backdrop-blur">
          <Star className="h-4 w-4 fill-gold text-gold" />
          {drama.rating}
        </div>
      </div>

      <div className="p-3">
        <p className="text-sm font-semibold text-gold">{drama.genre}</p>
        <h3 className="mt-1 line-clamp-2 text-lg font-black">
          {drama.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-white/55">
          {drama.description}
        </p>
      </div>
    </Link>
  );
}
