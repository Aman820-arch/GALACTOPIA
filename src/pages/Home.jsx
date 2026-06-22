import React from 'react';
import { Link } from 'react-router-dom';

export default function Home({ movies, setSelectedMovie }) {
  return (
    <div className="space-y-16 animate-in fade-in duration-500 flex flex-col min-h-[80vh] justify-between">
      <div className="space-y-16">
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
                        RELEASED • {movie.year}
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

      <footer className="mt-20 pt-8 border-t border-white/[0.03] space-y-6">
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
            ARCHIVE SUBSYSTEM v2.6 // DEVELOPED BY <span className="text-zinc-400 font-bold">AMAN</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-[9px] font-mono text-zinc-600 tracking-wider">
          <div>© GALACTOPIA ARCHIVE FEED</div>
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