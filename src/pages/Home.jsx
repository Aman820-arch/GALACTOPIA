import React from 'react';

export default function Home({ movies, setSelectedMovie }) {
  return (
    <div className="space-y-16 animate-in fade-in duration-500">
      <header className="max-w-2xl space-y-4">
        <h1 className="text-sm font-black tracking-[0.4em] text-amber-500 uppercase">GALACTOPIA</h1>
        <h2 className="text-4xl md:text-6xl font-black tracking-tight uppercase leading-[1.1]">
          Cinematic universe <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-400 to-zinc-600">
            without limits.
          </span>
        </h2>
      </header>

      <section className="space-y-6">
        <div className="w-full overflow-hidden border-y border-white/[0.02] bg-gradient-to-r from-transparent via-white/[0.01] to-transparent py-8 relative">
          {movies.length > 0 ? (
            <div className="flex flex-row flex-nowrap w-max gap-6 animate-marquee-loop">
              {movies.map((movie, idx) => (
                <div 
                  key={`${movie.id}-${idx}`} 
                  onClick={() => setSelectedMovie(movie)}
                  className="w-64 h-44 rounded-2xl border border-white/[0.04] bg-[#0c0c12]/40 p-5 flex flex-col justify-between group hover:border-amber-500/30 transition-all duration-500 cursor-pointer flex-shrink-0 relative overflow-hidden"
                >
                  {movie.poster ? (
                    <div 
                      className="absolute inset-0 opacity-10 group-hover:opacity-30 transition-all duration-500 scale-105 group-hover:scale-100 bg-cover bg-center"
                      style={{ backgroundImage: `url(${movie.poster})` }}
                    />
                  ) : (
                    <div className={`absolute inset-0 bg-gradient-to-tr ${movie.color} opacity-25`} />
                  )}
                  
                  <div className="flex justify-between items-start relative z-10">
                    <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-lg backdrop-blur-sm">
                      {movie.tags}
                    </span>
                  </div>
                  
                  <div className="relative z-10 space-y-1">
                    <h4 className="font-bold text-sm tracking-wide text-zinc-200 group-hover:text-white transition-colors line-clamp-2">
                      {movie.title}
                    </h4>
                    <div className="text-[10px] text-zinc-500 font-medium">
                      RELEASED // {movie.year}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-xs text-zinc-600 py-8 tracking-wider">
              Waiting on data stream feed buffers...
            </div>
          )}
        </div>
      </section>
    </div>
  );
}