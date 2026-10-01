import React, { useState } from "react";
import OrganizationMembers from "../../../Components/ui/OrganizationMembers";
import {
  useOrganizationMembers,
} from "../../../hooks/useMembers";
import Modal from "../../../Components/ui/Modal";
import Input from "../../../Components/ui/Input";
import Button from "../../../Components/ui/Button";

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
      <div className="p-4 bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 rounded-2xl text-xs font-semibold">
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
            <Button
              type="button"
              variant="outline"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
              className="w-auto px-3 py-1.5 rounded-lg"
            >
              Précédent
            </Button>
            <Button
              type="button"
              variant="outline"
              disabled={currentPage === response.meta.last_page}
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className="w-auto px-3 py-1.5 rounded-lg"
            >
              Suivant
            </Button>
          </div>
        </div>
      )}
      
    </div>
  );
}