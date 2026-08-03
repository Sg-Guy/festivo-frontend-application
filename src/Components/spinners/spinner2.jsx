import React from 'react';

export function CyberpunkDna() {
  return (
    <div className="relative flex items-center justify-center w-20 h-20">
      {/* Orbite 1 : Sens horaire rapide */}
      <div className="absolute inset-0 rounded-full border-2 border-t-emerald-400 border-b-transparent border-l-transparent border-r-transparent animate-spin [animation-duration:0.8s]" />
      
      {/* Orbite 2 : Sens anti-horaire plus lent */}
      <div className="absolute inset-2 rounded-full border-2 border-t-transparent border-b-fuchsia-500 border-l-transparent border-r-transparent animate-spin [animation-direction:reverse] [animation-duration:1.2s]" />
      
      {/* Points en suspension quantique */}
      <div className="absolute flex space-x-1 justify-center items-center">
        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce [animation-delay:-0.3s]" />
        <div className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce [animation-delay:-0.15s]" />
        <div className="w-2 h-2 rounded-full bg-fuchsia-500 animate-bounce" />
      </div>
    </div>
  );
}
