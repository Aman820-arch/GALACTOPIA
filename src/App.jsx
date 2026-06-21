import React, { useState } from 'react';
import Preloader from './components/Preloader';

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="min-h-screen bg-[#030303] text-white">
      {loading ? (
        <Preloader onComplete={() => setLoading(false)} />
      ) : (
        /* The main cinematic layout opens smoothly once completed */
        <div className="animate-fadeIn p-8 max-w-6xl mx-auto">
          <header className="flex justify-between items-center py-6 border-b border-zinc-900">
            <h2 className="text-xl font-bold tracking-wider text-[#00ffcc]">GALACTOPIA.</h2>
            <nav className="space-x-6 text-sm tracking-widest text-zinc-400">
              <a href="#movies" className="hover:text-white transition">MOVIES</a>
              <a href="#series" className="hover:text-white transition">SERIES</a>
              <a href="#mystuff" className="hover:text-white transition">MY LIST</a>
            </nav>
          </header>
          
          <main className="mt-20">
            <p className="text-zinc-500 font-mono text-xs tracking-widest mb-2">&gt; DOCKING_BAY_ACTIVE</p>
            <h3 className="text-5xl font-extrabold tracking-tight max-w-2xl">
              Explore the cinema universe without boundaries.
            </h3>
          </main>
        </div>
      )}
    </div>
  );
}