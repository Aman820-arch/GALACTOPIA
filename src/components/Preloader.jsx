import React, { useState, useEffect } from 'react';

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('INITIATING GALACTOPIA PROTOCOLS...');

  // 1. Simulate Loading Progress
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress >= 100) {
          clearInterval(timer);
          return 100;
        }
        // Random incremental jumps to feel like active data compilation
        const diff = Math.floor(Math.random() * 15) + 5;
        return Math.min(oldProgress + diff, 100);
      });
    }, 120);

    return () => clearInterval(timer);
  }, []);

  // 2. Cycle terminal log messages based on loading percentages
  useEffect(() => {
    if (progress > 25 && progress <= 55) {
      setStatusText('ESTABLISHING QUANTUM LINK...');
    } else if (progress > 55 && progress <= 85) {
      setStatusText('BUFFERING CINEMATIC ENGINES...');
    } else if (progress > 85 && progress < 100) {
      setStatusText('SYNCHRONIZING INTERFACE...');
    } else if (progress === 100) {
      setStatusText('WELCOME ABOARD.');
      const timeout = setTimeout(() => {
        onComplete();
      }, 800);
      return () => clearTimeout(timeout);
    }
  }, [progress, onComplete]);

  return (
    <div className="fixed inset-0 bg-[#030303] z-50 flex flex-col items-center justify-center font-mono select-none overflow-hidden">
      
      {/* Background Cyber Grid Layer using Tailwind v4 arbitrary patterns */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(to_right,#00ffcc_1px,transparent_1px),linear-gradient(to_bottom,#00ffcc_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>

      {/* Center UI Container */}
      <div className="relative z-10 w-full max-w-md px-6 text-center">
        
        {/* Glow Title Accent */}
        <h1 className="text-4xl font-bold tracking-widest text-[#00ffcc] [text-shadow:0_0_12px_rgba(0,255,204,0.5)] mb-2 animate-pulse">
          GALACTOPIA
        </h1>
        <p className="text-[10px] text-zinc-500 tracking-[0.3em] uppercase mb-12">
          V1.0.0 // CINEMA CORE
        </p>

        {/* Counter Percentage */}
        <div className="text-5xl font-extrabold text-white tracking-tighter mb-4">
          {progress}<span className="text-zinc-600 font-light text-2xl">%</span>
        </div>

        {/* Futuristic Laser Loading Bar */}
        <div className="w-full h-[6px] bg-zinc-900 border border-zinc-800 rounded-full overflow-hidden p-[1px] mb-4">
          <div 
            className="h-full bg-gradient-to-r from-[#00ffcc] to-[#00aa88] rounded-full [box-shadow:0_0_8px_#00ffcc] transition-all duration-150 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Live Terminal Feedback */}
        <div className="text-xs text-zinc-400 tracking-wider h-4">
          <span className="text-[#00ffcc] mr-2">&gt;</span>
          {statusText}
        </div>
      </div>
    </div>
  );
}