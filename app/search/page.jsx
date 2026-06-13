"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import DramaCard from "@/components/DramaCard";
import { dramas } from "@/data/dramas";

export default function SearchPage() {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.toLowerCase().trim();

    if (!q) return dramas;

    return dramas.filter((item) => {
      return (
        item.title.toLowerCase().includes(q) ||
        item.genre.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q)
      );
    });
  }, [query]);

  return (
    <main className="mx-auto max-w-7xl px-5 py-14">
      <div className="mb-10 max-w-3xl">
        <p className="font-bold text-gold">Search</p>
        <h1 className="mt-2 text-4xl font-black md:text-6xl">
          Cari Drama China
        </h1>
        <p className="mt-4 text-white/60">
          Cari berdasarkan judul, genre, atau deskripsi.
        </p>
      </div>

      <div className="mb-10 flex items-center gap-3 rounded-3xl border border-white/10 bg-white/[0.05] px-5 py-4 backdrop-blur">
        <Search className="h-5 w-5 text-white/45" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Contoh: romance, CEO, revenge..."
          className="w-full bg-transparent text-lg outline-none placeholder:text-white/35"
        />
      </div>

      <div className="mb-5 text-white/55">
        Total hasil: <span className="font-bold text-white">{results.length}</span>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {results.map((drama) => (
          <DramaCard key={drama.slug} drama={drama} />
        ))}
      </div>
    </main>
  );
}
