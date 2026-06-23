import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Heart, Bookmark, FileText, History, LogOut } from 'lucide-react';

export default function Profile({ continueWatching = [], watchlist = [], wishlist = [], watchedHistory = [], favorites = [] }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('continue');
  
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : { username: 'GUEST OPERATOR', email: 'OFFLINE ARCHIVE' };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-500 flex flex-col min-h-[80vh] justify-between pb-12 pt-4 select-none">
      <div className="space-y-12 w-full">
        
        {/* PROFILE HEADER BLOCK */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-white/[0.04] pb-8 gap-4">
          <div className="space-y-1.5">
            <h2 className="text-xs font-black tracking-[0.3em] text-zinc-400 uppercase">USER CORE INTERFACE</h2>
            <h3 className="text-3xl font-black tracking-tight text-white uppercase">{user.username}</h3>
            <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-wider">{user.email}</p>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 border border-zinc-700 bg-zinc-800/30 hover:bg-zinc-800/60 text-zinc-300 font-mono text-[10px] tracking-widest uppercase rounded-xl transition-all"
          >
            <LogOut size={12} />
            TERMINATE SESSION
          </button>
        </header>

        {/* METRICS HUB TAB NAVIGATION */}
        <div className="flex border-b border-white/[0.03] font-mono text-[10px] tracking-widest gap-8 overflow-x-auto pb-1">
          {[
            { id: 'continue', label: 'Continue Watching', count: continueWatching.length },
            { id: 'favorites', label: 'Favorites', count: favorites.length },
            { id: 'watchlist', label: 'Watchlist', count: watchlist.length },
            { id: 'wishlist', label: 'Wishlist Requests', count: wishlist.length },
            { id: 'history', label: 'History Log', count: watchedHistory.length }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-4 uppercase font-bold transition-colors relative whitespace-nowrap ${
                activeTab === tab.id ? 'text-zinc-200' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              {tab.label} ({tab.count})
              
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-zinc-300 animate-in fade-in duration-300" />
              )}
            </button>
          ))}
        </div>

        {/* RENDERING DYNAMIC CARD COMPONENT FEED */}
        <section className="min-h-[250px]">
          
          {/* CONTINUE WATCHING */}
          {activeTab === 'continue' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {continueWatching.length === 0 ? (
                <div className="border border-dashed border-white/[0.05] rounded-xl p-8 text-center bg-white/[0.005] flex flex-col items-center justify-center space-y-2">
                  <Play size={18} className="text-zinc-700" />
                  <p className="text-zinc-600 font-mono text-[10px] tracking-wider uppercase">NO ACTIVE VIDEO STREAM CACHE LOGGED</p>
                </div>
              ) : (
                continueWatching.map((movie) => (
                  <div key={movie.id} className="group relative border border-white/[0.05] bg-white/[0.01] backdrop-blur-md p-4 rounded-xl hover:border-zinc-500/30 transition-all duration-300 flex gap-4 items-center shadow-xl">
                    <div className="w-20 h-28 bg-zinc-900 rounded-lg overflow-hidden flex-shrink-0 border border-white/[0.05] flex items-center justify-center">
                      {movie.poster ? (
                        <img src={movie.poster} alt={movie.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      ) : (
                        <Play size={20} className="text-zinc-700" />
                      )}
                    </div>
                    <div className="flex-1 flex flex-col justify-between h-24">
                      <div>
                        <span className="text-[9px] font-mono tracking-widest text-zinc-400">{movie.tag}</span>
                        <h4 className="text-sm font-bold text-white tracking-wide mt-0.5 line-clamp-1 uppercase">{movie.title}</h4>
                      </div>
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-[9px] font-mono text-zinc-500">
                          <span>TRACKING PROGRESS</span>
                          <span className="text-zinc-300 font-bold">{movie.progress}%</span>
                        </div>
                        <div className="w-full bg-zinc-900/60 h-[3px] rounded-full overflow-hidden">
                          <div className="bg-zinc-400 h-full transition-all duration-500" style={{ width: `${movie.progress}%` }} />
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* FAVORITES */}
          {activeTab === 'favorites' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {favorites.length === 0 ? (
                <div className="col-span-full border border-dashed border-white/[0.05] rounded-xl p-8 text-center bg-white/[0.005] flex flex-col items-center justify-center space-y-2">
                  <Heart size={18} className="text-zinc-700" />
                  <p className="text-zinc-600 font-mono text-[10px] tracking-wider uppercase">NO CORE SELECTIONS MARKED AS FAVORITE</p>
                </div>
              ) : (
                favorites.map((movie) => (
                  <div key={movie.id} className="group relative border border-white/[0.05] bg-white/[0.01] backdrop-blur-md p-3 rounded-xl hover:border-zinc-500/30 transition-all duration-300 flex items-center gap-4 shadow-xl">
                    <div className="w-12 h-16 bg-zinc-900 rounded-md overflow-hidden flex-shrink-0 border border-white/[0.05] flex items-center justify-center">
                      {movie.poster ? (
                        <img src={movie.poster} alt={movie.title} className="w-full h-full object-cover" />
                      ) : (
                        <Heart size={14} className="text-zinc-700" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0 pr-2">
                      <h4 className="text-xs font-bold text-zinc-200 group-hover:text-white transition-colors uppercase tracking-wider truncate">{movie.title}</h4>
                      <p className="text-[10px] font-mono text-zinc-400 mt-0.5">{movie.tag || movie.tags} {movie.year ? `• ${movie.year}` : ''}</p>
                    </div>
                    <Heart size={14} className="text-zinc-500 group-hover:text-red-400 transition-colors cursor-pointer ml-auto" />
                  </div>
                ))
              )}
            </div>
          )}

          {/* WATCHLIST */}
          {activeTab === 'watchlist' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {watchlist.length === 0 ? (
                <div className="col-span-full border border-dashed border-white/[0.05] rounded-xl p-8 text-center bg-white/[0.005] flex flex-col items-center justify-center space-y-2">
                  <Bookmark size={18} className="text-zinc-700" />
                  <p className="text-zinc-600 font-mono text-[10px] tracking-wider uppercase">YOUR CATALOG WATCHLIST IS EMPTY</p>
                </div>
              ) : (
                watchlist.map((movie) => (
                  <div key={movie.id} className="group relative border border-white/[0.05] bg-white/[0.01] backdrop-blur-md p-3 rounded-xl hover:border-zinc-500/30 transition-all duration-300 flex items-center gap-4 shadow-xl">
                    <div className="w-12 h-16 bg-zinc-900 rounded-md overflow-hidden flex-shrink-0 border border-white/[0.05] flex items-center justify-center">
                      {movie.poster ? (
                        <img src={movie.poster} alt={movie.title} className="w-full h-full object-cover" />
                      ) : (
                        <Bookmark size={14} className="text-zinc-700" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0 pr-2">
                      <h4 className="text-xs font-bold text-zinc-200 group-hover:text-white transition-colors uppercase tracking-wider truncate">{movie.title}</h4>
                      <p className="text-[10px] font-mono text-zinc-400 mt-0.5">{movie.tag || movie.tags} {movie.year ? `• ${movie.year}` : ''}</p>
                    </div>
                    <Bookmark size={14} className="text-zinc-500 group-hover:text-zinc-300 transition-colors cursor-pointer ml-auto" />
                  </div>
                ))
              )}
            </div>
          )}

          {/* WISHLIST REQUESTS */}
          {activeTab === 'wishlist' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {wishlist.length === 0 ? (
                <div className="col-span-full border border-dashed border-white/[0.05] rounded-xl p-8 text-center bg-white/[0.005] flex flex-col items-center justify-center space-y-2">
                  <FileText size={18} className="text-zinc-700" />
                  <p className="text-zinc-600 font-mono text-[10px] tracking-wider uppercase">YOUR SUBMITTED REQUEST MATRIX IS PRISTINE</p>
                </div>
              ) : (
                wishlist.map((movie) => (
                  <div key={movie.id} className="group relative border border-white/[0.05] bg-white/[0.01] backdrop-blur-md p-5 rounded-xl hover:border-zinc-500/30 transition-all duration-300 flex items-center justify-between shadow-xl">
                    <div className="space-y-1">
                      <h4 className="text-xs font-bold text-zinc-200 group-hover:text-white transition-colors uppercase tracking-wider">{movie.title}</h4>
                      <p className="text-[10px] font-mono text-zinc-500">{movie.tag || "CUSTOM REQUEST"} {movie.year ? `• ${movie.year}` : ''}</p>
                    </div>
                    <span className="text-zinc-400 font-mono text-[9px] uppercase tracking-widest bg-zinc-800/50 border border-zinc-700 px-2 py-0.5 rounded-md">PENDING</span>
                  </div>
                ))
              )}
            </div>
          )}

          {/* HISTORY LOG */}
          {activeTab === 'history' && (
            <div>
              {watchedHistory.length === 0 ? (
                <div className="border border-dashed border-white/[0.05] rounded-xl p-8 text-center bg-white/[0.005] flex flex-col items-center justify-center space-y-2">
                  <History size={18} className="text-zinc-700" />
                  <p className="text-zinc-600 font-mono text-[10px] tracking-wider uppercase">NO DATA ARCHIVES LOADED IN HISTORY</p>
                </div>
              ) : (
                <div className="border border-white/[0.03] rounded-xl overflow-hidden bg-white/[0.01]">
                  {watchedHistory.map((movie, index) => (
                    <div key={movie.id} className={`flex justify-between items-center px-6 py-4 text-xs font-medium ${
                      index !== watchedHistory.length - 1 ? 'border-b border-white/[0.03]' : ''
                    }`}>
                      <div className="flex items-center gap-3">
                        <History size={12} className="text-zinc-500" />
                        <span className="text-zinc-300 uppercase tracking-wide">{movie.title}</span>
                      </div>
                      <span className="font-mono text-[10px] text-zinc-500 uppercase">{movie.watchedAt}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}