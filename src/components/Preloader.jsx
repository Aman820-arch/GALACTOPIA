import React, { useState, useEffect } from 'react';

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789★⚡🧬🛸";

export default function Preloader({ onComplete }) {
  const targetText = "GALACTOPIA";
  const [displayText, setDisplayText] = useState("");
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    let iterations = 0;
    const interval = setInterval(() => {
      setDisplayText(() => {
        return targetText
          .split("")
          .map((char, index) => {
            if (index < iterations) {
              return targetText[index];
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("");
      });

      iterations += 1 / 3;
      
      if (iterations >= targetText.length + 1) {
        clearInterval(interval);
        setTimeout(() => {
          setIsExiting(true);
        }, 800); // Gives user a moment to appreciate the fully unlocked brand name
      }
    }, 45);

    return () => clearInterval(interval);
  }, []);

  // Handle the unmounting exactly when the curtain leaves the screen layout
  const handleAnimationEnd = (e) => {
    if (e.animationName === 'slideUpOut') {
      onComplete();
    }
  };

  return (
    <div 
      onAnimationEnd={handleAnimationEnd}
      className={`fixed inset-0 bg-[#030303] border-b border-[#00ffcc]/20 z-50 flex flex-col justify-between p-12 font-mono select-none overflow-hidden ${
        isExiting ? 'animate-curtain' : ''
      }`}
    >
      {/* Background Cyber Grid */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[linear-gradient(to_right,#00ffcc_1px,transparent_1px),linear-gradient(to_bottom,#00ffcc_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>

      {/* Meta Headers */}
      <div className="flex justify-between items-center w-full text-[10px] text-zinc-600 tracking-widest relative z-10">
        <div>SYS.LOC // GALACTIC_CORE</div>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-[#00ffcc] rounded-full animate-ping"></span>
          <span className="text-[#00ffcc]">SYS_DECRYPT_ACTIVE</span>
        </div>
      </div>

      {/* Massive Typography Layout */}
      <div className="relative w-full text-center my-auto z-10">
        <div className="absolute inset-0 flex items-center justify-center text-[12vw] font-black tracking-tighter text-stroke uppercase opacity-40 selection:bg-transparent">
          {targetText}
        </div>
        
        <h1 className="relative text-[12vw] font-black tracking-tighter text-white uppercase mix-blend-difference animate-glitch">
          {displayText}
        </h1>
      </div>

      {/* Terminal Footer Logs */}
      <div className="flex justify-between items-end w-full relative z-10">
        <div className="text-xs text-zinc-500 max-w-xs space-y-1">
          <p className="text-zinc-400">&gt; INITIALIZING STREAM ENGINES</p>
          <p className="text-[10px] text-zinc-600">Core system matrix integration authorized.</p>
        </div>
        <div className="text-right font-bold tracking-widest text-xs text-[#00ffcc]">
          [ INITIAL_STAGE ]
        </div>
      </div>
    </div>
  );
}