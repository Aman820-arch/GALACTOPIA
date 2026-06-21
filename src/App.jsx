import React, { useState } from 'react';
import Preloader from './components/Preloader';

export default function App() {
  const [showLoader, setShowLoader] = useState(true);

  return (
    <div className="min-h-screen bg-[#030303] text-white relative overflow-x-hidden">
      {/* Preloader sits on top and self-destructs when its slide animation ends */}
      {showLoader && <Preloader onComplete={() => setShowLoader(false)} />}
      
      {/* Dashboard container with smooth delay blur reveal */}
      <div className={`p-8 max-w-7xl mx-auto w-full min-h-screen flex flex-col justify-between ${
        !showLoader ? 'opacity-100' : 'animate-platform-reveal'
      }`}>
        <header className="flex justify-between items-center py-8 border-b border-zinc-900">
          <h2 className="text-xl font-bold tracking-widest text-[#00ffcc] [text-shadow:0_0_12px_rgba(0,255,204,0.3)]">
            GALACTOPIA.
          </h2>
          <nav className="space-x-8 text-xs tracking-widest text-zinc-500 font-mono">
            <a href="#movies" className="hover:text-white transition-colors duration-300">&gt; MOVIES</a>
            <a href="#series" className="hover:text-white transition-colors duration-300">&gt; SERIES</a>
            <a href="#terminal" className="hover:text-white transition-colors duration-300">&gt; TERMINAL</a>
          </nav>
        </header>

        <main className="my-auto py-20">
          <p className="text-zinc-600 font-mono text-xs tracking-[0.4em] mb-4">
            SYSTEM_STATUS_ONLINE // OVERRIDE_OK
          </p>
          <h3 className="text-7xl font-black tracking-tight max-w-4xl uppercase leading-none mb-6">
            A New Horizon in <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-400 to-zinc-800">
              Cinematic Navigation.
            </span>
          </h3>
          <p className="text-zinc-500 max-w-md font-mono text-xs leading-relaxed">
            Direct interface established. Accessing streaming mainframes across isolated sectors.
          </p>
        </main>

        <footer className="py-6 border-t border-zinc-900 text-[10px] text-zinc-600 font-mono flex justify-between">
          <div>© 2026 GALACTOPIA CORE</div>
          <div>SECURE_CONNECTION // TLS_1.3</div>
        </footer>
      </div>
    </div>
  );
}