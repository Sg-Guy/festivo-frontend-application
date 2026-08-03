import React from 'react';

export default function BentoModal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={onClose} />
      
      <div className="relative w-full max-w-md rounded-2xl bg-slate-900 p-5 text-slate-100 border-2 border-amber-500/20 shadow-[0_0_50px_-12px_rgba(245,158,11,0.2)] animate-in zoom-in-105 duration-150">
        
        {/* En-tête avec titre dynamique */}
        <div className="flex items-center gap-3 text-amber-400 mb-5">
          <div className="rounded-xl bg-amber-500/10 p-2.5 border border-amber-500/20">
            ⚡
          </div>
          <div>
            <h3 className="font-bold text-lg leading-tight">{title}</h3>
            <p className="text-xs text-slate-400">Information système</p>
          </div>
        </div>

        {/* Section d'information Bento dynamique */}
        <div className="rounded-xl bg-slate-950 p-4 border border-slate-800 my-4 text-sm text-slate-300 leading-relaxed">
          {children}
        </div>

        {/* Bouton de fermeture unique */}
        <button onClick={onClose} className="w-full mt-4 rounded-xl bg-amber-500 py-3 text-sm font-bold text-slate-950 hover:bg-amber-400 transition shadow-lg shadow-amber-500/10">
          Quitter
        </button>
      </div>
    </div>
  );
}
