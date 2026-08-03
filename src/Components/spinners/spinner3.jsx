import React from 'react';

export function NeonEclipse() {
  return (
    <div className="relative flex items-center justify-center w-20 h-20">
      {/* Le fond conique qui tourne */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-400 via-orange-500 to-rose-600 animate-spin [animation-duration:1.5s]" />
      
      {/* Masque central pour l'effet d'éclipse */}
      <div className="absolute inset-[3px] rounded-full bg-slate-900 shadow-inner flex items-center justify-center">
        {/* Lueur interne */}
        <div className="w-full h-full rounded-full bg-amber-500/5 animate-pulse" />
      </div>
      
      {/* Texte de chargement minimaliste au centre */}
      <span className="absolute text-[10px] font-mono tracking-widest text-amber-400 uppercase font-bold animate-pulse">
        Sync
      </span>
    </div>
  );
}
