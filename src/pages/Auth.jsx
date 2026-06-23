import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Auth() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ email: '', password: '', username: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simulate back-end approval & initialize localStorage session data
    const mockSession = { 
      username: formData.username || formData.email.split('@')[0].toUpperCase(), 
      email: formData.email.toLowerCase() 
    };
    
    localStorage.setItem('user', JSON.stringify(mockSession));
    
    // Smooth navigation straight to the freshly cleared dashboard account hub
    navigate('/profile');
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center animate-in fade-in duration-500 py-6">
      <div className="w-full max-w-md border border-white/[0.05] bg-white/[0.01] backdrop-blur-md p-8 rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] space-y-6">
        <header className="space-y-2 text-center">
          <h2 className="text-xs font-black tracking-[0.3em] text-emerald-500 uppercase">
            {isLogin ? "IDENTITY VERIFICATION" : "ACCOUNT REGISTRATION"}
          </h2>
          <p className="text-zinc-400 text-xs">
            {isLogin ? "Access your personalized archival streams." : "Create a new portal access profile."}
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div className="space-y-1.5">
              <label className="text-[10px] font-mono tracking-wider text-zinc-500 uppercase">Username</label>
              <input 
                type="text" 
                required
                className="w-full bg-white/[0.02] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500/40 transition-colors"
                placeholder="AMAN"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              />
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-[10px] font-mono tracking-wider text-zinc-500 uppercase">Email Address</label>
            <input 
              type="email" 
              required
              className="w-full bg-white/[0.02] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500/40 transition-colors"
              placeholder="name@domain.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-mono tracking-wider text-zinc-500 uppercase">Security Code</label>
            <input 
              type="password" 
              required
              className="w-full bg-white/[0.02] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500/40 transition-colors"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          <button 
            type="submit" 
            className="w-full mt-2 bg-emerald-500 hover:bg-emerald-600 text-black font-bold text-xs tracking-widest uppercase py-3.5 rounded-xl transition-all shadow-lg shadow-emerald-500/10 active:scale-[0.99]"
          >
            {isLogin ? "AUTHORIZE ACCESS" : "INITIALIZE INSTANCE"}
          </button>
        </form>

        <div className="text-center pt-2">
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-[10px] font-mono tracking-wider text-zinc-500 hover:text-emerald-400 transition-colors uppercase"
          >
            {isLogin ? "Request New Portal Access // Sign Up" : "Existing Clearance // Log In"}
          </button>
        </div>
      </div>
    </div>
  );
}