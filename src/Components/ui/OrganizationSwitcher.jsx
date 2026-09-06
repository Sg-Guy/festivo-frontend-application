import React, { useState, useEffect, useRef } from "react";
import { Building2, ChevronDown, Check, Plus, Settings } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useOrg } from "../../hooks/useOrg";
import { useOrganizationStore } from "../../store/useOrganizationStore";
import { navigateTo } from "../../utils/navigation";
import { ROUTES } from "../../constants/routes";

export default function OrganizationSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const { data: organizations, isLoading } = useOrg();
  const { activeOrganization, setActiveOrganization } = useOrganizationStore();
  const queryClient = useQueryClient();

  // S'il n'y a pas d'organisation active par défaut, on sélectionne la première de la liste
  useEffect(() => {
    if (organizations && organizations.length > 0 && !activeOrganization) {
      setActiveOrganization(organizations[0]);
    }
  }, [organizations, activeOrganization, setActiveOrganization]);

  // Fermer le dropdown si on clique en dehors
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (org) => {
    setActiveOrganization(org);
    setIsOpen(false);

    // Invalider les requêtes dépendantes de l'organisation pour rafraîchir l'écran instantanément
    queryClient.invalidateQueries({ queryKey: ["organizer-events"] });
    queryClient.invalidateQueries({ queryKey: ["dashboard"] });

    toast.success(`Espace basculé : ${org.name}`);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bouton principal de l'organisation active */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-2.5 rounded-2xl bg-gray-50 dark:bg-[var(--dark-surface-soft)] border border-gray-200 dark:border-[var(--dark-border)] hover:border-[var(--primary)] transition text-left"
      >
        <div className="flex items-center space-x-2.5 overflow-hidden">
          <div className="w-9 h-9 rounded-xl bg-orange-100 dark:bg-orange-950 flex items-center justify-center text-[var(--primary)] shrink-0 font-bold">
            <Building2 size={18} />
          </div>
          <div className="overflow-hidden">
            <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">
              Organisation active
            </p>
            <p className="text-xs font-bold text-gray-900 dark:text-[var(--dark-text)] truncate">
              {activeOrganization?.name || "Chargement..."}
            </p>
          </div>
        </div>
        <ChevronDown
          size={16}
          className={`text-gray-400 transition-transform duration-200 shrink-0 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Menu Déroulant Popover */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-full mt-2 z-50 bg-white dark:bg-[var(--dark-surface)] rounded-2xl shadow-xl border border-gray-100 dark:border-[var(--dark-border)] p-2 space-y-1 animate-in fade-in zoom-in-95 duration-150">
          <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-gray-400">
            Vos organisations
          </div>

          <div className="max-h-48 overflow-y-auto space-y-0.5">
            {isLoading ? (
              <p className="text-xs text-center py-2 text-gray-400">Chargement...</p>
            ) : organizations?.length > 0 ? (
              organizations.map((org) => {
                const isActive = org.id === activeOrganization?.id;
                return (
                  <button
                    key={org.id}
                    onClick={() => handleSelect(org)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition ${
                      isActive
                        ? "bg-orange-50 dark:bg-orange-950/40 text-[var(--primary)]"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[var(--dark-surface-soft)]"
                    }`}
                  >
                    <span className="truncate">{org.name}</span>
                    {isActive && <Check size={14} className="text-[var(--primary)] shrink-0" />}
                  </button>
                );
              })
            ) : (
              <p className="text-xs text-center py-2 text-gray-400">Aucune organisation</p>
            )}
          </div>

          <div className="border-t border-gray-100 dark:border-[var(--dark-border)] pt-1 mt-1 space-y-0.5">
            <button
              onClick={() => {
                setIsOpen(false);
                navigateTo(ROUTES.CREATE_ORGANIZATION)
              }}
              className="w-full flex items-center space-x-2 px-3 py-2 rounded-xl text-xs font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[var(--dark-surface-soft)] transition"
            >
              <Plus size={14} />
              <span>Créer une organisation</span>
            </button>

            <button
              onClick={() => {
                setIsOpen(false);
                navigateTo(ROUTES.ORGANIZATIONS_LIST)
              }}
              className="w-full flex items-center space-x-2 px-3 py-2 rounded-xl text-xs font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[var(--dark-surface-soft)] transition"
            >
              <Settings size={14} />
              <span>Gérer les organisations</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}