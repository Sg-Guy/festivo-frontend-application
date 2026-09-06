import React, { useState } from "react";
import {
  Shield,
  UserCheck,
  UserX,
  Trash2,
  MoreVertical,
  Mail,
  Phone,
  Calendar,
  Search,
  UserPlus,
} from "lucide-react";
import toast from "react-hot-toast";
import Button from "./Button";
import Input from "./Input";
import Select from "./Select";
import Modal from "./Modal";
import { useInviteMember } from "../../hooks/useMembers";
import { INVITATION_ROLES } from "../../constants/roles";

export default function OrganizationMembers({ membersData }) {
  // membersData correspond à ton retour API (avec .data, .meta, etc.)
  const [members, setMembers] = useState(membersData?.data || []);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeDropdown, setActiveDropdown] = useState(null);

  const [invitationError, setInvitationError] = useState("");
  const [invitationEmail, setInvitationEmail] = useState("");
  const [invitationRole, setInvitationRole] = useState("controller"); // Valeur par défaut
  const [isModalOpen, setIsModalOpen] = useState(false);
  const roleOptions = INVITATION_ROLES;


  const { mutate: sendInvitation, isPending } = useInviteMember();

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
  // Filtrage rapide par nom ou email pour éviter la surcharge
  const filteredMembers = members.filter(
    (member) =>
      `${member.firstname} ${member.lastname}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Actions simulées (à relier à tes mutations API / Laravel)
  const handleToggleStatus = (id, currentStatus) => {
    setMembers(
      members.map((m) =>
        m.id === id
          ? {
              ...m,
              is_active: !currentStatus,
              status: !currentStatus ? "active" : "inactive",
            }
          : m,
      ),
    );
    setActiveDropdown(null);
    toast.success("Statut du membre mis à jour avec succès !");
  };

  const handleRemoveMember = (id, name) => {
    if (
      window.confirm(`Voulez-vous vraiment retirer ${name} de l'organisation ?`)
    ) {
      setMembers(members.filter((m) => m.id !== id));
      setActiveDropdown(null);
      toast.success("Membre retiré de l'organisation.");
    }
  };

  const getRoleBadgeStyle = (role) => {
    switch (role?.toLowerCase()) {
      case "owner":
        return "bg-purple-50 text-purple-700 dark:bg-purple-950/40 dark:text-purple-300 border-purple-200";
      case "controller":
        return "bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300 border-blue-200";
      default:
        return "bg-gray-50 text-gray-700 dark:bg-gray-800 dark:text-gray-300 border-gray-200";
    }
  };

  return (
    <div className="space-y-6">
      {/* En-tête : Titre, Recherche et Bouton d'invitation */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-[var(--dark-text)]">
            Membres de l'organisation
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Gérez les accès, les rôles et le statut des collaborateurs.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          {/* Barre de recherche discrète */}
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Rechercher un membre..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 text-xs bg-white dark:bg-[var(--dark-surface)] border border-gray-200 dark:border-[var(--dark-border)] rounded-xl focus:outline-none focus:border-[var(--primary)] transition w-full sm:w-64"
            />
          </div>

          {/* Bouton Inviter */}
          <Button onClick={() => setIsModalOpen(true)} className="max-w-50">
            <UserPlus size={14} />
            <span>Inviter</span>
          </Button>
        </div>
      </div>

      {/* Liste / Tableau épuré */}
      <div className="bg-white dark:bg-[var(--dark-surface)] border border-gray-200 dark:border-[var(--dark-border)] rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 dark:border-[var(--dark-border)] bg-gray-50/50 dark:bg-[var(--dark-surface-soft)] text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                <th className="py-3.5 px-6">Membre</th>
                <th className="py-3.5 px-4">Contact</th>
                <th className="py-3.5 px-4">Rôle</th>
                <th className="py-3.5 px-4">Statut</th>
                <th className="py-3.5 px-4">Rejoint le</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-[var(--dark-border)] text-xs">
              {filteredMembers.length > 0 ? (
                filteredMembers.map((member) => (
                  <tr
                    key={member.id}
                    className="hover:bg-gray-50/50 dark:hover:bg-[var(--dark-surface-soft)]/50 transition"
                  >
                    {/* Nom & Avatar */}
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-9 h-9 rounded-xl bg-orange-100 dark:bg-orange-950 text-[var(--primary)] font-bold flex items-center justify-center shrink-0">
                          {member.firstname?.[0]}
                          {member.lastname?.[0]}
                        </div>
                        <div>
                          <p className="font-bold text-gray-900 dark:text-[var(--dark-text)]">
                            {member.firstname} {member.lastname}
                          </p>
                          <p className="text-[10px] text-gray-400">
                            ID: #{member.id}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Contact (Email & Téléphone combinés pour éviter trop de colonnes) */}
                    <td className="py-4 px-4 text-gray-600 dark:text-gray-300">
                      <div className="space-y-0.5">
                        <div className="flex items-center space-x-1.5">
                          <Mail size={12} className="text-gray-400 shrink-0" />
                          <span className="truncate max-w-[180px]">
                            {member.email}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1.5 text-gray-400 text-[10px]">
                          <Phone size={12} className="shrink-0" />
                          <span>{member.phone || "Non renseigné"}</span>
                        </div>
                      </div>
                    </td>

                    {/* Rôle (Badge stylisé) */}
                    <td className="py-4 px-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase border ${getRoleBadgeStyle(member.role)}`}
                      >
                        <Shield size={10} className="mr-1" />
                        {member.role}
                      </span>
                    </td>

                    {/* Statut (Actif / Inactif) */}
                    <td className="py-4 px-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-semibold ${
                          member.is_active
                            ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300"
                            : "bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full mr-1.5 ${member.is_active ? "bg-emerald-500" : "bg-rose-500"}`}
                        />
                        {member.is_active ? "Actif" : "Désactivé"}
                      </span>
                    </td>

                    {/* Date d'adhésion */}
                    <td className="py-4 px-4 text-gray-500 dark:text-gray-400 text-[11px]">
                      <div className="flex items-center space-x-1.5">
                        <Calendar size={12} className="text-gray-400" />
                        <span>{member.joined_at}</span>
                      </div>
                    </td>

                    {/* Actions contextuelles (Le menu discret) */}
                    <td className="py-4 px-6 text-right relative">
                      <div className="inline-block text-left">
                        <button
                          onClick={() =>
                            setActiveDropdown(
                              activeDropdown === member.id ? null : member.id,
                            )
                          }
                          className="p-2 rounded-xl text-gray-400 hover:bg-gray-100 dark:hover:bg-[var(--dark-surface-soft)] transition"
                          aria-label="Actions"
                        >
                          <MoreVertical size={16} />
                        </button>

                        {/* Popover des actions */}
                        {activeDropdown === member.id && (
                          <>
                            <div
                              className="fixed inset-0 z-20"
                              onClick={() => setActiveDropdown(null)}
                            />
                            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-[var(--dark-surface)] rounded-xl shadow-xl border border-gray-100 dark:border-[var(--dark-border)] p-1 z-30 text-left space-y-0.5">
                              {/* Activer / Désactiver */}
                              <button
                                onClick={() =>
                                  handleToggleStatus(
                                    member.id,
                                    member.is_active,
                                  )
                                }
                                className={`w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-xs font-semibold transition ${
                                  member.is_active
                                    ? "text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950/30"
                                    : "text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/30"
                                }`}
                              >
                                {member.is_active ? (
                                  <UserX size={14} />
                                ) : (
                                  <UserCheck size={14} />
                                )}
                                <span>
                                  {member.is_active
                                    ? "Désactiver le compte"
                                    : "Activer le compte"}
                                </span>
                              </button>

                              {/* Retirer de l'orga */}
                              <button
                                onClick={() =>
                                  handleRemoveMember(
                                    member.id,
                                    `${member.firstname} ${member.lastname}`,
                                  )
                                }
                                className="w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition"
                              >
                                <Trash2 size={14} />
                                <span>Retirer de l'organisation</span>
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="py-8 text-center text-gray-400">
                    Aucun membre trouvé.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Inviter un membre"
      >
        <div className="flex flex-col gap-4">
          <Input
            label="Adresse email"
            type="email"
            icon={Mail}
            placeholder="membre@gmail.com"
            value={invitationEmail}
            onChange={(e) => setInvitationEmail(e.target.value)}
            error={invitationError}
          />

          {/* Intégration du composant Select pour le rôle */}
          <Select
            label="Rôle dans l'organisation"
            icon={Shield}
            options={roleOptions}
            value={invitationRole}
            onChange={(e) => setInvitationRole(e.target.value)}
          />

          <div className="flex justify-between gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsModalOpen(false)}
            >
              Annuler
            </Button>

            <Button
              type="button"
              variant="primary"
              isLoading={isPending}
              loadingText="En cours..."
              onClick={handleSendInvitation}
            >
              Envoyer l'invitation
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
