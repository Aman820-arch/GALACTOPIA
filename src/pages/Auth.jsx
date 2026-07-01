import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Auth() {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: ''
  });

  const [focusedField, setFocusedField] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');
    setLoading(true);

    try {
      const endpoint = isLogin
        ? 'http://127.0.0.1:8000/auth/login'
        : 'http://127.0.0.1:8000/auth/register';

      const payload = isLogin
        ? {
            email: formData.email,
            password: formData.password
          }
        : {
            username: formData.username,
            email: formData.email,
            password: formData.password
          };

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!data.success) {
        setError(data.message);
        return;
      }

      if (isLogin) {
  localStorage.setItem(
    "user",
    JSON.stringify(data.user)
  );

  // Tell App.jsx that a user has logged in
  window.dispatchEvent(new Event("userChanged"));

  navigate("/profile");
} else {
        alert('Account created successfully! Please login.');

        setIsLogin(true);

        setFormData({
          username: '',
          email: '',
          password: ''
        });
      }
    } catch (err) {
      console.error(err);
      setError('Unable to connect to backend');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center animate-in fade-in zoom-in-95 duration-500 py-6 select-none">
      <div className="w-full max-w-md relative group">

        <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500/10 via-purple-500/5 to-emerald-500/10 rounded-2xl blur-xl opacity-70 group-hover:opacity-100 transition duration-1000" />

        <div className="relative w-full border border-white/[0.06] bg-[#050508]/60 backdrop-blur-xl p-8 rounded-2xl shadow-[0_24px_60px_-15px_rgba(0,0,0,0.8)] space-y-8 overflow-hidden">

          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />

          <div className="absolute top-2 right-4 font-mono text-[8px] text-zinc-600 tracking-widest">
            SYS.SEC_LN // {isLogin ? "01" : "02"}
          </div>

          <header className="space-y-2 text-center relative">
            <h2 className="text-xs font-black tracking-[0.4em] text-emerald-400 uppercase drop-shadow-[0_0_12px_rgba(16,185,129,0.2)]">
              {isLogin ? "IDENTITY CREDENTIAL SCAN" : "NEW CORE PROVISION"}
            </h2>

            <p className="text-zinc-500 font-mono text-[9px] tracking-wide uppercase">
              {isLogin
                ? "PROCEED WITH ARCHIVAL CLEARANCE"
                : "INITIALIZING INTERFACE PARAMETERS"}
            </p>
          </header>

          <form onSubmit={handleSubmit} className="space-y-5">

            {!isLogin && (
              <div className="space-y-1.5 relative group/field">
                <div className="flex justify-between items-center px-1">
                  <label className="text-[9px] font-mono tracking-widest text-zinc-400 uppercase">
                    OPERATOR NAME
                  </label>

                  {focusedField === 'username' && (
                    <span className="text-[8px] font-mono text-emerald-400 animate-pulse">
                      AWAITING INPUT
                    </span>
                  )}
                </div>

                <div className={`relative transition-all duration-300 rounded-xl border ${
                  focusedField === 'username'
                    ? 'border-emerald-500/40 bg-emerald-500/[0.02]'
                    : 'border-white/[0.05] bg-white/[0.01]'
                }`}>
                  <input
                    type="text"
                    required
                    onFocus={() => setFocusedField('username')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full bg-transparent px-4 py-3.5 text-sm text-white focus:outline-none placeholder-zinc-700 tracking-wide font-medium"
                    placeholder="E.g., AMAN"
                    value={formData.username}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        username: e.target.value
                      })
                    }
                  />
                </div>
              </div>
            )}

            <div className="space-y-1.5 relative group/field">
              <div className="flex justify-between items-center px-1">
                <label className="text-[9px] font-mono tracking-widest text-zinc-400 uppercase">
                  MATRIX ADDR
                </label>

                {focusedField === 'email' && (
                  <span className="text-[8px] font-mono text-emerald-400 animate-pulse">
                    VERIFYING PATH
                  </span>
                )}
              </div>

              <div className={`relative transition-all duration-300 rounded-xl border ${
                focusedField === 'email'
                  ? 'border-emerald-500/40 bg-emerald-500/[0.02]'
                  : 'border-white/[0.05] bg-white/[0.01]'
              }`}>
                <input
                  type="email"
                  required
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full bg-transparent px-4 py-3.5 text-sm text-white focus:outline-none placeholder-zinc-700 tracking-wide font-medium"
                  placeholder="name@domain.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      email: e.target.value
                    })
                  }
                />
              </div>
            </div>

            <div className="space-y-1.5 relative group/field">
              <div className="flex justify-between items-center px-1">
                <label className="text-[9px] font-mono tracking-widest text-zinc-400 uppercase">
                  ENCRYPT PASSKEY
                </label>

                {focusedField === 'password' && (
                  <span className="text-[8px] font-mono text-emerald-400 animate-pulse">
                    BUFFERING SEGMENT
                  </span>
                )}
              </div>

              <div className={`relative transition-all duration-300 rounded-xl border ${
                focusedField === 'password'
                  ? 'border-emerald-500/40 bg-emerald-500/[0.02]'
                  : 'border-white/[0.05] bg-white/[0.01]'
              }`}>
                <input
                  type="password"
                  required
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full bg-transparent px-4 py-3.5 text-sm text-white focus:outline-none placeholder-zinc-700 tracking-widest"
                  placeholder="••••••••••••"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      password: e.target.value
                    })
                  }
                />
              </div>
            </div>

            {error && (
              <div className="text-red-400 text-xs font-mono text-center">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 relative group/btn overflow-hidden rounded-xl border border-emerald-500/30 bg-emerald-500/5 hover:bg-emerald-500 hover:text-black py-4 transition-all duration-300 active:scale-[0.98]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-teal-400/20 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" />

              <span className="relative z-10 text-[11px] font-mono font-black tracking-[0.25em] uppercase transition-colors duration-300">
                {loading
                  ? "PROCESSING..."
                  : isLogin
                  ? "ENGAGE ACCESS LINK"
                  : "COMPILE NEW INSTANCE"}
              </span>
            </button>
          </form>

          <div className="text-center pt-2 relative border-t border-white/[0.03]">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-[9px] font-mono tracking-[0.15em] text-zinc-500 hover:text-emerald-400 transition-colors uppercase"
            >
              {isLogin
                ? "► REGISTER PORTAL ROUTE // SIGN UP"
                : "◄ ACCESS REGISTERED NODE // LOG IN"}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}