import Hero from "@/components/Hero";
import DramaCard from "@/components/DramaCard";
import { dramas } from "@/data/dramas";

export default function HomePage() {
  return (
    <main>
      <Hero />

      <section id="popular" className="mx-auto max-w-7xl px-5 pb-20">
        <div className="mb-8 flex items-end justify-between gap-5">
          <div>
            <p className="font-bold text-gold">Popular Now</p>
            <h2 className="mt-2 text-3xl font-black md:text-5xl">
              Drama Pilihan
            </h2>
          </div>

          <p className="hidden max-w-md text-right text-white/55 md:block">
            Koleksi drama pendek China dengan desain cinematic dan pengalaman
            streaming yang nyaman.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {dramas.map((drama) => (
            <DramaCard key={drama.slug} drama={drama} />
          ))}
        </div>
      </section>
    </main>
  );
}
