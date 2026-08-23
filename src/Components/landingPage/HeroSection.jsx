import { ArrowRight, Compass } from "lucide-react";
import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section
      className="
        relative w-full
        pt-12 pb-20 px-4 sm:px-6
        flex flex-col items-center text-center
        overflow-hidden
        bg-[var(--background-soft)]
        dark:bg-[var(--dark-background)]
        transition-colors duration-200
      "
    >
      {/* Badge événements actifs */}
      <div
        className="
          inline-flex items-center space-x-2
          px-3.5 py-1.5
          rounded-full
          bg-[var(--primary-soft)]
          border border-[var(--primary-border)]
          text-[var(--primary)]
          text-xs sm:text-sm
          font-medium
          mb-8
          shadow-sm
        "
      >
        <span
          className="
            w-2 h-2
            rounded-full
            bg-[var(--primary)]
            animate-pulse
          "
        />

        <span>312 événements actifs au Bénin</span>
      </div>

      {/* Grand titre */}
      <h1
        className="
          max-w-4xl
          text-4xl sm:text-6xl lg:text-7xl
          font-extrabold
          tracking-tight
          text-[var(--text)]
          dark:text-[var(--dark-text)]
          leading-[1.1]
          mb-6
        "
      >
        La billetterie
        <br className="hidden sm:inline" />

        événementielle

        <br className="hidden sm:inline" />

        <span
          className="
            bg-gradient-to-r
            from-[var(--primary)]
            via-orange-500
            to-amber-500
            bg-clip-text
            text-transparent
          "
        >
          intelligente
        </span>
      </h1>

      {/* Sous-titre */}
      <p
        className="
          max-w-2xl
          text-base sm:text-lg
          text-[var(--text-secondary)]
          dark:text-[var(--dark-text-secondary)]
          mb-10
          leading-relaxed
        "
      >
        Vendez vos billets, encaissez via Mobile Money, scannez hors-ligne.{" "}
        <br className="hidden sm:inline" />
        FESTIVO est la plateforme pensée pour l'Afrique de l'Ouest.
      </p>

      {/* Boutons d'action */}
      <div
        className="
          flex flex-col sm:flex-row
          items-center justify-center
          gap-4
          w-full sm:w-auto
        "
      >
        {/* CTA principal */}
        <a
          href="#create"
          className="
            w-full sm:w-auto
            flex items-center justify-center
            space-x-2

            bg-[var(--primary)]
            hover:bg-[var(--primary-hover)]

            text-white
            font-semibold

            px-6 py-3.5
            rounded-xl

            transition-all duration-200

            shadow-xl
            shadow-[var(--primary-shadow)]

            group
          "
        >
          <span>Créer mon premier événement</span>

          <ArrowRight
            size={18}
            className="
              transform
              group-hover:translate-x-1
              transition-transform
            "
          />
        </a>

        {/* CTA secondaire */}
        <Link 
              to="/events" 
              className="
            w-full sm:w-auto
            flex items-center justify-center
            space-x-2

            bg-[var(--surface-soft)]
            hover:bg-gray-200

            dark:bg-[var(--dark-surface)]
            dark:hover:bg-[var(--dark-surface-soft)]

            text-[var(--text)]
            dark:text-[var(--dark-text)]

            font-semibold

            px-6 py-3.5
            rounded-xl

            border
            border-[var(--border)]
            dark:border-[var(--dark-border)]

            transition-all duration-200"
            >
              <Compass
            size={18}
            className="text-[var(--primary)]"
          />

          <span>Découvrir les événements</span>
            </Link>
      </div>
    </section>
  );
}