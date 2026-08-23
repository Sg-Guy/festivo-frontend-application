import React from "react";
import { Link } from "react-router-dom";
import { Zap, Home, ArrowLeft } from "lucide-react";
import { ROUTES } from "../constants/routes";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[var(--dark-background)] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 transition-colors duration-200">
      
      {/* Logo */}
      <div className="mb-8 text-center">
        <Link to={ROUTES.HOME} className="inline-flex items-center space-x-2">
          <div className="bg-[var(--primary)] p-2 rounded-xl text-white shadow-md shadow-orange-600/25">
            <Zap size={22} />
          </div>
          <span className="font-extrabold text-2xl tracking-wider text-gray-900 dark:text-[var(--dark-text)]">
            FESTIVO
          </span>
        </Link>
      </div>

      {/* Carte d'erreur */}
      <div className="max-w-md w-full bg-white dark:bg-[var(--dark-surface)] p-8 sm:p-10 rounded-2xl shadow-xl border border-gray-100 dark:border-[var(--dark-border)] text-center transition-colors duration-200">
        
        {/* Code 404 stylisé */}
        <div className="text-7xl sm:text-8xl font-black text-[var(--primary)] tracking-tight mb-4">
          404
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-[var(--dark-text)] mb-3">
          Page introuvable
        </h1>

        <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
          Oups ! La page que vous recherchez semble avoir été déplacée, supprimée ou n'existe pas.
        </p>

        {/* Boutons d'action */}
        <div className="flex flex-col sm:flex-row items-center gap-3 justify-center">
          <button
            onClick={() => window.history.back()}
            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-gray-100 dark:bg-[var(--dark-surface-soft)] text-gray-700 dark:text-gray-200 font-medium hover:bg-gray-200 dark:hover:bg-gray-800 transition flex items-center justify-center space-x-2 text-sm"
          >
            <ArrowLeft size={16} />
            <span>Retour</span>
          </button>

          <Link
            to={ROUTES.HOME}
            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white font-semibold transition shadow-lg shadow-orange-600/20 flex items-center justify-center space-x-2 text-sm"
          >
            <Home size={16} />
            <span>Accueil</span>
          </Link>
        </div>

      </div>

      {/* Petit texte de bas de page */}
      <p className="mt-8 text-xs text-gray-400 dark:text-gray-500">
        Besoin d'aide ? Contactez le support Festivo.
      </p>

    </div>
  );
}