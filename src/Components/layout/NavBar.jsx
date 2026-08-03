import React, { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { Sun, Moon, Menu, X, Zap } from "lucide-react";

export default function NavBar() {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="w-full py-4 px-4 sm:px-6 flex items-center justify-between border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-[#0d0f17]/80 backdrop-blur-md sticky top-0 z-50 transition-colors duration-200">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <div className="bg-orange-500 p-2 rounded-xl text-white shadow-md shadow-orange-500/25">
          <Zap size={20} />
        </div>
        <span className="font-extrabold text-lg sm:text-xl tracking-wider text-gray-900 dark:text-white">
          FESTIVO
        </span>
      </div>

      {/* Liens de navigation (Desktop) */}
      <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-600 dark:text-gray-300">
        <a
          href="#features"
          className="hover:text-orange-500 dark:hover:text-orange-500 transition"
        >
          Fonctionnalités
        </a>
        <a
          href="#pricing"
          className="hover:text-orange-500 dark:hover:text-orange-500 transition"
        >
          Tarifs
        </a>
        <a
          href="#events"
          className="hover:text-orange-500 dark:hover:text-orange-500 transition"
        >
          Événements
        </a>
      </nav>

      {/* Actions de droite (Toujours visibles : Bouton Thème figé + CTA + Menu Mobile) */}
      <div className="flex items-center space-x-3 sm:space-x-4">
        {/* Bouton de changement de thème (Figé, visible sur tous les écrans) */}
        <button
          onClick={toggleTheme}
          aria-label="Changer de thème"
          title="Changer de thème"
          className="p-2.5 rounded-full bg-gray-100 dark:bg-gray-800 text-orange-500 dark:text-orange-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition shadow-sm"
        >
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* Connexion (Masqué sur très petits écrans) */}
        <a
          href="#login"
          className="hidden sm:inline text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-white transition"
        >
          Connexion
        </a>

        {/* Bouton Commencer */}
        <a
          href="#get-started"
          className="bg-orange-600 hover:bg-orange-700 text-white text-xs sm:text-sm font-semibold px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl transition shadow-lg shadow-orange-600/20 whitespace-nowrap"
        >
          Commencer
        </a>

        {/* Bouton Menu Hamburger (Mobile uniquement) */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Ouvrir le menu"
          className="md:hidden p-2 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Menu Mobile déroulant avec animation fluide */}
      <div
        className={`absolute top-full left-0 w-full bg-white dark:bg-[#0d0f17] border-b border-gray-200 dark:border-gray-800 shadow-2xl py-6 px-6 flex flex-col space-y-4 md:hidden transition-all duration-300 ease-in-out transform origin-top ${
          mobileMenuOpen
            ? "opacity-100 scale-y-100 translate-y-0 pointer-events-auto"
            : "opacity-0 scale-y-95 -translate-y-2 pointer-events-none"
        }`}
      >
        <a
          href="#features"
          onClick={() => setMobileMenuOpen(false)}
          className="text-gray-700 dark:text-gray-300 hover:text-orange-500 font-medium transition py-1"
        >
          Fonctionnalités
        </a>
        <a
          href="#pricing"
          onClick={() => setMobileMenuOpen(false)}
          className="text-gray-700 dark:text-gray-300 hover:text-orange-500 font-medium transition py-1"
        >
          Tarifs
        </a>
        <a
          href="#events"
          onClick={() => setMobileMenuOpen(false)}
          className="text-gray-700 dark:text-gray-300 hover:text-orange-500 font-medium transition py-1"
        >
          Événements
        </a>
        <a
          href="#faq"
          onClick={() => setMobileMenuOpen(false)}
          className="text-gray-700 dark:text-gray-300 hover:text-orange-500 font-medium transition py-1"
        >
          FAQ
        </a>
        <div className="pt-3 border-t border-gray-200 dark:border-gray-800 flex flex-col space-y-3">
          <a
            href="#login"
            onClick={() => setMobileMenuOpen(false)}
            className="text-center py-2 text-gray-700 dark:text-gray-300 font-medium hover:text-orange-500 transition"
          >
            Connexion
          </a>
        </div>
      </div>
    </header>
  );
}
