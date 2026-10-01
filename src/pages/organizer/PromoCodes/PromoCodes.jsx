import React, { useEffect, useState } from "react";
import {
  Tag,
  Plus,
  Edit3,
  Trash2,
  Calendar,
  Ticket,
  AlertCircle,
} from "lucide-react";
import Modal from "../../../Components/ui/Modal";
import Button from "../../../Components/ui/Button";
import Input from "../../../Components/ui/Input";
import Select from "../../../Components/ui/Select";
import ActionButton from "../../../Components/ui/ActionButton";
import { useEventPromoCodes, usePromoCodeMutations } from "../../../hooks/usePromoCodes";
import { useEventsForSelect } from "../../../hooks/useEvents";
import { useOrganizationStore } from "../../../store/useOrganizationStore";
import toast from "react-hot-toast";

export default function PromoCodesPage({
  initialStats = {
    activeCount: 3,
    totalUses: 104,
    revenue: "246 000 FCFA",
    usageRate: "68%",
  },
  
  onSaveCode = (codeData) => console.log("Sauvegarde API :", codeData),
  onDeleteCode = (id) => console.log("Suppression API ID :", id),
  onToggleActive = (id, currentStatus) =>
    console.log("Toggle statut API ID :", id, !currentStatus),
}) {
  const { activeOrganization } = useOrganizationStore();

  const { data: eventsData = [], isLoading: isLoadingEvents } = useEventsForSelect(activeOrganization.id);

  // État pour l'événement sélectionné dans le filtre de la page
  const [selectedEventFilterId, setSelectedEventFilterId] = useState("");

  // Dès que les événements arrivent, on sélectionne par défaut le dernier si rien n'est encore choisi
  useEffect(() => {
    if (eventsData.length > 0 && !selectedEventFilterId) {
      const lastEvent = eventsData[eventsData.length - 1];
      setSelectedEventFilterId(lastEvent.id);
    }
  }, [eventsData, selectedEventFilterId]);

  // Récupération des codes pour l'événement filtré
  const { data: codes = [], isLoading: isLoadingCodes } = useEventPromoCodes(selectedEventFilterId);

  // Utilisation du hook TanStack Query
  const {
    createPromoCode,
    isCreating,
    updatePromoCode,
    isUpdating,
    deletePromoCode,
  } = usePromoCodeMutations(activeOrganization.id, () => {
    setIsFormModalOpen(false);
    setIsDeleteModalOpen(false);
  });

  // États des modales
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCode, setSelectedCode] = useState(null);

  // État du formulaire
  const [formData, setFormData] = useState({
    code: "",
    eventId: "",
    applicableTickets: [],
    discountValue: "",
    type: "Pourcentage",
    maxUses: 50,
  });

  // Trouver l'événement sélectionné pour récupérer ses tickets dynamiquement
  const selectedEventObject = eventsData.find(
    (evt) => String(evt.id) === String(formData.eventId),
  );
  const currentAvailableTickets = selectedEventObject
    ? selectedEventObject.tickets
    : [];

  // --- GESTION MODALES ---
  const handleOpenCreate = () => {
    setSelectedCode(null);
    setFormData({
      code: "",
      eventId: "",
      applicableTickets: [],
      discountValue: "",
      type: "Pourcentage",
      maxUses: 50,
    });
    setIsFormModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setSelectedCode(item);
    setFormData({
      code: item.wording,
      eventId: item.id || "",
      applicableTickets: item.ticket_ids || [],
      discountValue: item.remise,
      type: item.remise_is_percent ? "Pourcentage" : "Montant fixe",
      maxUses: item.total_available,
    });
    setIsFormModalOpen(true);
  };

  // --- GESTION FORMULAIRE ---
  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectedCode) {
      updatePromoCode({ id: selectedCode.id, formData });
    } else {
      createPromoCode(
        {
          eventId: formData.eventId,
          formData: {
            code: formData.code,
            type: formData.type,
            discountValue: formData.discountValue,
            maxUses: formData.maxUses,
            applicableTickets: formData.applicableTickets,
          },
        },
        { onSuccess: (data) => {
            toast.success("OK");
            setIsFormModalOpen(false);
        } },
      );
    }
  };

  // --- ACTIONS SIMPLES ---
  const handleDelete = () => {
    if (selectedCode) {
      deletePromoCode(selectedCode.id);
      setIsDeleteModalOpen(false);
    }
  };

  const handleToggle = (id) => {
    setCodes(
      codes.map((c) => {
        if (c.id === id) {
          onToggleActive(id, c.active);
          return { ...c, active: !c.active };
        }
        return c;
      }),
    );
  };

  // Options formatées pour le composant Select des événements dans le filtre
  const eventSelectOptions = eventsData.map((evt) => ({
    value: evt.id,
    label: evt.title,
  }));

  // Options formatées pour le Select de type de remise
  const discountTypeOptions = [
    { value: "Pourcentage", label: "Pourcentage (%)" },
    { value: "Montant fixe", label: "Montant fixe (FCFA)" },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 space-y-6 bg-gray-50/50 dark:bg-[var(--dark-background)] min-h-screen">
      {/* En-tête */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-[var(--dark-text)] tracking-tight">
            Codes promo
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium mt-1">
            Créez des remises pour vos événements.
          </p>
        </div>
        <div className="w-full sm:w-auto">
          <Button
            onClick={handleOpenCreate}
            variant="primary"
            className="gap-2 px-5 py-3 rounded-2xl"
          >
            <Plus size={18} className="stroke-[3]" />
            Créer un code
          </Button>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          value={initialStats.activeCount}
          label="Codes actifs"
          color="text-emerald-600 dark:text-emerald-400"
        />
        <StatCard
          value={initialStats.totalUses}
          label="Utilisations totales"
          color="text-orange-500 dark:text-orange-400"
        />
        <StatCard
          value={initialStats.revenue}
          label="Revenus avec promo"
          color="text-amber-500 dark:text-amber-400"
        />
        <StatCard
          value={initialStats.usageRate}
          label="Taux d'utilisation"
          color="text-purple-600 dark:text-purple-400"
        />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-[var(--dark-text)] tracking-tight">
            Codes promo
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium mt-1">
            Gérez les remises de vos événements.
          </p>
        </div>

        {/* Sélecteur / Filtre d'événement */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-gray-500 dark:text-gray-400">Événement :</span>
          <div className="w-64">
            <Select
              value={selectedEventFilterId}
              onChange={(e) => setSelectedEventFilterId(e.target.value)}
              options={eventSelectOptions}
              placeholder="Sélectionner un événement"
            />
          </div>
        </div>
      </div>

      {codes.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-[var(--dark-surface)] rounded-3xl border border-gray-100 dark:border-[var(--dark-border)] p-8 space-y-3">
          <div className="w-12 h-12 bg-orange-50 dark:bg-orange-950/30 text-orange-600 dark:text-orange-400 rounded-2xl flex items-center justify-center mx-auto">
            <Tag size={24} />
          </div>
          <h3 className="text-sm font-bold text-gray-900 dark:text-[var(--dark-text)]">Aucun code promo</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
            Il n'y a actuellement aucun code promo associé à cet événement. Créez-en un dès maintenant !
          </p>
        </div>
      ) : (
        <div>
          <div className="bg-white dark:bg-[var(--dark-surface)] rounded-3xl border border-gray-100 dark:border-[var(--dark-border)] shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr className="border-b border-gray-100 dark:border-[var(--dark-border)] text-[11px] font-bold text-gray-400 uppercase tracking-wider bg-gray-50/50 dark:bg-[var(--dark-surface-soft)]">
                    <th className="py-4 px-6">Code</th>
                    <th className="py-4 px-6">Tickets Cibles</th>
                    <th className="py-4 px-6">Remise</th>
                    <th className="py-4 px-6">Utilisation</th>
                    <th className="py-4 px-6">Revenus</th>
                    <th className="py-4 px-6 text-center">Actif</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-[var(--dark-border)] text-sm">
                  {codes.map((item) => {
                    const percentage = Math.min(
                      Math.round((item.usage_count / item.total_available) * 100),
                      100,
                    );
                    return (
                      <tr
                        key={item.id}
                        className="hover:bg-gray-50/60 dark:hover:bg-[var(--dark-surface-soft)] transition-colors group"
                      >
                        <td className="py-4 px-6 font-bold text-gray-900 dark:text-[var(--dark-text)] flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-xl bg-orange-50 dark:bg-orange-950/30 text-orange-600 dark:text-orange-400 flex items-center justify-center shrink-0">
                            <Tag size={14} />
                          </div>
                          <span className="font-mono">{item.wording}</span>
                        </td>
                        <td className="py-4 px-6 space-y-1">
                          <div className="flex flex-wrap gap-1">
                            {item.tickets_name?.map((t, idx) => (
                              <span
                                key={idx}
                                className="inline-flex items-center gap-1 px-2 py-0.5 bg-gray-100 dark:bg-[var(--dark-surface-soft)] text-gray-600 dark:text-gray-300 rounded-md text-[10px] font-medium"
                              >
                                <Ticket size={10} /> {t.name}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="font-extrabold text-orange-600 dark:text-orange-400">
                            {item.remise_is_percent ? "- " + item.remise + "%": "- " + item.remise}
                            <p className="text-[10px] text-gray-400 font-medium">
                              {item.remise_is_percent ? "" : "Montant fixe"}
                            </p>
                          </div>
                        </td>
                        <td className="py-4 px-6 w-48">
                          <div className="space-y-1.5">
                            <div className="flex justify-between text-[11px] font-semibold text-gray-500 dark:text-gray-400">
                              <span>
                                {item.usage_count}/{item.total_available}
                              </span>
                              <span>{percentage}%</span>
                            </div>
                            <div className="w-full h-2 bg-gray-100 dark:bg-[var(--dark-surface-soft)] rounded-full overflow-hidden">
                              <div
                                className="h-full bg-orange-500 rounded-full"
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6 font-bold text-gray-800 dark:text-[var(--dark-text)] text-xs">
                          {item.total_generate ?? "0 FCFA"}
                        </td>
                        <td className="py-4 px-6 text-center">
                          <button
                            onClick={() => handleToggle(item.id)}
                            className={`w-10 h-5 flex items-center rounded-full p-1 transition-colors mx-auto ${item.is_active ? "bg-emerald-500" : "bg-gray-300 dark:bg-gray-700"}`}
                          >
                            <div
                              className={`bg-white w-3 h-3 rounded-full shadow-md transform transition-transform ${item.is_active ? "translate-x-5" : "translate-x-0"}`}
                            />
                          </button>
                        </td>
                        <td className="py-4 px-6 text-right">
                          <div className="flex items-center justify-end gap-1 opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                            <ActionButton
                              icon={Edit3}
                              title="Modifier"
                              variant="default"
                              onClick={() => handleOpenEdit(item)}
                              size={16}
                            />
                            <ActionButton
                              icon={Trash2}
                              title="Supprimer"
                              variant="danger"
                              onClick={() => {
                                setSelectedCode(item);
                                setIsDeleteModalOpen(true);
                              }}
                              size={16}
                            />
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* --- MODALE CRÉATION / ÉDITION --- */}
      <Modal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        title={selectedCode ? "Modifier le code promo" : "Créer un code promo"}
      >
        <form
          onSubmit={handleSubmit}
          className="space-y-4 max-h-[70vh] overflow-y-auto pr-2"
        >
          <Input
            label="Code Promo"
            type="text"
            isRequired
            placeholder="FSTV-1452"
            value={formData.code}
            onChange={(e) =>
              setFormData({ ...formData, code: e.target.value.toUpperCase() })
            }
            className="font-mono"
          />

          <div className="space-y-4">
            <Select
              label="Événement ciblé"
              required
              value={formData.eventId}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  eventId: e.target.value,
                  applicableTickets: [],
                });
              }}
              options={eventSelectOptions}
              placeholder="Sélectionner un événement..."
            />

            {/* Affichage dynamique des tickets de l'événement sélectionné */}
            {formData.eventId && currentAvailableTickets.length > 0 && (
              <div className="p-3 bg-orange-50/50 dark:bg-orange-950/20 rounded-xl border border-orange-100 dark:border-orange-950/50 space-y-2">
                <label className="block text-xs font-bold text-gray-800 dark:text-gray-200">
                  Tickets éligibles
                  <span className="font-normal text-gray-500 dark:text-gray-400"> (Optionnel)</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {currentAvailableTickets.map((ticket) => {
                    const isChecked = formData.applicableTickets.includes(
                      ticket.id,
                    );
                    return (
                      <label
                        key={ticket.id}
                        className={`flex items-center gap-2 p-2 rounded-lg border cursor-pointer text-xs transition ${
                          isChecked
                            ? "bg-orange-100/50 dark:bg-orange-950/40 border-orange-300 dark:border-orange-800 font-semibold text-orange-900 dark:text-orange-300"
                            : "bg-white dark:bg-[var(--dark-surface-soft)] border-gray-200 dark:border-[var(--dark-border)] text-gray-700 dark:text-gray-300"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {
                            const exists = formData.applicableTickets.includes(
                              ticket.id,
                            );
                            setFormData((prev) => ({
                              ...prev,
                              applicableTickets: exists
                                ? prev.applicableTickets.filter(
                                    (id) => id !== ticket.id,
                                  )
                                : [...prev.applicableTickets, ticket.id],
                            }));
                          }}
                          className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                        />
                        {ticket.name}
                      </label>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Select
              label="Type de remise"
              value={formData.type}
              onChange={(e) =>
                setFormData({ ...formData, type: e.target.value })
              }
              options={discountTypeOptions}
            />
            <Input
              label="Valeur"
              type="number"
              isRequired
              placeholder="10"
              value={formData.discountValue}
              onChange={(e) =>
                setFormData({ ...formData, discountValue: e.target.value })
              }
            />
          </div>

          <Input
            label="Total disponible"
            type="number"
            min="1"
            isRequired
            value={formData.maxUses}
            onChange={(e) =>
              setFormData({ ...formData, maxUses: e.target.value })
            }
          />

          <div className="pt-4 flex justify-end gap-3 border-t border-gray-100 dark:border-[var(--dark-border)]">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsFormModalOpen(false)}
              className="w-auto px-5 py-2.5"
            >
              Annuler
            </Button>
            <Button
              type="submit"
              variant="primary"
              isLoading={isCreating || isUpdating}
              loadingText="Enregistrement..."
              className="w-auto px-5 py-2.5 shadow-md"
            >
              Enregistrer
            </Button>
          </div>
        </form>
      </Modal>

      {/* --- MODALE SUPPRESSION --- */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Confirmation"
      >
        <div className="text-center space-y-4 py-2">
          <div className="w-12 h-12 bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 rounded-xl flex items-center justify-center mx-auto">
            <AlertCircle size={24} />
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Supprimer le code  
            <strong className="text-gray-900 dark:text-[var(--dark-text)] font-mono">
              { " " + selectedCode?.wording }
            </strong>
            ? Cette action est irréversible.
          </p>
          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsDeleteModalOpen(false)}
              className="flex-1 py-2.5"
            >
              Annuler
            </Button>
            <Button
              type="button"
              variant="danger"
              onClick={handleDelete}
              className="flex-1 py-2.5 shadow-md"
            >
              Supprimer
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

// Mini-composant pour les cartes statistiques
function StatCard({ value, label, color }) {
  return (
    <div className="bg-white dark:bg-[var(--dark-surface)] p-5 rounded-3xl border border-gray-100 dark:border-[var(--dark-border)] shadow-sm space-y-2">
      <span
        className={`text-2xl sm:text-3xl font-black ${color} truncate block`}
      >
        {value}
      </span>
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
        {label}
      </p>
    </div>
  );
}