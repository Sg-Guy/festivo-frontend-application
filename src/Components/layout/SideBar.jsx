import React from "react";
import { Link } from "react-router-dom";
import { X, Zap, LogIn, UserPlus, LogOut } from "lucide-react";
import SidebarItem from "./SidebarItem";
import { NAVIGATION_CONFIG } from "../../config/navigationConfig";
import { useLogout } from "../../hooks/useAuth";
import { ROUTES } from "../../constants/routes";
import { ROLES } from "../../constants/roles";
import OrganizationSwitcher from "../ui/OrganizationSwitcher";

export default function Sidebar({ isOpen, onClose, user }) {
  const { mutate: logout, isPending } = useLogout();

  const rawRole = user?.roles?.[0]?.name || "PARTICIPANT";
  const userRole = rawRole ? rawRole.toUpperCase() : "GUEST";

  // Récupération de la liste des menus correspondante
  const menuItems = NAVIGATION_CONFIG[userRole] || NAVIGATION_CONFIG.GUEST;

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity duration-300"
          aria-hidden="true"
        />
      )}

      {/* Panneau de la Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-white dark:bg-[var(--dark-background)] border-r border-gray-200 dark:border-[var(--dark-border)] shadow-2xl z-50 flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* En-tête de la Sidebar */}
        <div className="p-5 flex items-center justify-between border-b border-gray-100 dark:border-[var(--dark-border)]">
          <Link
            to="/"
            onClick={onClose}
            className="flex items-center space-x-2"
          >
            <div className="bg-[var(--primary)] p-2 rounded-xl text-white shadow-md shadow-orange-600/25">
              <Zap size={20} />
            </div>
            <span className="font-extrabold text-lg tracking-wider text-gray-900 dark:text-[var(--dark-text)]">
              FESTIVO
            </span>
          </Link>
          <button
            onClick={onClose}
            aria-label="Fermer le menu"
            className="p-2 rounded-xl text-gray-500 hover:bg-gray-100 dark:hover:bg-[var(--dark-surface)] transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* SÉLECTEUR D'ORGANISATION (Placé ici, hors de la zone scrollable pour éviter toute coupure du menu) */}
        {user && userRole === "ORGANIZER" && (
          <div className="px-4 pt-4 pb-2 border-b border-gray-100 dark:border-[var(--dark-border)]">
            <p className="px-1 text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">
              Espace {userRole}
            </p>
            <OrganizationSwitcher />
          </div>
        )}

        {/* Corps de navigation dynamique selon le rôle */}
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-1">
          {!user && (
            <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Menu principal
            </p>
          )}

          {menuItems.map((item, index) => (
            <SidebarItem
              key={index}
              icon={item.icon}
              title={item.title}
              to={item.to}
              onClick={onClose}
            />
          ))}
        </div>

        {/* Pied de la Sidebar  */}
        <div className="p-4 border-t border-gray-100 dark:border-[var(--dark-border)] bg-gray-50/50 dark:bg-[var(--dark-surface-soft)]">
          {!user ? (
            <div className="space-y-2">
              <SidebarItem
                icon={LogIn}
                title="Connexion"
                to={ROUTES.LOGIN}
                onClick={onClose}
              />
              <SidebarItem
                icon={UserPlus}
                title="Commencer"
                to={ROUTES.REGISTER}
                onClick={onClose}
                variant="primary"
              />
            </div>
          ) : (
            <div className="space-y-3">
              {/* Infos rapides utilisateur */}
              <div className="flex items-center space-x-3 px-2 py-1">
                <div className="w-10 h-10 rounded-2xl bg-orange-100 dark:bg-orange-950 flex items-center justify-center text-[var(--primary)] font-bold text-sm overflow-hidden shrink-0">
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt="Avatar"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span>
                      {user.firstname?.[0]}
                      {user.lastname?.[0]}
                    </span>
                  )}
                </div>
                <div className="overflow-hidden">
                  <p className="text-sm font-bold text-gray-900 dark:text-[var(--dark-text)] truncate">
                    {user.firstname} {user.lastname}
                  </p>
                  <p className="text-xs text-gray-400 truncate">{user.email}</p>
                </div>
              </div>

              {/* Bouton Déconnexion */}
              <SidebarItem
                icon={LogOut}
                title={isPending ? "Déconnexion..." : "Déconnexion"}
                variant="danger"
                onClick={() => {
                  logout();
                  //onClose(); // Correction ici : appel de la fonction
                }}
              />
            </div>
          )}
        </div>
      </aside>
    </>
  );
}