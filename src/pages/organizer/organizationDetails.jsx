import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Building2,
  ArrowLeft,
  Mail,
  Phone,
  Shield,
  UserCheck,
  UserX,
  Calendar,
  UserPlus,
  Plus,
} from "lucide-react";
import { useOrgDetails } from "../../hooks/useOrg";
import Spinner from "../../Components/ui/Spinner";
import { INVITATION_ROLES, ROLES } from "../../constants/roles";
import Button from "../../Components/ui/Button";
import Modal from "../../Components/ui/Modal";
import Input from "../../Components/ui/Input";
import Select from "../../Components/ui/Select"; 
import {
  useDeleteInvitation,
  useInviteMember,
  useRevokeInvitation,
} from "../../hooks/useMembers";

// Options pour le select des rôles
const roleOptions = INVITATION_ROLES;

export default function OrganizationDetails() {
  const { id } = useParams();
  const { InvId } = useParams();

  const [invitationError, setInvitationError] = useState("");
  const [invitationEmail, setInvitationEmail] = useState("");
  const [invitationRole, setInvitationRole] = useState("controller"); // Valeur par défaut
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: organization, isLoading: isDetailLoading } = useOrgDetails(id) ?? [];

  const { mutate: sendInvitation, isPending } = useInviteMember(id);

  const { mutate: revokeInvitation, isPending: isRevoking } =
    useRevokeInvitation();

  const handleRevokeInvitation = (invitationId) => {
    revokeInvitation(invitationId);
  };

  const { mutate: deleteInvitation, isPending: isDeleting } =
    useDeleteInvitation();

  const handleDeleteInvitation = (invitationId) => {
    deleteInvitation(invitationId);
  };

  const handleSendInvitation = () => {
    setInvitationError("");

    sendInvitation(
      {
        email: invitationEmail,
        role: invitationRole, 
      },
      {
        onSuccess: () => {
          setIsModalOpen(false);
          setInvitationEmail(""); 
          setInvitationRole("controller"); // par defaut
        },
        onError: (error) => {
          const message = error.response?.data?.errors?.email?.[0];
          if (message) {
            setInvitationError(message);
          }
        },
      },
    );
  };

  if (isDetailLoading) {
    return (
      <div className="flex flex-row justify-center align-items-center py-10">
        <Spinner size={18} className="text-center" />
        <p className="text-center">Chargement en cours...</p>
      </div>
    );
  }



  return (
    <div className="max-w-6xl mx-auto px-4 py-8 sm:py-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <Link
          to="/organizations"
          className="ml-0 inline-flex items-center space-x-2 text-sm font-medium text-gray-500 hover:text-gray-900 dark:hover:text-white transition mb-6"
        >
          <ArrowLeft size={16} />
          <span>Retour aux organisations</span>
        </Link>
        <Link
          to={`/organizations/${organization.id}/events/create`}
          className="ml-0 inline-flex items-center space-x-2 text-sm font-medium text-gray-500 hover:text-gray-900 dark:hover:text-white transition mb-6"
        >
          <span>Créer un évenement</span>
        </Link>
      </div>

      {/* En-tête Infos de l'Organisation */}
      
        <div>
          <div className="bg-white dark:bg-[var(--dark-background)] border border-gray-200 dark:border-[var(--dark-border)] rounded-3xl p-6 sm:p-8 shadow-xl shadow-gray-100 dark:shadow-none mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <div className="w-16 h-16 rounded-2xl bg-orange-100 dark:bg-orange-950 flex items-center justify-center text-[var(--primary)] font-bold text-2xl flex-shrink-0">
                <Building2 size={32} />
              </div>
              <div className="flex-1">
                <h1 className="text-2xl font-extrabold text-gray-900 dark:text-[var(--dark-text)]">
                  {organization.name}
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {organization.description}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 pt-6 border-t border-gray-100 dark:border-[var(--dark-border)] text-sm">
              <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
                <Mail size={16} className="text-gray-400" />
                <span>{organization.email || "Non renseigné"}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
                <Phone size={16} className="text-gray-400" />
                <span>
                  {organization.organization_phone_number || "Non renseigné"}
                </span>
              </div>
            </div>
          </div>

          <div className="w-full inline-flex items-center justify-end gap-4 mb-3">
            <Button onClick={() => setIsModalOpen(true)} className="max-w-50">
              <UserPlus size={14} />
              <span>Inviter un membre</span>
            </Button>
            <Button variant="outline" className="max-w-50">
              <Plus size={16} />
              <span>Inviter Plusieurs</span>
            </Button>
          </div>

          {/* Section des Membres */}
          <div className="bg-white dark:bg-[var(--dark-background)] border border-gray-200 dark:border-[var(--dark-border)] rounded-3xl p-6 sm:p-8 shadow-xl shadow-gray-100 dark:shadow-none">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-[var(--dark-text)]">
                  Membres de l'organisation
                </h2>
                <p className="text-xs text-gray-400 mt-0.5">
                  Liste des utilisateurs rattachés et de leurs rôles.
                </p>
              </div>
              <span className="bg-orange-50 dark:bg-orange-950/40 text-[var(--primary)] text-xs font-bold px-3 py-1.5 rounded-full">
                {organization.members.length} membres
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-[var(--dark-border)] text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    <th className="py-3 px-4">Membre</th>
                    <th className="py-3 px-4">Contact</th>
                    <th className="py-3 px-4">Rôle</th>
                    <th className="py-3 px-4">Statut</th>
                    <th className="py-3 px-4">Rejoint le</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-[var(--dark-border)] text-sm">
                  {organization.members.map((member) => (
                    <tr
                      key={member.id}
                      className="hover:bg-gray-50/50 dark:hover:bg-[var(--dark-surface)] transition"
                    >
                      <td className="py-4 px-4 font-semibold text-gray-900 dark:text-[var(--dark-text)]">
                        {member.firstname} {member.lastname}
                      </td>
                      <td className="py-4 px-4">
                        <p className="text-gray-900 dark:text-[var(--dark-text)]">
                          {member.email}
                        </p>
                        <p className="text-xs text-gray-400">{member.phone}</p>
                      </td>
                      <td className="py-4 px-4">
                        <span className="inline-flex items-center space-x-1 text-xs font-medium bg-gray-100 dark:bg-[var(--dark-surface)] px-2.5 py-1 rounded-lg text-gray-700 dark:text-gray-300">
                          <Shield size={12} className="text-[var(--primary)]" />
                          <span>{ROLES[member.role] || member.role}</span>
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        {member.is_active ? (
                          <span className="inline-flex items-center space-x-1 text-xs font-medium text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-full">
                            <UserCheck size={12} />
                            <span>Actif</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center space-x-1 text-xs font-medium text-red-600 bg-red-50 dark:bg-red-950/40 px-2.5 py-1 rounded-full">
                            <UserX size={12} />
                            <span>Inactif</span>
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-4 text-xs text-gray-500 dark:text-gray-400">
                        <div className="flex items-center space-x-1.5">
                          <Calendar size={14} className="text-gray-400" />
                          <span>{member.joined_at}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {/* Section des Invitations en attente */}
          <div className="bg-white dark:bg-[var(--dark-background)] border border-gray-200 dark:border-[var(--dark-border)] rounded-3xl p-6 sm:p-8 shadow-xl shadow-gray-100 dark:shadow-none mt-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-[var(--dark-text)]">
                  Invitations en attente
                </h2>
                <p className="text-xs text-gray-400 mt-0.5">
                  Personnes invitées qui n'ont pas encore accepté.
                </p>
              </div>
              <span className="bg-amber-50 dark:bg-amber-950/40 text-amber-600 text-xs font-bold px-3 py-1.5 rounded-full">
                {organization.invitations?.length || 0} en attente
              </span>
            </div>

            {organization.invitations?.length === 0 ? (
              <p className="text-sm text-gray-400 italic py-4 text-center">
                Aucune invitation en cours.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-[var(--dark-border)] text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      <th className="py-3 px-4">Email</th>
                      <th className="py-3 px-4">Rôle</th>
                      <th className="py-3 px-4">Statut</th>
                      <th className="py-3 px-4">Envoyé le</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-[var(--dark-border)] text-sm">
                    {organization.invitations.map((invitation) => (
                      <tr
                        key={invitation.id}
                        className="hover:bg-gray-50/50 dark:hover:bg-[var(--dark-surface)] transition"
                      >
                        <td className="py-4 px-4 font-semibold text-gray-900 dark:text-[var(--dark-text)]">
                          {invitation.email}
                        </td>

                        <td className="py-4 px-4">
                          <span className="inline-flex items-center space-x-1 text-xs font-medium bg-gray-100 dark:bg-[var(--dark-surface)] px-2.5 py-1 rounded-lg text-gray-700 dark:text-gray-300">
                            <Shield
                              size={12}
                              className="text-[var(--primary)]"
                            />
                            <span>
                              {ROLES[invitation.role] || invitation.role}
                            </span>
                          </span>
                        </td>

                        <td className="py-4 px-4">
                          <span className="inline-flex items-center text-xs font-medium text-amber-600 bg-amber-50 dark:bg-amber-950/40 px-2.5 py-1 rounded-full">
                            {invitation.status || "En attente"}
                          </span>
                        </td>

                        <td className="py-4 px-4 text-xs text-gray-500 dark:text-gray-400">
                          <div className="flex items-center space-x-1.5">
                            <Calendar size={14} className="text-gray-400" />
                            <span>{invitation.created_at}</span>
                          </div>
                        </td>

                        <td className="py-4 px-4 text-right space-x-2">
                          <button
                            onClick={() =>
                              handleRevokeInvitation(invitation.id)
                            }
                            className="text-xs font-medium text-amber-600 hover:underline"
                          >
                            Révoquer
                          </button>
                          <button
                            onClick={() =>
                              handleDeleteInvitation(invitation.id)
                            }
                            className="text-xs font-medium text-red-600 hover:underline"
                          >
                            Supprimer
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
    </div>
  );
}
