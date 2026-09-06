import React, { useState } from "react";
import OrganizationMembers from "../../../Components/ui/OrganizationMembers";
import {
  useOrganizationMembers,
} from "../../../hooks/useMembers";
import Modal from "../../../Components/ui/Modal";
import Input from "../../../Components/ui/Input";

export default function MembersPage() {
  const [currentPage, setCurrentPage] = useState(1);

  // Appel du hook React Query
  const {
    data: response,
    isLoading,
    isError,
  } = useOrganizationMembers(currentPage);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-sm text-gray-400 animate-pulse">
          Chargement des membres...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4 bg-rose-50 text-rose-600 rounded-2xl text-xs font-semibold">
        Une erreur est survenue lors du chargement des membres.
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* On passe les données de l'API au composant tableau */}
      <OrganizationMembers membersData={response} />

      {/* Pagination simple basée sur le meta Laravel */}
      {response?.meta && response.meta.last_page > 1 && (
        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-[var(--dark-border)] text-xs">
          <span className="text-gray-400">
            Affichage de {response.meta.from} à {response.meta.to} sur{" "}
            {response.meta.total} membres
          </span>
          <div className="flex space-x-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
              className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-[var(--dark-border)] disabled:opacity-40 hover:bg-gray-50 transition"
            >
              Précédent
            </button>
            <button
              disabled={currentPage === response.meta.last_page}
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-[var(--dark-border)] disabled:opacity-40 hover:bg-gray-50 transition"
            >
              Suivant
            </button>
          </div>
        </div>
      )}
      
    </div>
  );
}
