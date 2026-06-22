import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Film, Layers, Search } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();
  
  const navItems = [
    { icon: <Film size={18} />, label: 'HOME', path: '/' },
    { icon: <Layers size={18} />, label: 'GENRES', path: '/genres' }, // Changed path and label
    { icon: <Search size={18} />, label: 'SEARCH', path: '/search' },
  ];

  return (
    <nav className="fixed left-4 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4 bg-[#09090d]/60 backdrop-blur-xl border border-white/[0.05] p-3 rounded-2xl shadow-2xl">
      <Link to="/" className="flex items-center justify-center h-10 w-10 rounded-xl bg-gradient-to-tr from-amber-500/20 to-transparent border border-amber-500/30 mb-2">
        <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
      </Link>

      <div className="flex flex-col gap-2">
        {navItems.map((item, idx) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={idx}
              to={item.path}
              className={`group relative flex items-center justify-center h-10 w-10 rounded-xl border transition-all duration-300 ${
                isActive 
                  ? 'text-amber-500 bg-amber-500/5 border-amber-500/20' 
                  : 'text-zinc-400 hover:text-white hover:bg-white/[0.03] border-transparent'
              }`}
            >
              {item.icon}
              <span className="absolute left-14 scale-95 opacity-0 pointer-events-none bg-[#09090d] border border-white/[0.08] text-[10px] font-bold tracking-widest text-zinc-200 px-3 py-1.5 rounded-lg transition-all duration-200 origin-left group-hover:scale-100 group-hover:opacity-100 font-mono">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}