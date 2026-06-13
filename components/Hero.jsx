"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Play, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden px-5 py-20">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-2 text-sm text-gold">
            <Sparkles className="h-4 w-4" />
            Premium China Drama Streaming
          </div>

          <h2 className="max-w-3xl text-5xl font-black leading-tight md:text-7xl">
            Stream Drama China dengan Tampilan Profesional.
          </h2>

          <p className="mt-6 max-w-xl text-lg leading-8 text-white/65">
            Website streaming modern untuk koleksi drama legal kamu. Sudah
            lengkap dengan pencarian, genre, episode player, rating, dan UI
            cinematic.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/search"
              className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-gold to-rose px-6 py-4 font-bold text-black shadow-pinkGlow transition hover:scale-[1.03]"
            >
              <Play className="h-5 w-5" />
              Mulai Nonton
            </Link>

            <a
              href="#popular"
              className="rounded-2xl border border-white/10 bg-white/5 px-6 py-4 font-bold text-white/80 backdrop-blur transition hover:bg-white/10 hover:text-white"
            >
              Lihat Drama
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92, rotate: -2 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="absolute -inset-5 rounded-[2rem] bg-gradient-to-br from-gold/20 to-rose/20 blur-3xl" />

          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-4 shadow-glow backdrop-blur">
            <div className="aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-soft to-panel">
              <img
                src="/covers/cooking.jpg"
                alt="Featured Drama"
                className="h-full w-full object-cover opacity-90"
              />
            </div>

            <div className="absolute bottom-8 left-8 right-8 rounded-3xl border border-white/10 bg-black/55 p-5 backdrop-blur-xl">
              <p className="text-sm text-gold">Featured Drama</p>
              <h3 className="mt-1 text-2xl font-black">
                Cooking My Way Back To Love
              </h3>
              <p className="mt-2 text-sm text-white/60">
                Romance · 8.7 Rating · HD Streaming
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
