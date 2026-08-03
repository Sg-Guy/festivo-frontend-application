import React from 'react';
import { ArrowRight, Zap } from 'lucide-react';

export function FinalCTA() {
  return (
    <section id="get-started" className="w-full py-20 px-4 sm:px-6 bg-white dark:bg-[#0d0f17] text-center transition-colors duration-200">
      <div className="max-w-4xl mx-auto p-8 sm:p-12 rounded-3xl bg-gray-50 dark:bg-[#131622] border border-gray-200 dark:border-gray-800 shadow-2xl">
        <h2 className="text-3xl sm:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
          Prêt à vendre vos <br /> premiers billets ?
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg mb-8">
          Rejoignez des centaines d'organisateurs au Bénin qui font confiance à FESTIVO.
        </p>
        <a
          href="#register"
          className="inline-flex items-center space-x-2 bg-orange-600 hover:bg-orange-700 text-white font-semibold px-8 py-4 rounded-xl transition shadow-xl shadow-orange-600/25 group mb-4"
        >
          <span>Créer mon compte gratuitement</span>
          <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform" />
        </a>
        <div className="text-xs text-gray-500 dark:text-gray-400">
          Gratuit pour commencer · Aucune carte requise
        </div>
      </div>
    </section>
  );
}
