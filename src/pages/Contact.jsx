import React, { useState } from 'react';
import { Send, CheckCircle, ShieldAlert } from 'lucide-react';

export default function Contact() {
  const [formMode, setFormMode] = useState("request");
  const [formData, setFormData] = useState({
    name: "", email: "", movieTitle: "", quality: "1080p", message: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
      setFormData({ name: "", email: "", movieTitle: "", quality: "1080p", message: "" });
      setTimeout(() => setIsSent(false), 5000);
    }, 1200);
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center p-2 animate-in fade-in zoom-in-95 duration-500">
      <div className="w-full max-w-lg bg-[#040406]/90 backdrop-blur-2xl border-2 border-emerald-500/10 p-8 rounded-3xl shadow-[0_0_50px_rgba(16,185,129,0.03)] relative overflow-hidden">
        
        {/* Console Accent Tabs */}
        <div className="absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />
        <div className="absolute bottom-3 right-4 font-mono text-[8px] text-emerald-500/30 tracking-widest">
          SECURE_NODE_V.2.6
        </div>

        <header className="space-y-2 mb-8 text-center">
          <div className="inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[9px] font-mono px-2.5 py-1 rounded-full uppercase tracking-widest mb-2">
            <span className="w-1 h-1 bg-emerald-500 rounded-full animate-ping" />
            Direct Uplink Established
          </div>
          <h2 className="text-xl font-black tracking-tight text-zinc-100 uppercase">COMMS INTERFACE</h2>
          <p className="text-zinc-500 text-xs">Dispatch missing media indexes or submit interface diagnostics.</p>
        </header>

        {isSent ? (
          <div className="py-12 flex flex-col items-center text-center space-y-4 animate-in fade-in duration-300">
            <div className="h-12 w-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
              <CheckCircle className="text-emerald-400 w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h4 className="text-xs font-mono font-bold text-zinc-200 tracking-wider">TRANSMISSION COMPLETION</h4>
              <p className="text-[11px] text-zinc-500 max-w-xs mx-auto">Data packets safely routed to central administration modules.</p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1">
              <label className="text-[9px] font-mono tracking-widest text-emerald-500/70 font-bold uppercase">UPLINK PURPOSE</label>
              <select 
                value={formMode}
                onChange={(e) => setFormMode(e.target.value)}
                className="w-full bg-[#09090d] border border-white/[0.06] rounded-xl px-4 py-3 text-xs text-zinc-300 focus:outline-none focus:border-emerald-500/30 font-medium transition-colors"
              >
                <option value="request">REQUEST UNINDEXED MOVIE</option>
                <option value="feedback">SUBMIT SYSTEM FEEDBACK</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[9px] font-mono tracking-widest text-zinc-500 uppercase">IDENTIFIER</label>
                <input 
                  type="text" name="name" required value={formData.name} onChange={handleChange} placeholder="e.g. Neo"
                  className="w-full bg-[#09090d] border border-white/[0.06] rounded-xl px-4 py-3 text-xs text-zinc-300 placeholder-zinc-800 focus:outline-none focus:border-emerald-500/30 transition-colors"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-mono tracking-widest text-zinc-500 uppercase">RETURN PATH</label>
                <input 
                  type="email" name="email" required value={formData.email} onChange={handleChange} placeholder="identity@network.com"
                  className="w-full bg-[#09090d] border border-white/[0.06] rounded-xl px-4 py-3 text-xs text-zinc-300 placeholder-zinc-800 focus:outline-none focus:border-emerald-500/30 transition-colors"
                />
              </div>
            </div>

            {formMode === "request" && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 animate-in slide-in-from-top-2 duration-300">
                <div className="sm:col-span-2 space-y-1">
                  <label className="text-[9px] font-mono tracking-widest text-zinc-500 uppercase">TARGET TITLE</label>
                  <input 
                    type="text" name="movieTitle" required={formMode === "request"} value={formData.movieTitle} onChange={handleChange} placeholder="Movie name..."
                    className="w-full bg-[#09090d] border border-white/[0.06] rounded-xl px-4 py-3 text-xs text-zinc-300 placeholder-zinc-800 focus:outline-none focus:border-emerald-500/30 transition-colors"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-mono tracking-widest text-zinc-500 uppercase">RESOLUTION</label>
                  <select 
                    name="quality" value={formData.quality} onChange={handleChange}
                    className="w-full bg-[#09090d] border border-white/[0.06] rounded-xl px-4 py-3 text-xs text-zinc-300 focus:outline-none focus:border-emerald-500/30 font-medium transition-colors"
                  >
                    <option value="4K UHD">4K UHD</option>
                    <option value="1080p">1080P</option>
                    <option value="720p">720P</option>
                  </select>
                </div>
              </div>
            )}

            <div className="space-y-1">
              <label className="text-[9px] font-mono tracking-widest text-zinc-500 uppercase">
                {formMode === "request" ? "ADDITIONAL SPECIFICATIONS" : "FEEDBACK ARCHIVE PACKET"}
              </label>
              <textarea 
                name="message" required={formMode === "feedback"} rows={3} value={formData.message} onChange={handleChange}
                placeholder={formMode === "request" ? "Provide stream details or notes..." : "Enter technical site feedback..."}
                className="w-full bg-[#09090d] border border-white/[0.06] rounded-xl px-4 py-3 text-xs text-zinc-300 placeholder-zinc-800 focus:outline-none focus:border-emerald-500/30 resize-none transition-colors"
              />
            </div>

            <button
              type="submit" disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/20 text-emerald-400 font-bold tracking-widest text-[10px] uppercase py-3.5 rounded-xl transition-all duration-300 disabled:opacity-50 font-mono"
            >
              {isSubmitting ? (
                <span className="animate-pulse">STREAMING DATA CHANNELS...</span>
              ) : (
                <>
                  <Send size={11} />
                  <span>INITIALIZE PACKET TRANSMIT</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}