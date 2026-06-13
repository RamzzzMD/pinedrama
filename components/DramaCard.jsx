import Link from 'next/link';
import Image from 'next/image';

export default function DramaCard({ drama }) {
  return (
    <Link href={`/drama/${drama.slug}`} className="group relative overflow-hidden rounded-xl bg-gray-800 transition-all duration-300 hover:scale-105 hover:ring-2 hover:ring-emerald-500 shadow-lg block aspect-[2/3]">
      {/* Fallback jika image gagal load, gunakan img tag standar dengan object-cover */}
      <img 
        src={drama.image} 
        alt={drama.title} 
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        loading="lazy"
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent opacity-90 transition-opacity duration-300"></div>
      
      {/* Rating Badge */}
      {drama.rating && (
        <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-md px-2 py-1 rounded text-xs font-bold text-yellow-400 flex items-center gap-1">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
          {drama.rating}
        </div>
      )}

      {/* Konten Text */}
      <div className="absolute bottom-0 left-0 w-full p-4 transform translate-y-2 transition-transform duration-300 group-hover:translate-y-0">
        {drama.genre && (
          <span className="text-[10px] uppercase tracking-wider font-semibold text-emerald-400 mb-1 block">
            {drama.genre}
          </span>
        )}
        <h3 className="text-sm md:text-base font-bold text-white line-clamp-2 leading-tight">
          {drama.title}
        </h3>
      </div>
    </Link>
  );
}
