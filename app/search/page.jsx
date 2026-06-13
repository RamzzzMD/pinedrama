// app/search/page.jsx
import { Search } from "lucide-react";
import DramaCard from "@/components/DramaCard";
import { scrapeSearchQuery } from "@/lib/scraper";

export default async function SearchPage({ searchParams }) {
  // Mengambil parameter '?q=...' dari URL
  const q = searchParams?.q || "";
  
  // Memanggil fungsi scraper dengan query tersebut
  const data = await scrapeSearchQuery(q);
  const results = data.Result || [];

  return (
    <main className="mx-auto max-w-7xl px-5 py-14 min-h-screen">
      <div className="mb-10 max-w-3xl">
        <p className="font-bold text-emerald-500">Pencarian Web</p>
        <h1 className="mt-2 text-4xl font-black md:text-6xl text-white">
          Cari Drama China
        </h1>
        <p className="mt-4 text-gray-400">
          Cari berdasarkan judul, genre, atau kata kunci.
        </p>
      </div>

      {/* Form pencarian bawaan Next.js */}
      <form method="GET" action="/search" className="mb-10 flex items-center gap-3 rounded-3xl border border-white/10 bg-gray-900/50 px-5 py-4 backdrop-blur focus-within:border-emerald-500/50 focus-within:ring-1 focus-within:ring-emerald-500/50 transition-all">
        <Search className="h-5 w-5 text-gray-400" />
        <input
          name="q"
          defaultValue={q}
          placeholder="Contoh: romance, CEO, revenge..."
          className="w-full bg-transparent text-lg text-white outline-none placeholder:text-gray-600"
        />
        <button type="submit" className="hidden">Cari</button>
      </form>

      <div className="mb-6 flex items-center justify-between">
        <div className="text-gray-400">
          {q ? (
            <>Hasil untuk <span className="font-bold text-white">"{q}"</span></>
          ) : (
            <>Menampilkan drama terbaru</>
          )}
        </div>
        <div className="text-sm font-semibold px-3 py-1 bg-gray-800 rounded-full text-gray-300">
          {results.length} ditemukan
        </div>
      </div>

      {results.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {results.map((drama) => (
            <DramaCard key={drama.slug || drama.url} drama={drama} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center border border-white/5 rounded-3xl bg-gray-900/20">
          <p className="text-xl font-bold text-white">Tidak ada hasil ditemukan.</p>
          <p className="text-gray-500 mt-2">Coba gunakan kata kunci lain.</p>
        </div>
      )}
    </main>
  );
}
