import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('continue');
  
  // Extract user info safely, fall back to guest structure if empty
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : { username: 'GUEST OPERATOR', email: 'OFFLINE ARCHIVE' };

  // Mock Front-end arrays mapped exactly to your requested hubs
  const continueWatching = [
    { id: 1, title: "INTERSTELLAR", progress: 72, year: "2014", tag: "SCI-FI" },
    { id: 2, title: "BLADE RUNNER 2049", progress: 40, year: "2017", tag: "CYBERPUNK" }
  ];

  const wishlist = [
    { id: 3, title: "DUNE: PART TWO", year: "2024", tag: "EPIC" },
    { id: 4, title: "THE MATRIX", year: "1999", tag: "SCI-FI" },
    { id: 5, title: "OPPENHEIMER", year: "2023", tag: "BIOGRAPHY" }
  ];

  const watchedHistory = [
    { id: 6, title: "INCEPTION", watchedAt: "2 DAYS AGO" },
    { id: 7, title: "THE DARK KNIGHT", watchedAt: "1 WEEK AGO" }
  ];

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-500 flex flex-col min-h-[80vh] justify-between pb-12 pt-4">
      <div className="space-y-12 w-full">
        
        {/* PROFILE HEADER BLOCK */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-white/[0.04] pb-8 gap-4">
          <div className="space-y-1.5">
            <h2 className="text-xs font-black tracking-[0.3em] text-emerald-500 uppercase">USER CORE INTERFACE</h2>
            <h3 className="text-3xl font-black tracking-tight text-white uppercase">{user.username}</h3>
            <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-wider">{user.email}</p>
          </div>
          <button 
            onClick={handleLogout}
            className="px-4 py-2 border border-red-500/20 bg-red-500/5 hover:bg-red-500/10 text-red-400 font-mono text-[10px] tracking-widest uppercase rounded-xl transition-all"
          >
            TERMINATE SESSION
          </button>
        </header>

        {/* METRICS HUB TAB NAVIGATION */}
        <div className="flex border-b border-white/[0.03] font-mono text-[10px] tracking-widest gap-8">
          {['continue', 'wishlist', 'history'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 uppercase font-bold transition-colors relative ${
                activeTab === tab ? 'text-emerald-500' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              {tab === 'continue' && 'Continue Watching'}
              {tab === 'wishlist' && 'Wishlist'}
              {tab === 'history' && 'History Log'}
              
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-emerald-500 animate-in fade-in duration-300" />
              )}
            </button>
          ))}
        </div>

        {/* RENDER ACTIVE CARDS TAB LOOP */}
        <section className="min-h-[250px]">
          {activeTab === 'continue' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {continueWatching.map((movie) => (
                <div key={movie.id} className="group relative border border-white/[0.05] bg-white/[0.01] backdrop-blur-md p-6 rounded-xl hover:border-emerald-500/20 transition-all duration-300 flex flex-col justify-between min-h-[110px] shadow-xl">
                  <div>
                    <span className="text-[9px] font-mono tracking-widest text-emerald-400">{movie.tag}</span>
                    <h4 className="text-sm font-bold text-white tracking-wide mt-1 uppercase">{movie.title}</h4>
                  </div>
                  <div className="space-y-2 mt-4">
                    <div className="flex justify-between text-[9px] font-mono text-zinc-500">
                      <span>TRACKING PROGRESS</span>
                      <span className="text-zinc-300 font-bold">{movie.progress}%</span>
                    </div>
                    <div className="w-full bg-zinc-900/60 h-[3px] rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full transition-all duration-500" style={{ width: `${movie.progress}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'wishlist' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {wishlist.map((movie) => (
                <div key={movie.id} className="group relative border border-white/[0.05] bg-white/[0.01] backdrop-blur-md p-5 rounded-xl hover:border-emerald-500/20 transition-all duration-300 flex items-center justify-between shadow-xl">
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-zinc-200 group-hover:text-white transition-colors uppercase tracking-wider">{movie.title}</h4>
                    <p className="text-[10px] font-mono text-zinc-500">{movie.tag} • {movie.year}</p>
                  </div>
                  <span className="text-zinc-600 group-hover:text-emerald-400 font-mono text-xs transition-colors cursor-pointer select-none">→</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'history' && (
            <div className="border border-white/[0.03] rounded-xl overflow-hidden bg-white/[0.01]">
              {watchedHistory.map((movie, index) => (
                <div key={movie.id} className={`flex justify-between items-center px-6 py-4 text-xs font-medium ${
                  index !== watchedHistory.length - 1 ? 'border-b border-white/[0.03]' : ''
                }`}>
                  <span className="text-zinc-300 uppercase tracking-wide">{movie.title}</span>
                  <span className="font-mono text-[10px] text-zinc-500 uppercase">{movie.watchedAt}</span>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}