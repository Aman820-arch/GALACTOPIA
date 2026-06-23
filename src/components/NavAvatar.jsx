import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function NavAvatar() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Check auth state directly from local memory
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;
  const isLoggedIn = !!user;
  const initial = user?.username ? user.username.charAt(0).toUpperCase() : '';

  const handleProfileClick = () => {
    if (isLoggedIn) {
      navigate('/profile');
    } else {
      navigate('/auth');
    }
  };

  const isCurrentPage = location.pathname === '/profile' || location.pathname === '/auth';

  return (
    <div className="fixed top-6 right-6 md:right-12 z-50 animate-in fade-in duration-500">
      <button
        onClick={handleProfileClick}
        className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-300 focus:outline-none select-none shadow-xl ${
          isCurrentPage
            ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400'
            : 'border-white/[0.05] bg-white/[0.02] backdrop-blur-md hover:border-white/20 text-zinc-400 hover:text-white hover:bg-white/[0.04]'
        }`}
      >
        {isLoggedIn ? (
          // Logged-in profile initial token display
          <span className="text-xs font-black font-mono tracking-tight">
            {initial}
          </span>
        ) : (
          // Logged-out empty user silhouette icon
          <svg 
            className="w-4 h-4" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        )}

        {/* Emerald online status connection badge */}
        {isLoggedIn && (
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-[#020204]" />
        )}
      </button>
    </div>
  );
}