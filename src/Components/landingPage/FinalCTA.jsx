import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

export function FinalCTA() {
  return (
    <section id="get-started" className="w-full py-20 px-4 sm:px-6 festivo-pattern-bg theme-transition text-center">
      <div className="max-w-4xl mx-auto p-8 sm:p-14 rounded-3xl bg-surface border border-border shadow-xl backdrop-blur-md relative overflow-hidden">
        
        {/* Élément décoratif subtil en arrière-plan de la carte */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-accent-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Petit badge d'accroche */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-soft border border-border text-text-secondary text-xs font-semibold mb-6">
          <Sparkles size={14} className="text-primary-500" />
          <span>Passez à l'action dès aujourd'hui</span>
        </div>

        {/* Titre principal */}
        <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-text mb-4 leading-tight">
          Prêt à vendre vos <br className="hidden sm:inline" />
          <span className="text-primary-500">premiers billets</span> ?
        </h2>

        {/* Description */}
        <p className="text-text-secondary text-base sm:text-lg max-w-xl mx-auto mb-8 leading-relaxed">
          Rejoignez des centaines d'organisateurs au Bénin et en Afrique de l'Ouest qui font confiance à FESTIVO.
        </p>

        {/* Bouton d'action principal */}
        <a
          href="#register"
          className="inline-flex items-center space-x-3 bg-primary-500 hover:bg-primary-600 text-white font-bold px-8 py-4 rounded-2xl transition-all duration-200 shadow-lg shadow-primary-500/25 hover:scale-[1.02] group mb-6 text-base"
        >
          <span className="text-white">Créer mon compte gratuitement</span>
          <ArrowRight size={18} className="transform group-hover:translate-x-1.5 transition-transform text-white" />
        </a>

        <div className="text-xs sm:text-sm text-text-muted font-medium">
          Gratuit pour commencer <span className="mx-2">•</span> Aucune carte requise <span className="mx-2">•</span> Setup en 2 minutes
        </div>

      </div>
    </section>
  );
}