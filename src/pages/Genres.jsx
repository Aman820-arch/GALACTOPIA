import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export default function Genres({ onSelectGenre }) {
  const navigate = useNavigate();
  const [genres, setGenres] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
    <div className="space-y-12 animate-in fade-in duration-500 flex flex-col min-h-[80vh] justify-between">
      <div className="space-y-12 w-full">
        <header className="space-y-2">
          <h2 className="text-xs font-black tracking-[0.3em] text-amber-500 uppercase">MOVIE GENRES</h2>
          <p className="text-zinc-400 text-sm">Navigate the cinematic archives by categorization clusters.</p>
        </header>

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

      <footer className="mt-20 pt-8 border-t border-white/[0.03] space-y-6 w-full">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-6 font-mono text-[9px] tracking-[0.2em] text-zinc-500">
            <Link to="/" className="hover:text-amber-500 transition-colors flex items-center gap-1">
              HOME
            </Link>
            <Link to="/genres" className="hover:text-amber-500 transition-colors flex items-center gap-1">
              GENRES
            </Link>
            <Link to="/search" className="hover:text-amber-500 transition-colors flex items-center gap-1">
              SEARCH
            </Link>
          </div>

          <div className="text-right font-mono text-[9px] tracking-widest text-zinc-600 uppercase">
            TAXONOMY ENGINE // DEVELOPED BY <span className="text-zinc-400 font-bold">AMAN</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-[9px] font-mono text-zinc-600 tracking-wider">
          <div>© GALACTOPIA CATEGORIZATION HUB</div>
          <a 
            href="https://github.com/YOUR_GITHUB_USERNAME" 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-white/[0.02] border border-white/[0.05] text-zinc-400 hover:text-white hover:border-white/20 transition-all shadow-sm"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
          </a>
        </div>
      </footer>
    </div>
  );
}