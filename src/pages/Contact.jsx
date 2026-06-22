import React, { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';

export default function Contact() {
  const [formMode, setFormMode] = useState("request"); // "request" or "feedback"
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    movieTitle: "",
    quality: "1080p",
    message: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulated Mail Transport Hook (Integrate EmailJS / Formspree here later)
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
      setFormData({ name: "", email: "", movieTitle: "", quality: "1080p", message: "" });
      
      // Clear success notification after a brief period
      setTimeout(() => setIsSent(false), 5000);
    }, 1500);
  };

  return (
    <div className="max-w-xl mx-auto space-y-10 animate-in fade-in duration-500">
      <header className="space-y-2">
        <h2 className="text-xs font-black tracking-[0.3em] text-amber-500 uppercase">COMMUNICATION NODE</h2>
        <p className="text-zinc-400 text-sm">Request unindexed archival media or dispatch system core feedback.</p>
      </header>

      {isSent ? (
        <div className="p-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 flex flex-col items-center text-center space-y-3">
          <CheckCircle className="text-emerald-400 w-8 h-8 animate-bounce" />
          <h4 className="text-sm font-bold text-zinc-200 uppercase tracking-wider">TRANSMISSION SECURED</h4>
          <p className="text-xs text-zinc-400 max-w-xs">Your dispatch has successfully routed to the Galactopia operational desk.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6 bg-[#0c0c12]/40 border border-white/[0.04] p-6 rounded-2xl relative overflow-hidden">
          
          {/* Form Mode Selector */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">TRANSMISSION PURPOSE</label>
            <select 
              value={formMode}
              onChange={(e) => setFormMode(e.target.value)}
              className="w-full bg-[#09090d] border border-white/[0.06] rounded-xl px-4 py-3 text-xs tracking-wide text-zinc-200 focus:outline-none focus:border-amber-500/30 font-medium"
            >
              <option value="request">REQUEST UNINDEXED MOVIE</option>
              <option value="feedback">SUBMIT SYSTEM FEEDBACK</option>
            </select>
          </div>

          {/* Identity Credentials */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">YOUR NAME</label>
              <input 
                type="text" 
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Agent Name"
                className="w-full bg-[#09090d] border border-white/[0.06] rounded-xl px-4 py-3 text-xs tracking-wide text-zinc-200 placeholder-zinc-700 focus:outline-none focus:border-amber-500/30"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">EMAIL ADDRESS</label>
              <input 
                type="email" 
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="name@domain.com"
                className="w-full bg-[#09090d] border border-white/[0.06] rounded-xl px-4 py-3 text-xs tracking-wide text-zinc-200 placeholder-zinc-700 focus:outline-none focus:border-amber-500/30"
              />
            </div>
          </div>

          {/* Conditional Fields: Only reveals if Mode is "Request" */}
          {formMode === "request" && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 animate-in slide-in-from-top-2 duration-300">
              <div className="sm:col-span-2 space-y-1.5">
                <label className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">MOVIE REQUIRED</label>
                <input 
                  type="text" 
                  name="movieTitle"
                  required={formMode === "request"}
                  value={formData.movieTitle}
                  onChange={handleChange}
                  placeholder="e.g. Interstellar"
                  className="w-full bg-[#09090d] border border-white/[0.06] rounded-xl px-4 py-3 text-xs tracking-wide text-zinc-200 placeholder-zinc-700 focus:outline-none focus:border-amber-500/30"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">TARGET QUALITY</label>
                <select 
                  name="quality"
                  value={formData.quality}
                  onChange={handleChange}
                  className="w-full bg-[#09090d] border border-white/[0.06] rounded-xl px-4 py-3 text-xs tracking-wide text-zinc-200 focus:outline-none focus:border-amber-500/30 font-medium"
                >
                  <option value="4K UHD">4K UHD</option>
                  <option value="1080p">1080P Bluray</option>
                  <option value="720p">720P Standard</option>
                </select>
              </div>
            </div>
          )}

          {/* Feedback Matrix Field */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">
              {formMode === "request" ? "ADDITIONAL METADATA / FEEDBACK (OPTIONAL)" : "FEEDBACK MESSAGE"}
            </label>
            <textarea 
              name="message"
              required={formMode === "feedback"}
              rows={4}
              value={formData.message}
              onChange={handleChange}
              placeholder={formMode === "request" ? "Any context about the missing title or general system thoughts..." : "Type your detailed feedback here..."}
              className="w-full bg-[#09090d] border border-white/[0.06] rounded-xl px-4 py-3 text-xs tracking-wide text-zinc-200 placeholder-zinc-700 focus:outline-none focus:border-amber-500/30 resize-none"
            />
          </div>

          {/* Submission Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 bg-amber-500/10 border border-amber-500/20 hover:bg-amber-500/20 text-amber-400 font-bold tracking-widest text-[10px] uppercase py-3.5 rounded-xl transition-all duration-300 disabled:opacity-50 font-mono"
          >
            {isSubmitting ? (
              <span className="animate-pulse">ENGAGING TRANSPORT STREAM...</span>
            ) : (
              <>
                <Send size={12} />
                <span>EXECUTE DISPATCH</span>
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}