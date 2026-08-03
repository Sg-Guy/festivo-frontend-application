import React from 'react';

export default function GlassModal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Clic en dehors pour fermer */}
      <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-md" onClick={onClose} />
      
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-slate-950/70 p-6 text-white shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in-95 duration-200">
        
        {/* Lueur d'ambiance */}
        <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-indigo-500/20 blur-2xl" />

        {/* En-tête dynamique */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <h3 className="text-xl font-bold tracking-wide bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent">
            {title}
          </h3>
          <button onClick={onClose} className="rounded-lg p-1 hover:bg-white/10 text-slate-400 hover:text-white transition">
            ✕
          </button>
        </div>

        {/* Corps dynamique */}
        <div className="my-6 space-y-3 text-sm text-slate-300 leading-relaxed">
          {children}
        </div>

        {/* Actions avec bouton fermer intégré */}
        <div className="flex justify-end gap-3 border-t border-white/10 pt-4">
          <button onClick={onClose} className="rounded-xl bg-gradient-to-r from-indigo-500 to-pink-500 px-5 py-2.5 text-sm font-semibold shadow-lg shadow-indigo-500/25 hover:opacity-90 transition">
            Fermer la fenêtre
          </button>
        </div>
      </div>
    </div>
  );
}
