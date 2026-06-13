import Link from "next/link";
import { Clapperboard, Search } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-dark/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-gold to-rose shadow-glow">
            <Clapperboard className="h-5 w-5 text-black" />
          </div>

          <div>
            <h1 className="text-lg font-black tracking-wide">Ranzz Drama</h1>
            <p className="text-xs text-white/50">China Short Drama Stream</p>
          </div>
        </Link>

        <nav className="flex items-center gap-3 text-sm text-white/70">
          <Link href="/" className="hover:text-white">
            Home
          </Link>

          <Link
            href="/search"
            className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 hover:bg-white/10 hover:text-white"
          >
            <Search className="h-4 w-4" />
            Search
          </Link>
        </nav>
      </div>
    </header>
  );
}
