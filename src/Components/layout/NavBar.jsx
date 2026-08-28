import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { Sun, Moon, Menu, X, Zap, User } from "lucide-react";
import Button from "../ui/Button";
import { useLogout } from "../../hooks/useAuth";
import UserDropdown from "../ui/UserDropDown";
import { ROUTES } from "../../constants/routes";

export default function NavBar() {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { mutate: logout, isPending } = useLogout();

  const isAuthenticated = localStorage.getItem("token") ? true : false;

  return (
    <header className="relative w-full py-4 px-4 sm:px-6 flex items-center justify-between border-b border-gray-200 dark:border-[var(--dark-border)] bg-white/80 dark:bg-[var(--dark-background)]/80 backdrop-blur-md sticky top-0 z-50 transition-colors duration-200">
      {/* Logo vers l'accueil */}
      <Link to="/" className="flex items-center space-x-2">
        <div className="bg-[var(--primary)] p-2 rounded-xl text-white shadow-md shadow-orange-600/25">
          <Zap size={20} />
        </div>
        <span className="font-extrabold text-lg sm:text-xl tracking-wider text-gray-900 dark:text-[var(--dark-text)]">
          FESTIVO
        </span>
      </Link>

      {/* Navigation desktop */}
      <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-600 dark:text-gray-300">
        <a href="#features" className="hover:text-[var(--primary)] transition">
          Fonctionnalités
        </a>
        <a href="#pricing" className="hover:text-[var(--primary)] transition">
          Tarifs
        </a>
        <a href="#events" className="hover:text-[var(--primary)] transition">
          Événements
        </a>
      </nav>

      {/* Actions */}
      <div className="flex items-center space-x-3 sm:space-x-4">
        <button
          onClick={toggleTheme}
          aria-label="Changer de thème"
          title="Changer de thème"
          className="p-2.5 rounded-full bg-gray-100 dark:bg-[var(--dark-surface)] text-[var(--primary)] hover:bg-gray-200 dark:hover:bg-[var(--dark-surface-soft)] transition shadow-sm"
        >
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {!isAuthenticated ? (
          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* Lien vers la page de Connexion */}
            <Link
              to={ROUTES.LOGIN}
              className="hidden sm:inline text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-[var(--primary)] transition"
            >
              Connexion
            </Link>

            {/* Lien vers la page d'Inscription */}
            <Link
              to={ROUTES.REGISTER}
              className="bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white text-xs sm:text-sm font-semibold px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl transition shadow-lg shadow-orange-600/20 whitespace-nowrap"
            >
              Commencer
            </Link>
          </div>
        ) : (
          /* UserDropdown visible partout, y compris sur mobile */
          <UserDropdown />
        )}

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Ouvrir le menu"
          className="md:hidden p-2 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[var(--dark-surface)] transition"
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Menu mobile (pour les liens de navigation du site) */}
      <div
        className={`absolute top-full left-0 w-full bg-white dark:bg-[var(--dark-background)] border-b border-gray-200 dark:border-[var(--dark-border)] shadow-2xl py-6 px-6 flex flex-col space-y-4 md:hidden transition-all duration-300 ease-in-out transform origin-top ${mobileMenuOpen ? "opacity-100 scale-y-100 translate-y-0 pointer-events-auto" : "opacity-0 scale-y-95 -translate-y-2 pointer-events-none"}`}
      >
        <a
          href="#features"
          onClick={() => setMobileMenuOpen(false)}
          className="text-gray-700 dark:text-gray-300 hover:text-[var(--primary)] font-medium transition py-1"
        >
          Fonctionnalités
        </a>
        <a
          href="#pricing"
          onClick={() => setMobileMenuOpen(false)}
          className="text-gray-700 dark:text-gray-300 hover:text-[var(--primary)] font-medium transition py-1"
        >
          Tarifs
        </a>
        <a
          href="#events"
          onClick={() => setMobileMenuOpen(false)}
          className="text-gray-700 dark:text-gray-300 hover:text-[var(--primary)] font-medium transition py-1"
        >
          Événements
        </a>

        {!isAuthenticated && (
          <div className="pt-3 border-t border-gray-200 dark:border-[var(--dark-border)] flex flex-col space-y-3">
            <Link
              to={ROUTES.LOGIN}
              onClick={() => setMobileMenuOpen(false)}
              className="text-center py-2 text-gray-700 dark:text-gray-300 font-medium hover:text-[var(--primary)] transition"
            >
              Connexion
            </Link>
            <Link
              to={ROUTES.REGISTER}
              onClick={() => setMobileMenuOpen(false)}
              className="text-center bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white font-semibold py-2.5 rounded-xl transition"
            >
              Commencer
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
