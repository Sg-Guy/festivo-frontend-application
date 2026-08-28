import React, { useState, useRef } from "react";
import {
  User,
  ChevronDown,
  Settings,
  LogOut,
  LayoutDashboard,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { navigateTo } from "../../utils/navigation";
import { useLogout } from "../../hooks/useAuth";

export default function UserDropdown() {

const {mutate: logout , isPending} = useLogout();
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef(null);

  // Gestion du survol pour PC (Hover)
  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 150); // Petit délai pour éviter que le menu ne se ferme trop vite si la souris bouge légèrement
  };

  return (
    <div
      className="relative inline-block text-left"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Bouton déclencheur avec Icône + Texte / Avatar + Flèche */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-gray-100 dark:bg-[var(--dark-surface)] text-sm font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-[var(--dark-surface-soft)] transition border border-gray-200/50 dark:border-[var(--dark-border)]"
      >
        <div className="w-6 h-6 rounded-full bg-orange-100 dark:bg-orange-950 flex items-center justify-center text-[var(--primary)]">
          <User size={14} />
        </div>
        <span className="text- hidden md:block">Profil</span>
        <ChevronDown
          size={16}
          className={`text-gray-500 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {/* Menu Déroulant (Dropdown Content) */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white dark:bg-[var(--dark-surface)] shadow-xl border border-gray-100 dark:border-[var(--dark-border)] py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
          {/* En-tête du menu (optionnel, pour rappeler l'utilisateur) */}
          <div className="px-4 py-2 border-b border-gray-100 dark:border-[var(--dark-border)]">

            <div className="inline-flex items-center space-x-2">
              <span className=" w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs text-gray-400">Connnecté en tant que</span>
            </div>
            <p className="ml-4 text-sm font-bold text-gray-900 dark:text-[var(--dark-text)] truncate">
              Kofi Mensah
            </p>
          </div>

          {/* Liens et éléments à l'intérieur (Tu peux y ajouter ce que tu veux) */}
          <div className="py-1">
            <Link
              to={ROUTES.PROFILE}
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-[var(--dark-surface-soft)] transition"
            >
              <User size={16} className="text-gray-400" />
              <span>Mon profil</span>
            </Link>

            <Link
              to="/dashboard"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-[var(--dark-surface-soft)] transition"
            >
              <LayoutDashboard size={16} className="text-gray-400" />
              <span>Tableau de bord</span>
            </Link>

            <Link
              to="/settings"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-[var(--dark-surface-soft)] transition"
            >
              <Settings size={16} className="text-gray-400" />
              <span>Paramètres</span>
            </Link>
          </div>

          {/* Bouton de déconnexion */}
          <div className="pt-1 border-t border-gray-100 dark:border-[var(--dark-border)]">
            <button
              onClick={() => {
                setIsOpen(false);
                logout();
              }}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition text-left"
            >
              <LogOut size={16} />
              <span>Déconnexion</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
