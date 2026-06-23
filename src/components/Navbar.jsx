import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Film, Layers, Search, Mail } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();
  const isContact = location.pathname === '/contact';
  
  const navItems = [
    { icon: <Film size={18} />, label: 'HOME', path: '/' },
    { icon: <Layers size={18} />, label: 'GENRES', path: '/genres' },
    { icon: <Search size={18} />, label: 'SEARCH', path: '/search' },
    { icon: <Mail size={18} />, label: 'CONTACT', path: '/contact' },
  ];

  return (
    <nav className="fixed left-4 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4 bg-[#09090d]/60 backdrop-blur-xl border border-white/[0.05] p-3 rounded-2xl shadow-2xl">
      {/* Brand Icon Master Node Accent Filtering */}
      <Link 
        to="/" 
        className={`flex items-center justify-center h-10 w-10 rounded-xl bg-gradient-to-tr transition-all duration-300 border ${
          isContact 
            ? 'from-amber-500/20 to-transparent border-amber-500/30' 
            : 'from-emerald-500/20 to-transparent border-emerald-500/30'
        }`}
      >
        <span className={`w-2 h-2 rounded-full animate-pulse ${isContact ? 'bg-amber-500' : 'bg-emerald-500'}`} />
      </Link>

      <div className="flex flex-col gap-2">
        {navItems.map((item, idx) => {
          const isActive = location.pathname === item.path;
          
          let conditionalActiveStyles = '';
          if (isActive) {
            conditionalActiveStyles = isContact
              ? 'text-amber-500 bg-amber-500/5 border-amber-500/20'
              : 'text-emerald-500 bg-emerald-500/5 border-emerald-500/20';
          } else {
            conditionalActiveStyles = isContact
              ? 'text-zinc-400 hover:text-amber-400 hover:bg-white/[0.03] border-transparent'
              : 'text-zinc-400 hover:text-emerald-400 hover:bg-white/[0.03] border-transparent';
          }

          return (
            <Link
              key={idx}
              to={item.path}
              className={`group relative flex items-center justify-center h-10 w-10 rounded-xl border transition-all duration-300 ${conditionalActiveStyles}`}
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