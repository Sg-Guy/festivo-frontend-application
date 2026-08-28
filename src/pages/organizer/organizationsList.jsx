import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Building2, Plus, Eye, Edit, Archive, Phone, Mail } from "lucide-react";
import { useOrg } from "../../hooks/useOrg";
import Spinner from "../../Components/ui/Spinner";
import { ROUTES } from "../../constants/routes";

export default function OrganizationList() {
  const {
    data: organizations,
    isLoading: isOrgLoading,
    isError,
    error,
  } = useOrg();

  if (isOrgLoading) {
    return (
      <div className="flex flex-row justify-center align-items-center text-center py-10">
        <Spinner size={18} className="text-center"/>
        <p className="text-center">Chargement en cours...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-10 text-red-500">
        Erreur lors du chargement :
        {error.response?.data?.message || "Une erreur est survenue."}
      </div>
    );
  }

  const orgs = organizations ?? [];

  const handleArchive = (id) => {
    // Logique d'archivage
    setOrganizations(organizations.filter((org) => org.id !== id));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 sm:py-12">
      {/* En-tête avec bouton de création */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-[var(--dark-text)]">
            Mes Organisations
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Gérez vos structures et les membres associés à vos événements.
          </p>
        </div>
        <Link
          to={`${ROUTES.CREATE_ORGANIZATION}`}
          className="inline-flex items-center justify-center space-x-2 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition shadow-lg shadow-orange-600/20"
        >
          <Plus size={18} />
          <span>Nouvelle organisation</span>
        </Link>
      </div>

      {/* Liste des organisations en grille */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {orgs.map((org) => (
          <div
            key={org.id}
            className="bg-white dark:bg-[var(--dark-background)] border border-gray-200 dark:border-[var(--dark-border)] rounded-3xl p-6 shadow-xl shadow-gray-100 dark:shadow-none flex flex-col justify-between transition hover:border-[var(--primary)]/50"
          >
            <div>
              <div className="flex justify-end space-between">
                <span className="text-sm">{org.members_count} Membres</span>
                <span className="text-sm">{org.events_count} Evenements</span>
              </div>
              <div className="flex items-start space-x-4 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-orange-100 dark:bg-orange-950 flex items-center justify-center text-[var(--primary)] font-bold text-lg flex-shrink-0">
                  <Building2 size={24} />
                </div>
                <div className="overflow-hidden">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-[var(--dark-text)] truncate">
                    {org.name}
                  </h3>
                  <p className="text-xs text-gray-400 line-clamp-2 mt-0.5">
                    {org.description || "Aucune description fournie."}
                  </p>
                </div>
              </div>

              <div className="space-y-2 mb-6 text-xs text-gray-600 dark:text-gray-300">
                {org.email && (
                  <div className="flex items-center space-x-2">
                    <Mail size={14} className="text-gray-400" />
                    <span>{org.email}</span>
                  </div>
                )}
                {org.organization_phone && (
                  <div className="flex items-center space-x-2">
                    <Phone size={14} className="text-gray-400" />
                    <span>{org.organization_phone}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 dark:border-[var(--dark-border)] flex items-center justify-between">
              <Link
                to={`/organizations/${org.id}`}
                className="inline-flex items-center space-x-1.5 text-xs font-semibold text-[var(--primary)] hover:underline"
              >
                <Eye size={16} />
                <span>Voir</span>
              </Link>

              <div className="flex items-center space-x-3">
                <Link
                  to={`/organizations/${org.id}/edit`}
                  className="p-2 rounded-xl text-gray-500 hover:bg-gray-100 dark:hover:bg-[var(--dark-surface)] transition"
                  title="Modifier"
                >
                  <Edit size={16} />
                </Link>
                <button
                  onClick={() => handleArchive(org.id)}
                  className="p-2 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition"
                  title="Archiver"
                >
                  <Archive size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
