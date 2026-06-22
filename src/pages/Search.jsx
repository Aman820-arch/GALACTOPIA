import React from 'react';
import { Link } from 'react-router-dom';

export default function Search({ searchQuery, setSearchQuery, movies, setSelectedMovie, isLoadingFeeds, activeSectorLabel }) {
  return (
    <div className="space-y-8 animate-in fade-in duration-500 flex flex-col min-h-[80vh] justify-between">
      <div className="space-y-8 w-full">
        <header className="space-y-2">
          <h2 className="text-xs font-black tracking-[0.3em] text-amber-500 uppercase">
            {activeSectorLabel ? `GENRE: ${activeSectorLabel}` : 'GLOBAL SEARCH'}
          </h2>
          <p className="text-zinc-400 text-sm">Query the TMDB database for specific cinematic records.</p>
        </header>

        <div className="w-full max-w-xl relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500/10 to-purple-500/10 rounded-xl blur opacity-30 group-focus-within:opacity-100 transition duration-300" />
          <div className="relative flex items-center bg-[#09090d]/90 border border-white/[0.05] rounded-xl px-4 py-3.5 group-focus-within:border-amber-500/30 transition-colors">
            <span className="text-zinc-500 font-mono text-sm mr-3 text-amber-500">&gt;</span>
            <input 
              type="text"
              placeholder="Search titles, actors, genres..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent w-full focus:outline-none text-xs tracking-wide text-zinc-200 placeholder-zinc-600 font-medium"
              autoFocus
            />
            {isLoadingFeeds && (
              <span className="text-[10px] tracking-widest text-amber-500 animate-pulse font-mono font-bold">
                LOADING
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 pt-4">
          {movies.map((movie, idx) => (
            <div 
              key={`${movie.id}-${idx}`} 
              onClick={() => setSelectedMovie(movie)}
              className="group rounded-xl border border-white/[0.04] bg-[#0c0c12]/40 p-3 flex flex-col gap-3 hover:border-amber-500/30 transition-all duration-300 cursor-pointer"
            >
              <div className="aspect-[16/10] w-full rounded-lg bg-zinc-900 overflow-hidden relative">
                {movie.poster ? (
                  <div 
                    className="w-full h-full bg-cover bg-center opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ backgroundImage: `url(${movie.poster})` }}
                  />
                ) : (
                  <div className={`w-full h-full bg-gradient-to-tr ${movie.color} opacity-20`} />
                )}
              </div>
              
              <div className="space-y-1 px-1">
                <h4 className="font-bold text-xs tracking-wide text-zinc-200 group-hover:text-white transition-colors line-clamp-1">
                  {movie.title}
                </h4>
                <div className="flex justify-between items-center text-[10px] text-zinc-500">
                  <span>{movie.year}</span>
                  <span className="text-amber-400 font-semibold">{movie.tags}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {movies.length === 0 && !isLoadingFeeds && (
          <div className="text-zinc-600 font-mono text-xs py-12">
            No records located matching current filter query parameters.
          </div>
        )}
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
            QUERY MATRIX STREAM // DEVELOPED BY <span className="text-zinc-400 font-bold">AMAN</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-[9px] font-mono text-zinc-600 tracking-wider">
          <div>© GALACTOPIA REAL-TIME SEARCH</div>
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