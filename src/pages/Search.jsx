import React from 'react';

export default function Search({ searchQuery, setSearchQuery, movies, setSelectedMovie, isLoadingFeeds, activeSectorLabel }) {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="space-y-2">
        <h2 className="text-xs font-black tracking-[0.3em] text-amber-500 uppercase">
          {activeSectorLabel ? `SECTOR // ${activeSectorLabel}` : 'GLOBAL SEARCH'}
        </h2>
        <p className="text-zinc-400 text-sm">Query the TMDB database for specific cinematic records.</p>
      </header>

      {/* Dedicated Clean Search Input Field */}
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

      {/* Structured Results Display Grid */}
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
  );
}