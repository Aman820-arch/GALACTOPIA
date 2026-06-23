import React, { useState } from 'react';
import { Send, CheckCircle2, Trophy, ShieldCheck } from 'lucide-react';

export default function Contact({ onAddRequest }) {
  const [formMode, setFormMode] = useState("request");
  const [formData, setFormData] = useState({
    name: "", email: "", movieTitle: "", quality: "4K UHD", message: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate golden link data sequence transmission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);

      // If it's a movie request, inject it into the app-wide wishlist pool
      if (formMode === "request" && formData.movieTitle.trim() && onAddRequest) {
        onAddRequest({
          id: Date.now(), // Generate unique temporary runtime ID
          title: formData.movieTitle.trim(),
          year: formData.quality, // Storing quality text in year layout slot
          tag: "REQUESTED", // Clearly identifies custom entries in Profile dashboard
          overview: formData.message || "Custom user request pending admin validation index tracking."
        });
      }

      setFormData({ name: "", email: "", movieTitle: "", quality: "4K UHD", message: "" });
      setTimeout(() => setIsSent(false), 5000);
    }, 1400);
  };

  return (
    <div className="min-h-[80vh] flex flex-col justify-between items-center py-4 animate-in fade-in zoom-in-95 duration-500">
      {/* Spacer element to perfectly balance vertical centering with footer */}
      <div className="flex-1 flex items-center justify-center w-full my-6">
        <div className="w-full max-w-xl bg-gradient-to-b from-[#0e0c07] to-[#040406] border border-amber-500/20 p-8 md:p-10 rounded-3xl shadow-[0_0_60px_rgba(245,158,11,0.03)] relative overflow-hidden group">
          
          {/* Decorative Premium Border Ornaments */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />
          <div className="absolute top-0 left-6 right-6 h-[8px] bg-amber-400/[0.02] blur-sm rounded-full" />
          
          <div className="absolute top-3 left-4 text-[7px] font-mono tracking-[0.3em] text-amber-500/40 font-bold uppercase">
            GLD_CORE_UPLINK // ACTIVE
          </div>

          <header className="space-y-3 mb-8 text-center relative z-10">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/10 to-yellow-500/5 border border-amber-500/30 text-amber-400 text-[10px] font-mono px-3 py-1 rounded-full uppercase tracking-widest mb-1 shadow-[0_0_15px_rgba(245,158,11,0.05)]">
              <Trophy size={10} className="text-amber-400" />
              VIP Communications Terminal
            </div>
            <h2 className="text-2xl font-black tracking-tight bg-gradient-to-b from-zinc-100 via-amber-100 to-amber-400/70 bg-clip-text text-transparent uppercase font-sans">
              ARCHIVE REQUESTS
            </h2>
            <p className="text-zinc-500 text-xs max-w-sm mx-auto leading-relaxed">
              Inquire regarding missing indices, suggest platform expansions, or register general system diagnostics.
            </p>
          </header>

          {isSent ? (
            <div className="py-14 flex flex-col items-center text-center space-y-4 animate-in fade-in duration-400">
              <div className="h-14 w-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.1)]">
                <CheckCircle2 className="text-amber-400 w-6 h-6" />
              </div>
              <div className="space-y-1.5">
                <h4 className="text-xs font-mono font-bold text-amber-400 tracking-widest uppercase">TRANSMISSION COURIER SECURED</h4>
                <p className="text-[11px] text-zinc-400 max-w-xs mx-auto leading-relaxed">
                  Your communication packets have successfully bypassed validation and reached the priority administration queue.
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div className="space-y-1.5">
                <label className="text-[9px] font-mono tracking-widest text-amber-400/80 font-bold uppercase block">UPLINK CLASSIFICATION</label>
                <div className="relative">
                  <select 
                    value={formMode}
                    onChange={(e) => setFormMode(e.target.value)}
                    className="w-full bg-[#07070a] border border-white/[0.05] rounded-xl px-4 py-3.5 text-xs text-zinc-200 focus:outline-none focus:border-amber-500/40 font-medium transition-all appearance-none cursor-pointer group-hover:border-white/[0.08]"
                  >
                    <option value="request">ACQUIRE UNINDEXED CINEMA ENTRY</option>
                    <option value="feedback">TRANSMIT SYSTEM ARCHITECTURE FEEDBACK</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-amber-500/60 text-[10px] font-mono">▼</div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[9px] font-mono tracking-widest text-zinc-500 font-bold uppercase block">OPERATOR NAME</label>
                  <input 
                    type="text" name="name" required value={formData.name} onChange={handleChange} placeholder="e.g., Skywalker"
                    className="w-full bg-[#07070a] border border-white/[0.05] rounded-xl px-4 py-3.5 text-xs text-zinc-200 placeholder-zinc-800 focus:outline-none focus:border-amber-500/40 transition-all group-hover:border-white/[0.08]"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[9px] font-mono tracking-widest text-zinc-500 font-bold uppercase block">RETURN LOGISTICS PATH</label>
                  <input 
                    type="email" name="email" required value={formData.email} onChange={handleChange} placeholder="comms@orbit.io"
                    className="w-full bg-[#07070a] border border-white/[0.05] rounded-xl px-4 py-3.5 text-xs text-zinc-200 placeholder-zinc-800 focus:outline-none focus:border-amber-500/40 transition-all group-hover:border-white/[0.08]"
                  />
                </div>
              </div>

              {formMode === "request" && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 animate-in slide-in-from-top-2 duration-300">
                  <div className="sm:col-span-2 space-y-1.5">
                    <label className="text-[9px] font-mono tracking-widest text-zinc-500 font-bold uppercase block">TARGET CHRONICLE TITLE</label>
                    <input 
                      type="text" name="movieTitle" required={formMode === "request"} value={formData.movieTitle} onChange={handleChange} placeholder="Enter dynamic title..."
                      className="w-full bg-[#07070a] border border-white/[0.05] rounded-xl px-4 py-3.5 text-xs text-zinc-200 placeholder-zinc-800 focus:outline-none focus:border-amber-500/40 transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-mono tracking-widest text-zinc-500 font-bold uppercase block">RESOLUTION DENSITY</label>
                    <div className="relative">
                      <select 
                        name="quality" value={formData.quality} onChange={handleChange}
                        className="w-full bg-[#07070a] border border-white/[0.05] rounded-xl px-4 py-3.5 text-xs text-zinc-200 focus:outline-none focus:border-amber-500/40 font-medium transition-all appearance-none cursor-pointer"
                      >
                        <option value="4K UHD">4K ULTRA HD</option>
                        <option value="1080p">1080P PRO</option>
                        <option value="Remux">BLU-RAY REMUX</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-amber-500/60 text-[10px] font-mono">▼</div>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-[9px] font-mono tracking-widest text-zinc-500 font-bold uppercase block">
                  {formMode === "request" ? "SUPPLEMENTARY PARAMETERS" : "FEEDBACK MANIFEST RECORD"}
                </label>
                <textarea 
                  name="message" required={formMode === "feedback"} rows={3} value={formData.message} onChange={handleChange}
                  placeholder={formMode === "request" ? "Specify tracking links, alternative naming, or specific launch seasons..." : "Provide precise user experience feedback parameters..."}
                  className="w-full bg-[#07070a] border border-white/[0.05] rounded-xl px-4 py-3.5 text-xs text-zinc-200 placeholder-zinc-800 focus:outline-none focus:border-amber-500/40 resize-none transition-all"
                />
              </div>

              <button
                type="submit" disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500/10 via-amber-500/[0.15] to-amber-500/10 border border-amber-500/30 hover:border-amber-400 hover:bg-amber-500/20 text-amber-400 font-bold tracking-widest text-[10px] uppercase py-4 rounded-xl transition-all duration-300 disabled:opacity-50 font-mono group"
              >
                {isSubmitting ? (
                  <span className="animate-pulse tracking-[0.2em] text-amber-300">TRANSMITTING PACKETS...</span>
                ) : (
                  <>
                    <Send size={11} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    <span>BROADCAST ENCRYPTED MANIFEST</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Embedded Single-Line Minimal Contact Footer */}
      <div className="w-full max-w-xl flex items-center justify-between px-2 font-mono text-[8px] text-zinc-600 tracking-widest uppercase">
        <div className="flex items-center gap-1.5">
          <ShieldCheck size={10} className="text-amber-500/40" />
          <span>Secured Terminal End</span>
        </div>
        <div>Uplink Status: Nominal</div>
      </div>
    </div>
  );
}