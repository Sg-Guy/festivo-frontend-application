import React from 'react';

export function CosmicVortex() {
  return (
    <div className="relative flex items-center justify-center w-24 h-24">
      {/* Anneau extérieur lumineux en rotation */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 animate-spin opacity-80 blur-[2px]" />
      
      {/* Deuxième anneau inversé pour masquer et créer le vortex */}
      <div className="absolute inset-1 rounded-full bg-slate-950 flex items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-gradient-to-bl from-cyan-400 to-fuchsia-500 animate-pulse opacity-40 blur-md" />
      </div>
      
      {/* Cœur central dynamique */}
      <div className="absolute w-4 h-4 rounded-full bg-white shadow-[0_0_15px_#ffffff] animate-ping" />
      <div className="absolute w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]" />
    </div>
  );
}
