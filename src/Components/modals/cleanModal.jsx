import React from 'react';

export default function CleanModal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-zinc-900/40 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-lg rounded-3xl bg-white p-8 text-zinc-900 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] animate-in fade-in slide-in-from-bottom-8 duration-300">
        
        <div className="space-y-2">
          <span className="text-xs font-bold tracking-widest text-emerald-600 uppercase">Notification</span>
          {/* Titre dynamique */}
          <h3 className="text-2xl font-semibold tracking-tight text-zinc-950">
            {title}
          </h3>
        </div>

        {/* Corps dynamique */}
        <div className="my-6 text-sm text-zinc-600 leading-relaxed">
          {children}
        </div>

        {/* Pied de page avec bouton fermer */}
        <div className="flex justify-end pt-2">
          <button onClick={onClose} className="rounded-xl bg-zinc-950 px-6 py-3 text-sm font-medium text-white hover:bg-zinc-800 transition shadow-sm">
            Compris, fermer
          </button>
        </div>
      </div>
    </div>
  );
}
