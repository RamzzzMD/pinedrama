import { scrapeHome } from '@/lib/scraper';
import DramaCard from '@/components/DramaCard';
import Link from 'next/link';

// Revalidate setiap 1 jam agar data selalu fresh tanpa harus build ulang
export const revalidate = 3600; 

export default async function HomePage() {
  const data = await scrapeHome();

  if (!data.Status) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center text-white">
        <h1 className="text-2xl font-bold text-red-500">Gagal memuat data drama.</h1>
      </div>
    );
  }

  // Ambil drama pertama dari section pertama untuk dijadikan Hero Banner
  const heroDrama = data.Sections?.[0]?.items?.[0] || null;

  return (
    <main className="min-h-screen bg-gray-950 text-gray-200 pb-20">
      
      {/* HERO SECTION */}
      {heroDrama && (
        <section className="relative w-full h-[60vh] md:h-[80vh] flex items-center">
          <div className="absolute inset-0 w-full h-full">
            <img 
              src={heroDrama.image} 
              alt={heroDrama.title} 
              className="w-full h-full object-cover opacity-40 blur-sm"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-950/80 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent"></div>
          </div>
          
          <div className="relative z-10 px-6 md:px-16 max-w-4xl">
            {heroDrama.genre && (
              <span className="px-3 py-1 bg-emerald-600/80 text-white text-xs font-bold uppercase rounded-full mb-4 inline-block">
                {heroDrama.genre} Terbaru
              </span>
            )}
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 leading-tight">
              {heroDrama.title}
            </h1>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl line-clamp-3">
              Saksikan drama pendek terbaik dengan resolusi tinggi. Ikuti kisah menarik yang mendebarkan di setiap episodenya.
            </p>
            <div className="flex gap-4">
              <Link href={`/drama/${heroDrama.slug}`} className="px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-lg transition flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"></path></svg>
                Tonton Sekarang
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* KONTEN UTAMA */}
      <div className="px-6 md:px-16 mt-8 space-y-12">
        
        {/* Hot Genres Tags */}
        {data.HotGenres && data.HotGenres.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-white mb-4 border-l-4 border-emerald-500 pl-3">Popular Genres</h2>
            <div className="flex flex-wrap gap-3">
              {data.HotGenres.map((genre) => (
                <Link 
                  key={genre.slug} 
                  href={`/search?q=${genre.name}`} 
                  className="px-4 py-2 bg-gray-800 hover:bg-emerald-500 hover:text-white text-gray-300 rounded-full text-sm font-medium transition-colors border border-gray-700"
                >
                  {genre.name}
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Dynamic Sections (New Short Dramas, dll) */}
        {data.Sections?.map((section, idx) => (
          <section key={idx}>
            <div className="flex justify-between items-end mb-6">
              <h2 className="text-2xl font-bold text-white border-l-4 border-emerald-500 pl-3">
                {section.name}
              </h2>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
              {section.items.map((drama) => (
                <DramaCard key={drama.slug || drama.url} drama={drama} />
              ))}
            </div>
          </section>
        ))}

      </div>
    </main>
  );
}
