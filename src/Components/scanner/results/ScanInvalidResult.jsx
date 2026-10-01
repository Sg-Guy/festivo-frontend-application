import React from "react";
import { X, RotateCcw } from "lucide-react";

export default function ScanInvalidResult({ onRetry }) {
  return (
    <div className="flex flex-col items-center text-center space-y-6 pt-6">
      {/* Icône Cercle Rouge */}
      <div className="w-32 h-32 rounded-full border-4 border-[#FCA5A5] bg-[#FEE2E2] flex items-center justify-center shadow-sm">
        <X className="w-16 h-16 text-[#EF4444] stroke-[3]" />
      </div>

      {/* Textes principaux */}
      <div className="space-y-3">
        <h1 className="text-3xl font-black tracking-widest text-[#EF4444] uppercase">
          Invalide
        </h1>
        <p className="text-sm text-gray-600 max-w-[280px] mx-auto leading-relaxed">
          Ce QR code n'est pas reconnu ou appartient à un autre événement.
        </p>
      </div>

      {/* Bouton Réessayer */}
      <button
        onClick={onRetry}
        className="w-full py-4 bg-gray-900 hover:bg-black text-white rounded-2xl font-semibold flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.98] mt-8"
      >
        <RotateCcw size={18} />
        Réessayer
      </button>
    </div>
  );
}