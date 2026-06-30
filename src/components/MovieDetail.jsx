import React, { useEffect, useState } from 'react';
import { Heart, Bookmark, Play, Square } from 'lucide-react';

export default function MovieDetail({ 
  movie, 
  onClose, 
  favorites = [], 
  watchlist = [], // <-- Cleaned up prop identity
  toggleFavorite, 
  toggleWatchlist // <-- Cleaned up callback identity
}) {
  const [visible, setVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    setVisible(true);
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!movie) return null;

  const isFav = favorites.some(
  f => (f.movie_id ?? f.id) === movie.id
);
  const isWatch = watchlist.some(w => w.id === movie.id); // <-- Watchlist array validation Check

  const posterUrl = movie.poster 
    ? (movie.poster.startsWith('http') ? movie.poster : `https://image.tmdb.org/t/p/w500${movie.poster}`)
    : null;

  const streamUrl = `https://vidsrc.me/embed/movie/${movie.id}`;

  return (
    <div className={`fixed inset-0 z-40 bg-[#050507]/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-8 transition-all duration-500 ease-out font-sans select-none ${
      visible ? 'opacity-100' : 'opacity-0 pointer-events-none'
    }`}>
      
      <div className="absolute inset-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
        <div className={`absolute inset-0 bg-gradient-to-tr ${movie.color || 'from-zinc-900 to-black'} mix-blend-color-dodge animate-pulse`} />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050507] via-transparent to-[#050507]" />
      </div>

      <div className="relative z-10 w-full max-w-5xl h-full max-h-[850px] bg-[#0b0b0f]/95 border border-white/[0.04] rounded-2xl overflow-hidden flex flex-col md:flex-row shadow-[0_0_60px_rgba(0,0,0,0.8)]">
        
        <div className="w-full md:w-3/5 h-[350px] md:h-full bg-black relative flex items-center justify-center border-b md:border-b-0 md:border-r border-white/[0.04] overflow-hidden">
          {isPlaying ? (
            <iframe
              src={streamUrl}
              className="w-full h-full absolute inset-0 z-20"
              scrolling="no"
              frameBorder="0"
              allowFullScreen
              title={movie.title}
            />
          ) : posterUrl ? (
            <>
              <div 
                className="absolute inset-0 scale-110 blur-2xl opacity-20 bg-cover bg-center"
                style={{ backgroundImage: `url(${posterUrl})` }}
              />
              <img 
                src={posterUrl} 
                alt={movie.title} 
                className="w-full h-full object-cover relative z-10 animate-in fade-in zoom-in-95 duration-500"
              />
              <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/40 opacity-100 transition-opacity">
                <button 
                  onClick={() => setIsPlaying(true)}
                  className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center text-xl font-bold shadow-2xl hover:bg-[#00ffcc] hover:scale-105 transition-all cursor-pointer"
                >
                  ▶
                </button>
              </div>
            </>
          ) : (
            <div className="text-zinc-600 text-xs tracking-wider font-mono">POSTER OFFLINE</div>
          )}
        </div>

        <div className="w-full md:w-2/5 p-6 md:p-8 flex flex-col justify-between overflow-y-auto h-[calc(100%-350px)] md:h-full space-y-6">
          
          <div className="flex justify-between items-center text-xs text-zinc-500 border-b border-white/[0.04] pb-4 font-mono">
            <div>Movie ID: {movie.id}</div>
            <button 
              onClick={onClose}
              className="border border-white/[0.08] px-3 py-1 rounded bg-white/[0.02] hover:bg-white/[0.08] hover:text-[#00ffcc] hover:border-[#00ffcc]/30 transition-all cursor-pointer"
            >
              Close [ESC]
            </button>
          </div>

          <div className="my-auto space-y-5">
            <div className="space-y-2">
              <div className="text-[#00ffcc] text-xs font-bold tracking-wider uppercase font-mono">
                {movie.tags || "Featured"}
              </div>
              <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white leading-tight">
                {movie.title}
              </h3>
              <div className="text-xs text-zinc-400 flex gap-4 pt-1 font-mono">
                <span>Rating: ★ {movie.rating || "N/A"}</span>
                <span>•</span>
                <span>Year: {movie.year}</span>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/[0.01] border border-white/[0.03] space-y-1.5">
              <div className="text-[10px] text-zinc-500 font-bold tracking-wider font-mono">STORYLINE</div>
              <p className="leading-relaxed text-zinc-300 text-xs">
                {movie.overview || "No custom description overview payload has been generated for this title index node yet."}
              </p>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className={`w-full font-bold text-xs tracking-widest py-3.5 rounded transition-all shadow-lg cursor-pointer uppercase font-mono flex items-center justify-center gap-2 ${
                  isPlaying 
                    ? 'bg-zinc-800 text-white hover:bg-zinc-700' 
                    : 'bg-white text-black hover:bg-[#00ffcc]'
                }`}
              >
                {isPlaying ? <Square size={12} fill="currentColor" /> : <Play size={12} fill="currentColor" />}
                {isPlaying ? "Stop Stream" : "Start Streaming Now"}
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button 
                  onClick={() => toggleWatchlist(movie)}
                  className={`border font-bold text-[10px] tracking-widest py-3 rounded transition-all cursor-pointer uppercase font-mono flex items-center justify-center gap-2 ${
                    isWatch 
                      ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400' 
                      : 'border-white/[0.08] bg-white/[0.02] text-zinc-300 hover:bg-white/[0.06] hover:text-white'
                  }`}
                >
                  <Bookmark size={11} fill={isWatch ? "currentColor" : "none"} />
                  {isWatch ? "In Watchlist" : "Watchlist"}
                </button>

                <button 
                  onClick={() => toggleFavorite(movie)}
                  className={`border font-bold text-[10px] tracking-widest py-3 rounded transition-all cursor-pointer uppercase font-mono flex items-center justify-center gap-2 ${
                    isFav 
                      ? 'border-red-500/30 bg-red-500/10 text-red-400' 
                      : 'border-white/[0.08] bg-white/[0.02] text-zinc-300 hover:bg-white/[0.06] hover:text-white'
                  }`}
                >
                  <Heart size={11} fill={isFav ? "currentColor" : "none"} />
                  {isFav ? "Favorited" : "Favorite"}
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-2 pt-4 border-t border-white/[0.04]">
            <div className="text-[10px] font-bold text-zinc-500 tracking-wider font-mono uppercase">Streaming Server</div>
            <div className="p-3 border border-[#00ffcc]/30 bg-[#00ffcc]/5 rounded flex justify-between items-center text-xs">
              <span className="text-white font-medium">Main Movie Player</span>
              <span className="text-[#00ffcc] text-[10px] font-mono font-bold">ONLINE</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}