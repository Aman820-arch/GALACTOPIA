import React, { useEffect, useState } from 'react';

export default function MovieDetail({ movie, onClose }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div className={`fixed inset-0 z-40 bg-[#050507]/90 backdrop-blur-xl flex justify-end transition-all duration-500 ease-out font-mono select-none ${
      visible ? 'opacity-100' : 'opacity-0 pointer-events-none'
    }`}>
      
      <div className="absolute inset-0 w-full h-full overflow-hidden opacity-30 pointer-events-none">
        <div className={`absolute inset-0 bg-gradient-to-tr ${movie.color} mix-blend-color-dodge animate-pulse`} />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050507] via-transparent to-[#050507]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050507] via-transparent to-transparent" />
      </div>

      <div className="relative z-10 w-full max-w-2xl bg-[#0b0b0f]/80 border-l border-white/[0.04] p-8 md:p-12 h-full flex flex-col justify-between overflow-y-auto">
        
        <div className="flex justify-between items-center text-[10px] text-zinc-500 border-b border-white/[0.04] pb-4">
          <div>STREAM_CHANNEL // TERMINAL_{movie.id}</div>
          <button 
            onClick={onClose}
            className="border border-white/[0.08] px-2.5 py-1 rounded bg-white/[0.02] hover:bg-white/[0.08] hover:text-[#00ffcc] hover:border-[#00ffcc]/30 transition-all cursor-pointer"
          >
            CLOSE [ESC]
          </button>
        </div>

        <div className="my-auto py-8 space-y-6">
          <div className="space-y-2">
            <div className="text-[#00ffcc] text-xs font-bold tracking-[0.3em] uppercase">{movie.tags}</div>
            <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white leading-none">
              {movie.title}
            </h3>
            <div className="text-[11px] text-zinc-500 flex gap-4 pt-1">
              <span>CRITIC_INDEX // ★ {movie.rating}</span>
              <span>•</span>
              <span>TIMELINE_STAMP // {movie.year}</span>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-white/[0.01] border border-white/[0.03] text-xs text-zinc-400 space-y-2">
            <div className="text-[10px] text-zinc-600 font-bold tracking-wider">&gt; TRANSMISSION_META</div>
            <p className="leading-relaxed text-zinc-400 font-sans">
              Decrypted mainframe streaming sector payload completely online. Signal parameters stabilized across standard network buffers. Audio feeds running natively in Dolby Atmos matrix arrays.
            </p>
          </div>

          <div className="pt-4 flex flex-wrap gap-4">
            <button className="flex-1 min-w-[180px] bg-white text-black font-black text-xs tracking-widest py-4 px-6 rounded hover:bg-[#00ffcc] hover:text-black transition-all shadow-lg cursor-pointer uppercase">
              ⚡ Initiate Main Stream
            </button>
            <button className="flex-1 min-w-[180px] border border-white/[0.08] bg-white/[0.02] text-zinc-300 font-bold text-xs tracking-widest py-4 px-6 rounded hover:bg-white/[0.06] hover:text-white transition-all cursor-pointer uppercase">
              + Append to Cache List
            </button>
          </div>
        </div>

        <div className="space-y-3">
          <div className="text-[10px] font-bold text-zinc-600 tracking-wider uppercase">[ SECTOR_NODES // MIRRORS ]</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <div className="p-3 border border-white/[0.03] bg-white/[0.01] rounded flex justify-between items-center group hover:border-[#00ffcc]/30 cursor-pointer transition-colors">
              <span className="text-zinc-400 group-hover:text-white">NODE_01 // HIGH_BANDWIDTH</span>
              <span className="text-[#00ffcc] text-[10px]">ACTIVE</span>
            </div>
            <div className="p-3 border border-white/[0.03] bg-white/[0.01] rounded flex justify-between items-center group hover:border-white/10 cursor-pointer transition-colors">
              <span className="text-zinc-500 group-hover:text-zinc-300">NODE_02 // ALT_BACKUP_SEC</span>
              <span className="text-zinc-600 text-[10px]">STANDBY</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}