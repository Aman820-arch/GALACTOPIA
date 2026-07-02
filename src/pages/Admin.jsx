import React, { useState, useEffect } from "react";
import { Shield, Check, X, AlertCircle, Film, User, Clock } from "lucide-react";

export default function Admin({
  wishlist = [],
  setWishlist,
  setTrendingMovies,
  setSearchResults,
}) {
  // LOAD LOGS DIRECTLY FROM LOCALSTORAGE SO THEY NEVER DISAPPEAR
  const [logs, setLogs] = useState(() => {
    try {
      const savedLogs = localStorage.getItem("adminSystemLogs");
      return savedLogs
        ? JSON.parse(savedLogs)
        : [
          {
            id: 1,
            type: "SECURITY",
            message: "Admin core session initialized",
            time: "SYSTEM START",
          },
          {
            id: 2,
            type: "DATABASE",
            message:
              "Synced system collections from local storage memory pools",
            time: "INITIALIZED",
          },
        ];
    } catch (err) {
      console.error("Failed reading system logs cache:", err);
      return [];
    }
  });

  // AUTO-SAVE LOGS REGISTRY EVERY TIME A NEW ENTRY IS APPENDED
  useEffect(() => {
    localStorage.setItem("adminSystemLogs", JSON.stringify(logs));
  }, [logs]);

  const handleAction = (id, action, title) => {
    const targetRequest = wishlist.find((req) => req.id === id);

    // 1. Remove from the pending requests list queue
    setWishlist((prev) => prev.filter((req) => req.id !== id));

    // 2. If approved, construct a uniform movie object and inject it straight into global catalog states
    if (action === "APPROVE" && targetRequest) {
      const newCatalogItem = {
        id: targetRequest.id,
        title: targetRequest.title,
        tags: "★ 5.0 (USER REQ)",
        year: targetRequest.year || "2026",
        rating: "5.0",
        overview:
          "This title was submitted via client-side custom request matrix and authorized directly by system administration.",
        poster: null,
        color: "from-zinc-800/40 via-zinc-900/5 to-transparent",
      };

      if (setTrendingMovies)
        setTrendingMovies((prev) => [newCatalogItem, ...prev]);
      if (setSearchResults)
        setSearchResults((prev) => [newCatalogItem, ...prev]);
    }

    // Get the current local clock time for the system log timestamp
    const timestamp = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    // 3. Log the operation details inside the system console panel
    setLogs((prev) => [
      {
        id: Date.now(),
        type: action === "APPROVE" ? "CATALOG" : "REJECT",
        message: `${action === "APPROVE" ? "Approved & Indexed" : "Rejected"} request for "${title.toUpperCase()}"`,
        time: timestamp,
      },
      ...prev,
    ]);
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-500 pb-20 pt-4 select-none">
      {/* HEADER SYSTEM INDICATOR */}
      <header className="flex items-center gap-4 border-b border-white/[0.04] pb-8">
        <div className="p-3 bg-zinc-800/50 border border-zinc-700 rounded-2xl text-zinc-300">
          <Shield size={24} />
        </div>
        <div className="space-y-1">
          <h2 className="text-xs font-black tracking-[0.3em] text-zinc-400 uppercase">
            CENTRAL CONTROL
          </h2>
          <h3 className="text-3xl font-black tracking-tight text-white uppercase">
            ADMIN PANEL
          </h3>
        </div>
      </header>

      {/* METRICS OVERVIEW CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="border border-white/[0.05] bg-white/[0.01] p-6 rounded-2xl space-y-2">
          <div className="flex justify-between text-zinc-500 font-mono text-[10px] tracking-wider uppercase">
            <span>Pending Requests</span>
            <Film size={12} />
          </div>
          <p className="text-3xl font-black text-white">{wishlist.length}</p>
        </div>
        <div className="border border-white/[0.05] bg-white/[0.01] p-6 rounded-2xl space-y-2">
          <div className="flex justify-between text-zinc-500 font-mono text-[10px] tracking-wider uppercase">
            <span>System Node</span>
            <Shield size={12} />
          </div>
          <p className="text-3xl font-black text-zinc-400 font-mono">ONLINE</p>
        </div>
        <div className="border border-white/[0.05] bg-white/[0.01] p-6 rounded-2xl space-y-2">
          <div className="flex justify-between text-zinc-500 font-mono text-[10px] tracking-wider uppercase">
            <span>Active Managers</span>
            <User size={12} />
          </div>
          <p className="text-3xl font-black text-white">1</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT/CENTER: INCOMING REQUEST MANAGER */}
        <div className="lg:col-span-2 space-y-4">
          <h4 className="font-mono text-[10px] tracking-widest text-zinc-400 uppercase font-bold">
            INCOMING CONTENT REQUEST CACHE
          </h4>

          {wishlist.length === 0 ? (
            <div className="border border-dashed border-white/[0.05] rounded-2xl p-12 text-center bg-white/[0.005] flex flex-col items-center justify-center space-y-3">
              <AlertCircle size={24} className="text-zinc-700" />
              <p className="text-zinc-500 font-mono text-[10px] tracking-wider uppercase">
                NO PENDING USER SELECTIONS SUBMITTED
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {wishlist.map((req) => (
                <div
                  key={req.id}
                  className="border border-white/[0.05] bg-white/[0.01] backdrop-blur-md p-5 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-all hover:border-zinc-700"
                >
                  <div className="space-y-1">
                    <h5 className="text-sm font-bold text-white uppercase tracking-wide">
                      {req.title}
                    </h5>
                    <p className="text-[10px] font-mono text-zinc-500 uppercase">
                      {req.tag || "CUSTOM REQUEST"}{" "}
                      {req.year ? `• ${req.year}` : ""}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button
                      onClick={() => handleAction(req.id, "APPROVE", req.title)}
                      className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 bg-zinc-200 hover:bg-white text-zinc-900 font-mono text-[9px] font-bold tracking-widest uppercase rounded-lg transition-all"
                    >
                      <Check size={10} strokeWidth={3} /> APPROVE
                    </button>
                    <button
                      onClick={() => handleAction(req.id, "REJECT", req.title)}
                      className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 border border-zinc-800 hover:bg-red-950/20 hover:border-red-900/50 text-zinc-400 hover:text-red-400 font-mono text-[9px] tracking-widest uppercase rounded-lg transition-all"
                    >
                      <X size={10} /> IGNORE
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT SIDEBAR: SYSTEM EVENT LOGS */}
        <div className="space-y-4">
          <h4 className="font-mono text-[10px] tracking-widest text-zinc-400 uppercase font-bold">
            SYSTEM EVENT LOG
          </h4>
          <div className="border border-white/[0.03] rounded-2xl bg-white/[0.005] p-4 font-mono text-[10px] space-y-4 max-h-[350px] overflow-y-auto">
            {logs.map((log) => (
              <div
                key={log.id}
                className="flex gap-3 items-start border-b border-white/[0.02] pb-3 last:border-0 last:pb-0"
              >
                <Clock
                  size={12}
                  className="text-zinc-600 mt-0.5 flex-shrink-0"
                />
                <div className="space-y-0.5">
                  <p className="text-zinc-300 leading-normal">
                    <span
                      className={`font-bold mr-1.5 ${log.type === "CATALOG"
                          ? "text-emerald-400"
                          : log.type === "REJECT"
                            ? "text-red-400"
                            : "text-zinc-500"
                        }`}
                    >
                      [{log.type}]
                    </span>
                    {log.message}
                  </p>
                  <span className="text-zinc-600 font-bold block text-[9px]">
                    {log.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}