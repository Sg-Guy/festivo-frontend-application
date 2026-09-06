import { ArrowRight, Compass, Ticket, Smartphone, CheckCircle2 } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { Link } from "react-router-dom";

// Motif décoratif — évoque les "yeux" de repérage d'un QR code, non scannable
const qrPattern = [
  1, 1, 0, 1, 1,
  1, 0, 0, 0, 1,
  0, 0, 1, 0, 0,
  1, 0, 0, 0, 1,
  1, 1, 0, 1, 1,
];

export default function HeroSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      className="
        relative w-full overflow-hidden
        px-4 sm:px-6
        pt-14 pb-20 lg:pt-20 lg:pb-28
        bg-[var(--background-soft)]
        dark:bg-[var(--dark-background)]
        transition-colors duration-200
      "
    >
      {/* Halo d'ambiance — visible uniquement sur grand écran */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute -top-24 right-[-8%]
          hidden lg:block
          h-[36rem] w-[36rem] rounded-full
          bg-gradient-to-br from-[var(--primary)]/20 via-orange-400/10 to-transparent
          blur-3xl
        "
      />

      <div
        className="
          relative mx-auto max-w-7xl
          lg:grid lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16
        "
      >
        {/* ---------- Colonne texte ---------- */}
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="
              inline-flex items-center space-x-2
              px-3.5 py-1.5 mb-8
              rounded-full
              bg-[var(--primary-soft)]
              border border-[var(--primary-border)]
              text-[var(--primary)]
              text-xs sm:text-sm font-medium
              shadow-sm
            "
          >
            <span className="w-2 h-2 rounded-full bg-[var(--primary)] animate-pulse" />
            <span>312 événements actifs au Bénin</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="
              max-w-xl lg:max-w-none
              text-4xl sm:text-6xl lg:text-6xl xl:text-7xl
              font-extrabold tracking-tight leading-[1.08]
              text-[var(--text)] dark:text-[var(--dark-text)]
              mb-6
            "
          >
            Vendez vos billets.
            <br />
            <span
              className="
                bg-gradient-to-r from-[var(--primary)] via-orange-500 to-amber-500
                bg-clip-text text-transparent
              "
            >
              Vivez l'événement.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="
              max-w-xl
              text-base sm:text-lg
              text-[var(--text-secondary)] dark:text-[var(--dark-text-secondary)]
              mb-10 leading-relaxed
            "
          >
            FESTIVO connecte organisateurs et festivaliers&nbsp;: encaissez via Mobile
            Money et scannez hors-ligne à l'entrée, ou trouvez votre prochaine sortie
            en un instant.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-5 w-full sm:w-auto"
          >
            <div className="flex flex-col items-center sm:items-start gap-1.5">
              <span className="text-xs font-medium text-[var(--text-secondary)] dark:text-[var(--dark-text-secondary)]">
                Vous organisez&nbsp;?
              </span>
              <a
                href="#create"
                className="
                  w-full sm:w-auto flex items-center justify-center space-x-2
                  bg-[var(--primary)] hover:bg-[var(--primary-hover)]
                  text-white font-semibold
                  px-6 py-3.5 rounded-xl
                  transition-all duration-200
                  shadow-xl shadow-[var(--primary-shadow)]
                  group
                "
              >
                <span>Créer mon événement</span>
                <ArrowRight
                  size={18}
                  className="transform group-hover:translate-x-1 transition-transform"
                />
              </a>
            </div>

            <div className="flex flex-col items-center sm:items-start gap-1.5">
              <span className="text-xs font-medium text-[var(--text-secondary)] dark:text-[var(--dark-text-secondary)]">
                Vous participez&nbsp;?
              </span>
              <Link
                to="/events"
                className="
                  w-full sm:w-auto flex items-center justify-center space-x-2
                  bg-[var(--surface-soft)] hover:bg-gray-200
                  dark:bg-[var(--dark-surface)] dark:hover:bg-[var(--dark-surface-soft)]
                  text-[var(--text)] dark:text-[var(--dark-text)]
                  font-semibold
                  px-6 py-3.5 rounded-xl
                  border border-[var(--border)] dark:border-[var(--dark-border)]
                  transition-all duration-200
                "
              >
                <Compass size={18} className="text-[var(--primary)]" />
                <span>Trouver un événement</span>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* ---------- Colonne visuelle — grand écran uniquement ---------- */}
        <div className="hidden lg:flex relative h-[30rem] items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -6 }}
            animate={{ opacity: 1, scale: 1, rotate: -4 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="relative w-72"
          >
            <motion.div
              animate={prefersReducedMotion ? {} : { y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="
                relative rounded-2xl overflow-hidden
                bg-white dark:bg-[var(--dark-surface)]
                border border-[var(--border)] dark:border-[var(--dark-border)]
                shadow-2xl
              "
            >
              {/* En-tête billet */}
              <div className="px-5 pt-5 pb-4 bg-gradient-to-r from-[var(--primary)] to-amber-500 text-white">
                <p className="text-[11px] uppercase tracking-wider opacity-80">
                  Festival Kora Nocturne
                </p>
                <p className="text-lg font-bold mt-0.5">Cotonou · 14 Sept</p>
              </div>

              {/* Perforation */}
              <div className="relative flex items-center px-5">
                <div className="absolute -left-2 w-4 h-4 rounded-full bg-[var(--background-soft)] dark:bg-[var(--dark-background)]" />
                <div className="absolute -right-2 w-4 h-4 rounded-full bg-[var(--background-soft)] dark:bg-[var(--dark-background)]" />
                <div className="w-full border-t border-dashed border-[var(--border)] dark:border-[var(--dark-border)]" />
              </div>

              {/* QR + infos */}
              <div className="p-5 flex items-center gap-4">
                <div
                  className="
                    relative w-20 h-20 rounded-lg overflow-hidden
                    bg-white dark:bg-[var(--dark-surface)]
                    border border-[var(--border)] dark:border-[var(--dark-border)]
                    grid grid-cols-5 grid-rows-5 gap-[2px] p-2
                  "
                >
                  {qrPattern.map((on, i) => (
                    <span
                      key={i}
                      className={`rounded-[1px] ${
                        on ? "bg-[var(--text)] dark:bg-[var(--dark-text)]" : "bg-transparent"
                      }`}
                    />
                  ))}
                  {!prefersReducedMotion && (
                    <motion.span
                      animate={{ top: ["6%", "94%", "6%"] }}
                      transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute left-0 right-0 h-[2px] bg-[var(--primary)]"
                    />
                  )}
                </div>
                <div>
                  <p className="text-sm font-semibold text-[var(--text)] dark:text-[var(--dark-text)]">
                    Billet Standard
                  </p>
                  <p className="text-xs text-[var(--text-secondary)] dark:text-[var(--dark-text-secondary)]">
                    Scan hors-ligne activé
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Chip organisateur */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="
              absolute top-4 right-2
              flex items-center gap-2
              px-3.5 py-2.5 rounded-xl
              bg-white dark:bg-[var(--dark-surface)]
              border border-[var(--border)] dark:border-[var(--dark-border)]
              shadow-lg
            "
          >
            <Ticket size={16} className="text-[var(--primary)]" />
            <div className="text-left">
              <p className="text-sm font-bold text-[var(--text)] dark:text-[var(--dark-text)]">
                1 240
              </p>
              <p className="text-[11px] text-[var(--text-secondary)] dark:text-[var(--dark-text-secondary)]">
                billets vendus
              </p>
            </div>
          </motion.div>

          {/* Chip paiement */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.75 }}
            className="
              absolute bottom-8 left-0
              flex items-center gap-2
              px-3.5 py-2.5 rounded-xl
              bg-white dark:bg-[var(--dark-surface)]
              border border-[var(--border)] dark:border-[var(--dark-border)]
              shadow-lg
            "
          >
            <Smartphone size={16} className="text-[var(--primary)]" />
            <div className="text-left">
              <p className="text-sm font-bold text-[var(--text)] dark:text-[var(--dark-text)] flex items-center gap-1">
                Mobile Money <CheckCircle2 size={13} className="text-emerald-500" />
              </p>
              <p className="text-[11px] text-[var(--text-secondary)] dark:text-[var(--dark-text-secondary)]">
                paiement confirmé
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}