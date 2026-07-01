import React, { useState } from 'react';
import { Send, CheckCircle2, MessageSquare, ShieldCheck } from 'lucide-react';

import { addMovieRequest } from '../api/api';

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await addMovieRequest({
        name: formData.name,
        email: formData.email,
        type: formMode,
        movieTitle: formData.movieTitle,
        quality: formData.quality,
        message: formData.message,
        status: "Pending"
      });

      if (!response.success) {
        alert(response.message);
        setIsSubmitting(false);
        return;
      }

      setIsSubmitting(false);
      setIsSent(true);

      setFormData({
        name: "",
        email: "",
        movieTitle: "",
        quality: "4K UHD",
        message: ""
      });

      setTimeout(() => setIsSent(false), 5000);

    } catch (err) {
      console.error(err);
      alert("Unable to submit request.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex flex-col justify-between items-center py-4 animate-in fade-in zoom-in-95 duration-500">

      <div className="flex-1 flex items-center justify-center w-full my-6">
        <div className="w-full max-w-xl bg-gradient-to-b from-[#0e0c07] to-[#040406] border border-amber-500/20 p-8 md:p-10 rounded-3xl shadow-[0_0_60px_rgba(245,158,11,0.03)] relative overflow-hidden group">

          {/* Top Border Highlights */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />
          <div className="absolute top-0 left-6 right-6 h-[8px] bg-amber-400/[0.02] blur-sm rounded-full" />

          <div className="absolute top-3 left-4 text-[7px] font-mono tracking-[0.3em] text-amber-500/40 font-bold uppercase">
            GET IN TOUCH
          </div>

          <header className="space-y-3 mb-8 text-center relative z-10">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/10 to-yellow-500/5 border border-amber-500/30 text-amber-400 text-[10px] font-mono px-3 py-1 rounded-full uppercase tracking-widest mb-1 shadow-[0_0_15px_rgba(245,158,11,0.05)]">
              <MessageSquare size={10} className="text-amber-400" />
              Support & Requests Desk
            </div>
            <h2 className="text-2xl font-black tracking-tight bg-gradient-to-b from-zinc-100 via-amber-100 to-amber-400/70 bg-clip-text text-transparent uppercase font-sans">
              Contact & Request
            </h2>
            <p className="text-zinc-500 text-xs max-w-sm mx-auto leading-relaxed">
              Request missing movies, suggest new platform features, or report system bugs directly to the team.
            </p>
          </header>

          {isSent ? (
            <div className="py-14 flex flex-col items-center text-center space-y-4 animate-in fade-in duration-400">
              <div className="h-14 w-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.1)]">
                <CheckCircle2 className="text-amber-400 w-6 h-6" />
              </div>
              <div className="space-y-1.5">
                <h4 className="text-xs font-mono font-bold text-amber-400 tracking-widest uppercase">Message Sent Successfully</h4>
                <p className="text-[11px] text-zinc-400 max-w-xs mx-auto leading-relaxed">
                  Thank you! Your submission has been received and added to our priority processing queue.
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">

              {/* Form Select Option */}
              <div className="space-y-1.5">
                <label className="text-[9px] font-mono tracking-widest text-amber-400/80 font-bold uppercase block">Inquiry Type</label>
                <div className="relative">
                  <select
                    value={formMode}
                    onChange={(e) => setFormMode(e.target.value)}
                    className="w-full bg-[#07070a] border border-white/[0.05] rounded-xl px-4 py-3.5 text-xs text-zinc-200 focus:outline-none focus:border-amber-500/40 font-medium transition-all appearance-none cursor-pointer group-hover:border-white/[0.08]"
                  >
                    <option value="request">Request a Missing Movie</option>
                    <option value="feedback">Send Platform Feedback / Bug Report</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-amber-500/60 text-[10px] font-mono">▼</div>
                </div>
              </div>

              {/* Identity Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[9px] font-mono tracking-widest text-zinc-500 font-bold uppercase block">Your Name</label>
                  <input
                    type="text" name="name" required value={formData.name} onChange={handleChange} placeholder="e.g., John Doe"
                    className="w-full bg-[#07070a] border border-white/[0.05] rounded-xl px-4 py-3.5 text-xs text-zinc-200 placeholder-zinc-800 focus:outline-none focus:border-amber-500/40 transition-all group-hover:border-white/[0.08]"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[9px] font-mono tracking-widest text-zinc-500 font-bold uppercase block">Email Address</label>
                  <input
                    type="email" name="email" required value={formData.email} onChange={handleChange} placeholder="name@domain.com"
                    className="w-full bg-[#07070a] border border-white/[0.05] rounded-xl px-4 py-3.5 text-xs text-zinc-200 placeholder-zinc-800 focus:outline-none focus:border-amber-500/40 transition-all group-hover:border-white/[0.08]"
                  />
                </div>
              </div>

              {/* Dynamic Conditional Movie Inputs */}
              {formMode === "request" && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 animate-in slide-in-from-top-2 duration-300">
                  <div className="sm:col-span-2 space-y-1.5">
                    <label className="text-[9px] font-mono tracking-widest text-zinc-500 font-bold uppercase block">Movie Title</label>
                    <input
                      type="text" name="movieTitle" required={formMode === "request"} value={formData.movieTitle} onChange={handleChange} placeholder="e.g., Interstellar"
                      className="w-full bg-[#07070a] border border-white/[0.05] rounded-xl px-4 py-3.5 text-xs text-zinc-200 placeholder-zinc-800 focus:outline-none focus:border-amber-500/40 transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-mono tracking-widest text-zinc-500 font-bold uppercase block">Preferred Quality</label>
                    <div className="relative">
                      <select
                        name="quality" value={formData.quality} onChange={handleChange}
                        className="w-full bg-[#07070a] border border-white/[0.05] rounded-xl px-4 py-3.5 text-xs text-zinc-200 focus:outline-none focus:border-amber-500/40 font-medium transition-all appearance-none cursor-pointer"
                      >
                        <option value="4K UHD">4K Ultra HD</option>
                        <option value="1080p">1080p Full HD</option>
                        <option value="Remux">Blu-Ray Remux</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-amber-500/60 text-[10px] font-mono">▼</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Descriptive Area */}
              <div className="space-y-1.5">
                <label className="text-[9px] font-mono tracking-widest text-zinc-500 font-bold uppercase block">
                  {formMode === "request" ? "Additional Notes (Optional)" : "Message / Bug Description"}
                </label>
                <textarea
                  name="message" required={formMode === "feedback"} rows={3} value={formData.message} onChange={handleChange}
                  placeholder={formMode === "request" ? "Provide context like release year, specific directors, or alternative titles..." : "Please describe the problem or feature recommendation..."}
                  className="w-full bg-[#07070a] border border-white/[0.05] rounded-xl px-4 py-3.5 text-xs text-zinc-200 placeholder-zinc-800 focus:outline-none focus:border-amber-500/40 resize-none transition-all"
                />
              </div>

              {/* Interactive Submit Button */}
              <button
                type="submit" disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500/10 via-amber-500/[0.15] to-amber-500/10 border border-amber-500/30 hover:border-amber-400 hover:bg-amber-500/20 text-amber-400 font-bold tracking-widest text-[10px] uppercase py-4 rounded-xl transition-all duration-300 disabled:opacity-50 font-mono group"
              >
                {isSubmitting ? (
                  <span className="animate-pulse tracking-[0.2em] text-amber-300">Sending Form Data...</span>
                ) : (
                  <>
                    <Send size={11} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    <span>Submit Message</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Minimalistic Secured Footer Line */}
      <div className="w-full max-w-xl flex items-center justify-between px-2 font-mono text-[8px] text-zinc-600 tracking-widest uppercase">
        <div className="flex items-center gap-1.5">
          <ShieldCheck size={10} className="text-amber-500/40" />
          <span>Secured Terminal End</span>
        </div>
        <div>Status: Active</div>
      </div>
    </div>
  );
}