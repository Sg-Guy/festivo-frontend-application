import React from 'react';
import { ArrowRight, Compass } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative w-full pt-12 pb-20 px-4 sm:px-6 flex flex-col items-center text-center overflow-hidden bg-white dark:bg-[#0d0f17] transition-colors duration-200">
      
      {/* Badge événements actifs */}
      <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-600 dark:text-orange-400 text-xs sm:text-sm font-medium mb-8 shadow-sm">
        <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
        <span>312 événements actifs au Bénin</span>
      </div>

      {/* Grand Titre avec typographie impactante et dégradé */}
      <h1 className="max-w-4xl text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-[1.1] mb-6">
        La billetterie <br className="hidden sm:inline" />
        <span className="bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-400 bg-clip-text text-transparent">
          événementielle intelligente
        </span>
      </h1>

      {/* Sous-titre */}
      <p className="max-w-2xl text-base sm:text-lg text-gray-600 dark:text-gray-400 mb-10 leading-relaxed">
        Vendez vos billets, encaissez via Mobile Money, scannez hors-ligne. <br className="hidden sm:inline" />
        FESTIVO est la plateforme pensée pour l'Afrique de l'Ouest.
      </p>

      {/* Boutons d'action principaux */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
        <a
          href="#create"
          className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-orange-600 hover:bg-orange-700 text-white font-semibold px-6 py-3.5 rounded-xl transition shadow-xl shadow-orange-600/25 group"
        >
          <span>Créer mon premier événement</span>
          <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform" />
        </a>

        <a
          href="#discover"
          className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800/80 dark:hover:bg-gray-800 text-gray-800 dark:text-gray-200 font-semibold px-6 py-3.5 rounded-xl border border-gray-200 dark:border-gray-700/60 transition"
        >
          <Compass size={18} className="text-orange-500" />
          <span>Découvrir les événements</span>
        </a>
      </div>

    </section>
  );
}