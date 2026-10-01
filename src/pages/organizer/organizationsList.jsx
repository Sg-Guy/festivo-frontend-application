import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Building2, Plus, Eye, Edit, Archive, Phone, Mail, Users, Calendar, AlertTriangle } from "lucide-react";
import { useOrg } from "../../hooks/useOrg";
import Spinner from "../../Components/ui/Spinner";
import { ROUTES } from "../../constants/routes";
import Modal from "../../Components/ui/Modal";
import Button from "../../Components/ui/Button";

export default function OrganizationList() {
  const {
    data: organizations,
    isLoading: isOrgLoading,
    isError,
    error,
  } = useOrg();

  // État local pour gérer la liste des organisations et la modale d'archivage
  const [orgsList, setOrgsList] = useState([]);
  const [orgToArchive, setOrgToArchive] = useState(null);
  const [isArchiveModalOpen, setIsArchiveModalOpen] = useState(false);

  // Synchronisation avec les données de l'API dès qu'elles changent
  useEffect(() => {
    if (organizations) {
      setOrgsList(organizations);
    }
  }, [organizations]);

  if (isOrgLoading) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-20 space-y-3">
        <Spinner size={24} className="text-[var(--primary)]" />
        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Chargement des organisations...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-md mx-auto mt-12 p-6 bg-rose-50 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900/50 rounded-2xl text-center">
        <p className="text-sm font-semibold text-rose-600 dark:text-rose-400">
          Erreur lors du chargement : {error?.response?.data?.message || "Une erreur est survenue."}
        </p>
      </div>
    );
  }

  const orgs = orgsList ?? [];

  // Ouvre la modale de confirmation pour une organisation spécifique
  const openArchiveModal = (org) => {
    setOrgToArchive(org);
    setIsArchiveModalOpen(true);
  };

  // Exécute l'archivage effectif après confirmation dans la modale
  const handleConfirmArchive = () => {
    if (orgToArchive) {
      setOrgsList(orgsList.filter((org) => org.id !== orgToArchive.id));
      setIsArchiveModalOpen(false);
      setOrgToArchive(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 sm:py-12">
      {/* En-tête avec bouton de création */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-[var(--dark-text)] tracking-tight">
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
          <Plus size={18} className="stroke-[3]" />
          <span>Nouvelle organisation</span>
        </Link>
      </div>

      {/* Liste des organisations en grille */}
      {orgs.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-[var(--dark-surface)] rounded-3xl border border-gray-100 dark:border-[var(--dark-border)] p-8 space-y-3">
          <div className="w-12 h-12 bg-orange-50 dark:bg-orange-950/30 text-[var(--primary)] rounded-2xl flex items-center justify-center mx-auto">
            <Building2 size={24} />
          </div>
          <h3 className="text-sm font-bold text-gray-900 dark:text-[var(--dark-text)]">Aucune organisation</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
            Vous n'avez pas encore créé d'organisation. Commencez par en créer une pour gérer vos événements.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {orgs.map((org) => (
            <div
              key={org.id}
              className="bg-white dark:bg-[var(--dark-surface)] border border-gray-200 dark:border-[var(--dark-border)] rounded-3xl p-6 shadow-xl shadow-gray-100 dark:shadow-none flex flex-col justify-between transition hover:border-[var(--primary)]/50"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-2xl bg-orange-100 dark:bg-orange-950/50 flex items-center justify-center text-[var(--primary)] font-bold text-lg flex-shrink-0">
                      <Building2 size={24} />
                    </div>
                    <div className="overflow-hidden">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-[var(--dark-text)] truncate">
                        {org.name}
                      </h3>
                      <p className="text-xs text-gray-400 line-clamp-1 mt-0.5">
                        {org.description || "Aucune description fournie."}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Badges statistiques */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-50 dark:bg-[var(--dark-surface-soft)] text-gray-600 dark:text-gray-300 rounded-xl text-xs font-semibold">
                    <Users size={14} className="text-gray-400" />
                    {org.members_count ?? 0} Membres
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-50 dark:bg-[var(--dark-surface-soft)] text-gray-600 dark:text-gray-300 rounded-xl text-xs font-semibold">
                    <Calendar size={14} className="text-gray-400" />
                    {org.events_count ?? 0} Événements
                  </span>
                </div>

                <div className="space-y-2 mb-6 text-xs text-gray-600 dark:text-gray-300">
                  {org.email && (
                    <div className="flex items-center space-x-2">
                      <Mail size={14} className="text-gray-400 flex-shrink-0" />
                      <span className="truncate">{org.email}</span>
                    </div>
                  )}
                  {org.organization_phone && (
                    <div className="flex items-center space-x-2">
                      <Phone size={14} className="text-gray-400 flex-shrink-0" />
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

                <div className="flex items-center space-x-2">
                  <Link
                    to={`/organizations/${org.id}/edit`}
                    className="p-2 rounded-xl text-gray-500 hover:bg-gray-100 dark:hover:bg-[var(--dark-surface-soft)] transition"
                    title="Modifier"
                  >
                    <Edit size={16} />
                  </Link>
                  <button
                    onClick={() => openArchiveModal(org)}
                    className="p-2 rounded-xl text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition"
                    title="Archiver"
                  >
                    <Archive size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modale de confirmation d'archivage */}
      <Modal
        isOpen={isArchiveModalOpen}
        onClose={() => setIsArchiveModalOpen(false)}
        title="Archiver l'organisation"
      >
        <div className="flex flex-col gap-4">
          <div className="flex items-start space-x-3 p-4 bg-rose-50 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900/50 rounded-2xl">
            <div className="p-2 bg-rose-100 dark:bg-rose-900/50 text-rose-600 dark:text-rose-400 rounded-xl shrink-0">
              <AlertTriangle size={20} />
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-900 dark:text-[var(--dark-text)]">
                Êtes-vous sûr de vouloir archiver "{orgToArchive?.name}" ?
              </h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Cette action masquera l'organisation et ses données associées. Vous pourrez éventuellement la restaurer plus tard.
              </p>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 dark:border-[var(--dark-border)]">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsArchiveModalOpen(false)}
              className="w-auto px-5 py-2.5"
            >
              Annuler
            </Button>

            <Button
              type="button"
              onClick={handleConfirmArchive}
              className="w-auto px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white shadow-md shadow-rose-600/20"
            >
              Confirmer l'archivage
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}