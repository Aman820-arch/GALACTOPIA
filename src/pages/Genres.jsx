import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;

function GenreCard({ genre, onClick }) {
  const cardRef = useRef(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div 
      ref={cardRef}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative border border-white/[0.05] bg-white/[0.02] backdrop-blur-md p-6 rounded-xl hover:border-emerald-500/30 hover:bg-white/[0.04] cursor-pointer transition-all duration-500 flex flex-col justify-center min-h-[110px] overflow-hidden shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]"
    >
      {/* REACTIVE KINETIC GLOW BACKGROUND */}
      {isHovered && (
        <div 
          className="absolute pointer-events-none transition-opacity duration-300 opacity-100 mix-blend-screen"
          style={{
            width: '250px',
            height: '250px',
            background: 'radial-gradient(circle, rgba(16, 185, 129, 0.12) 0%, rgba(16, 185, 129, 0.02) 55%, transparent 70%)',
            left: `${coords.x - 125}px`,
            top: `${coords.y - 125}px`,
          }}
        />
      )}

      {/* CORE CAPTION */}
      <h4 className="text-xs font-bold tracking-widest text-zinc-400 group-hover:text-white transition-colors duration-300 relative z-10 select-none">
        {genre.label}
      </h4>
    </div>
  );
}

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
          const formatted = data.genres.map((g) => ({
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

  return (
    <div className="space-y-12 animate-in fade-in duration-500 flex flex-col min-h-[80vh] justify-between">
      <div className="space-y-12 w-full">
        <header className="space-y-2">
          <h2 className="text-xs font-black tracking-[0.3em] text-emerald-500 uppercase">MOVIE GENRES</h2>
          <p className="text-zinc-400 text-sm">Navigate the cinematic archives by categorization clusters.</p>
        </header>

        {isLoading ? (
          <div className="text-zinc-600 font-mono text-xs py-12">
            Loading movie genres...
          </div>
        ) : (
          <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {genres.map((genre) => (
              <GenreCard 
                key={genre.id} 
                genre={genre} 
                onClick={() => {
                  onSelectGenre(genre.id, genre.label);
                  navigate('/search');
                }} 
              />
            ))}
          </section>
        )}
      </div>

      {/* EXPANDED SYSTEM FOOTER */}
      <footer className="mt-32 pt-12 pb-6 border-t border-white/[0.04] space-y-10 w-full">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="space-y-3">
            <div className="text-xs font-black tracking-widest text-white">GALACTOPIA</div>
            <p className="text-zinc-500 text-[11px] max-w-sm leading-relaxed tracking-wide">
              An open, modular cinematic cataloging dashboard interfaces querying community movie databases. Built for clean visualization frameworks.
            </p>
          </div>

          <div className="flex items-center gap-10 font-mono text-[10px] tracking-[0.25em] text-zinc-400">
            <Link to="/" className="hover:text-emerald-500 transition-colors">HOME</Link>
            <Link to="/genres" className="hover:text-emerald-500 transition-colors">GENRES</Link>
            <Link to="/search" className="hover:text-emerald-500 transition-colors">SEARCH</Link>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between pt-6 border-t border-white/[0.02] gap-4 text-[10px] font-mono text-zinc-500 tracking-wider">
          <div className="uppercase">
            © {new Date().getFullYear()} GALACTOPIA ARCHIVE. DEVELOPED BY <span className="text-zinc-300 font-bold">AMAN</span>
          </div>
          
          <a 
            href="https://github.com/YOUR_GITHUB_USERNAME" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.01] border border-white/[0.04] text-zinc-400 hover:text-white hover:border-white/10 hover:bg-white/[0.03] transition-all shadow-sm"
          >
            <span className="text-[9px] font-bold tracking-widest uppercase">REPOSITORIES</span>
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
              <path d="M9 18c-4.51 2-5-2-7-2"></path>
            </svg>
          </a>
        </div>
      </footer>
    </div>
  );
}