import React from 'react';
import { useNavigate } from 'react-router-dom';

const MOVIE_GENRES = [
  { label: "ACTION", id: 28 },
  { label: "SCI-FI", id: 878 },
  { label: "DRAMA", id: 18 },
  { label: "THRILLER", id: 53 },
  { label: "ANIMATION", id: 16 },
  { label: "HORROR", id: 27 }
];

export default function Genres({ onSelectGenre }) {
  const navigate = useNavigate();

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

      <section className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {MOVIE_GENRES.map((genre) => (
          <div 
            key={genre.id} 
            onClick={() => handleGenreClick(genre)}
            className="group border border-white/[0.05] bg-[#0c0c12]/40 p-6 rounded-2xl hover:border-amber-500/30 cursor-pointer transition-all duration-300"
          >
            <h4 className="text-sm font-bold text-zinc-300 group-hover:text-amber-500 transition-colors">
              {genre.label}
            </h4>
            <span className="text-[10px] text-zinc-600 block mt-1">BROWSE ARCHIVE →</span>
          </div>
        ))}
      </section>

      <section className="p-6 rounded-2xl border border-white/[0.03] bg-[#0c0c12]/20 flex justify-between items-center">
        <span className="text-[10px] text-zinc-500 font-mono tracking-widest">SYSTEM STATUS: OPERATIONAL</span>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
          <span className="text-[10px] text-emerald-500 font-bold uppercase">TMDB LINK ACTIVE</span>
        </div>
      </section>
    </div>
  );
}