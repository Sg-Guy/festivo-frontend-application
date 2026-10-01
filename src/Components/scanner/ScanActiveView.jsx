import React from "react";
import { QrCode, Wifi, Users } from "lucide-react";

export default function ScanActiveView({ eventTitle, elementId, onSimulate }) {
  return (
    <div className="flex flex-col space-y-6 relative min-h-[75vh] pb-12">
      
      {/* 1. En-tête de la page Scanner */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Scanner</h1>
          <p className="text-xs text-gray-500 font-medium mt-0.5">
            {eventTitle || "Afrobeats Night Cotonou Vol.3"}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-xs font-semibold text-gray-700 shadow-sm hover:bg-gray-50 transition">
            Historique
          </button>

          <div className="flex items-center gap-1 px-3 py-1.5 bg-[#D1F3E2] text-[#0F5132] rounded-full text-xs font-bold shadow-sm">
            <Wifi size={12} className="stroke-[2.5]" />
            <span>En ligne</span>
          </div>
        </div>
      </div>

      {/* 2. Zone de la caméra avec le lecteur Html5Qrcode et l'animation de balayage */}
      <div className="relative w-full aspect-square max-w-[300px] mx-auto rounded-3xl overflow-hidden bg-black border border-gray-100 shadow-sm flex items-center justify-center">
        
        {/* Conteneur cible pour la caméra */}
        <div id={elementId} className="absolute inset-0 w-full h-full z-0 object-cover" />

        {/* 🌟 Ligne orange en va-et-vient (balayage vertical en boucle) */}
        <div className="absolute inset-x-4 z-10 pointer-events-none overflow-hidden h-full flex items-center">
          <div className="w-full h-0.5 bg-orange-500 shadow-[0_0_10px_#f97316] animate-scan-laser" />
        </div>

        {/* Coins oranges du design Figma (par-dessus le flux vidéo) */}
        <div className="absolute inset-4 z-25 pointer-events-none">
          <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-orange-500 rounded-tl-xl" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-orange-500 rounded-tr-xl" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-orange-500 rounded-bl-xl" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-orange-500 rounded-br-xl" />
        </div>
      </div>

      {/* 3. Section simulation */}
      <div className="space-y-2 text-center pt-1">
        <p className="text-xs text-gray-400 font-medium">Simuler un scan :</p>
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => onSimulate("valid")}
            className="px-4 py-2.5 bg-[#D1F3E2] text-[#0F5132] text-xs font-bold rounded-2xl shadow-sm hover:opacity-90 transition active:scale-95"
          >
            ✓ Valide
          </button>
          <button
            onClick={() => onSimulate("already_used")}
            className="px-4 py-2.5 bg-[#FEF3D6] text-[#856404] text-xs font-bold rounded-2xl shadow-sm hover:opacity-90 transition active:scale-95"
          >
            ↻ Déjà utilisé
          </button>
        </div>
        <div className="flex justify-center">
          <button
            onClick={() => onSimulate("invalid")}
            className="px-6 py-2.5 bg-[#FCE8E6] text-[#A71D2A] text-xs font-bold rounded-2xl shadow-sm hover:opacity-90 transition active:scale-95"
          >
            ✕ Invalide
          </button>
        </div>
      </div>

      {/* 4. Input de saisie manuelle */}
      <div className="relative pt-1">
        <div className="absolute inset-y-0 left-4 top-1 flex items-center pointer-events-none text-gray-400">
          <QrCode size={18} />
        </div>
        <input
          type="text"
          placeholder="Saisie manuelle du code"
          className="w-full pl-11 pr-4 py-3.5 bg-gray-50/80 border border-gray-200/80 rounded-2xl text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all shadow-inner"
        />
      </div>

      {/* 5. Bouton flottant orange en bas à droite */}
      <div className="fixed bottom-6 right-6 z-50">
        <button className="w-14 h-14 bg-gradient-to-tr from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white rounded-full flex items-center justify-center shadow-lg shadow-orange-500/30 transition-transform active:scale-95">
          <Users size={24} />
        </button>
      </div>

    </div>
  );
}