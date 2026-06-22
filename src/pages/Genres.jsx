import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export default function Genres({ onSelectGenre }) {
  const navigate = useNavigate();
  const [genres, setGenres] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Live Sync: Pull all available genres straight from TMDB engine
  useEffect(() => {
    const fetchLiveGenres = async () => {
      if (!TMDB_API_KEY) {
        setIsLoading(false);
        return;
      }
      try {
        const res = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${TMDB_API_KEY}`);
        const data = await res.json();
        if (data.genres) {
          // Keep your clean cinematic uppercase formatting across all incoming data
          const formatted = data.genres.map(g => ({
            id: g.id,
            label: g.name.toUpperCase()
          }));
          setGenres(formatted);
        }
      } catch (err) {
        console.error("Failed executing dynamic genre compilation:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLiveGenres();
  }, []);

  const handleGenreClick = (genre) => {
    onSelectGenre(genre.id, genre.label);
    navigate('/search'); 
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-500">
      <header className="space-y-2">
        <h2 className="text-xs font-black tracking-[0.3em] text-amber-500 uppercase">MOVIE GENRES</h2>
        <p className="text-zinc-400 text-sm">Navigate the cinematic archives by categorization clusters.</p>
      </header>

      {/* Grid displays loading state or dynamic array mapping */}
      {isLoading ? (
        <div className="text-zinc-600 font-mono text-xs py-12">
          Compiling global TMDB category configurations...
        </div>
      ) : (
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {genres.map((genre) => (
            <div 
              key={genre.id} 
              onClick={() => handleGenreClick(genre)}
              className="group border border-white/[0.05] bg-[#0c0c12]/40 p-6 rounded-2xl hover:border-amber-500/30 cursor-pointer transition-all duration-300 flex flex-col justify-between min-h-[120px]"
            >
              <h4 className="text-xs font-black tracking-wider text-zinc-300 group-hover:text-amber-500 transition-colors">
                {genre.label}
              </h4>
              <span className="text-[9px] font-mono text-zinc-600 group-hover:text-zinc-400 mt-4 transition-colors block">
                ID: {genre.id}
              </span>
            </div>
          ))}
        </section>
      )}

      <section className="p-6 rounded-2xl border border-white/[0.03] bg-[#0c0c12]/20 flex justify-between items-center">
        <span className="text-[10px] text-zinc-500 font-mono tracking-widest">
          {isLoading ? "SYNCING MATRIX..." : `LIVE SYSTEM OPERATIONAL [ ${genres.length} TARGETS ]`}
        </span>
        <div className="flex items-center gap-2">
          <div className={`w-1.5 h-1.5 rounded-full ${isLoading ? 'bg-amber-500 animate-ping' : 'bg-emerald-500'}`} />
          <span className={`text-[10px] font-bold uppercase ${isLoading ? 'text-amber-500' : 'text-emerald-500'}`}>
            {isLoading ? "LOADING MODULE" : "TMDB DATA LINK ACTIVE"}
          </span>
        </div>
      </section>
    </div>
  );
}