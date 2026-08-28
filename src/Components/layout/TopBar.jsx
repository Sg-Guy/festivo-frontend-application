import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { Menu, Zap, Sun, Moon, Bell } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { ROUTES } from "../../constants/routes";
import { useProfile } from "../../hooks/useAuth";
import { useAuthStatus } from "../../hooks/useAuthStatus";
import Sidebar from "./SideBar";
import Footer from "./Footer";

export default function TopBar() {
  const { theme, toggleTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const user = useAuthStatus();


  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[var(--dark-background)] transition-colors duration-200">
      {/* Barre supérieure */}
      <header className="w-full py-4 px-4 sm:px-6 flex items-center justify-between border-b border-gray-200 dark:border-[var(--dark-border)] bg-white/80 dark:bg-[var(--dark-background)]/80 backdrop-blur-md sticky top-0 z-40 transition-colors duration-200">
        
        {/* Partie Gauche */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setSidebarOpen(true)}
            aria-label="Ouvrir le menu"
            className={`p-2 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[var(--dark-surface)] transition ${
              user ? "" : "md:hidden"
            }`}
          >
            <Menu size={22} />
          </button>

          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-[var(--primary)] p-2 rounded-xl text-white shadow-md shadow-orange-600/25">
              <Zap size={18} />
            </div>
            <span className="font-extrabold text-lg sm:text-xl tracking-wider text-gray-900 dark:text-[var(--dark-text)]">
              FESTIVO
            </span>
          </Link>
        </div>

        {/* Navigation Desktop (Affichée uniquement en mode Guest sur PC) */}
        {!user && (
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
        )}

        {/* Partie Droite : Actions */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          <button
            onClick={toggleTheme}
            aria-label="Changer de thème"
            title="Changer de thème"
            className="p-2.5 rounded-full bg-gray-100 dark:bg-[var(--dark-surface)] text-[var(--primary)] hover:bg-gray-200 dark:hover:bg-[var(--dark-surface-soft)] transition shadow-sm"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Si Guest ,  boutons Connexion / Commencer directement sur grand écran */}
          {!user ? (
            <div className="hidden sm:flex items-center space-x-3">
              <Link
                to={ROUTES.LOGIN}
                className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-[var(--primary)] transition px-3 py-2"
              >
                Connexion
              </Link>
              <Link
                to={ROUTES.REGISTER}
                className="bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-xl transition shadow-lg shadow-orange-600/20"
              >
                Commencer
              </Link>
            </div>
          ) : (
            /* Si Connecté : Icône de notifications */
            <button
              aria-label="Notifications"
              title="Notifications"
              className="relative p-2.5 rounded-full bg-gray-100 dark:bg-[var(--dark-surface)] text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-[var(--dark-surface-soft)] transition shadow-sm"
            >
              <Bell size={18} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-[var(--primary)] rounded-full ring-2 ring-white dark:ring-[var(--dark-background)]" />
            </button>
          )}
        </div>
      </header>

      {/* Intégration de la Sidebar dynamique */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} user={user} />

      {/* Contenu principal de la page */}
      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}