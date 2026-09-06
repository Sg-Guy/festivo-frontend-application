import React, { useState, useEffect } from "react";
import {
  Calendar,
  MapPin,
  Plus,
  Loader2,
  Edit,
  Eye,
  Trash2,
  Search,
  X,
  Archive,
} from "lucide-react";
import { EventCardGallery } from "../../../Components/shared/EventCardGallery";
import Button from "../../../Components/ui/Button";
import { useDeleteEvent, useOrganizerEvents, useUpdateEvent } from "../../../hooks/useEvents";
import { navigateTo } from "../../../utils/navigation";
import { ROUTES } from "../../../constants/routes";
import ActionButton from "../../../Components/ui/ActionButton";
import EditEventDrawer from "./EditEventDrawer";

export default function OrganizerEventsList({}) {
  const [filters, setFilters] = useState({
    search: "",
    status: "",
    category: "",
    date_from: "",
    date_to: "",
    page: 1,
    per_page: 6,
  });

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setFilters((prev) => ({ ...prev, search: searchTerm, page: 1 }));
    }, 400);

    return () => clearTimeout(handler);
  }, [searchTerm]);

  const {
    data: response,
    isLoading,
    isFetching,
    error,
  } = useOrganizerEvents(filters);

  const events = response?.data || [];
  const meta = response?.meta || {};
  const currentPage = meta.current_page || 1;
  const lastPage = meta.last_page || 1;

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value, page: 1 }));
  };

  const resetFilters = () => {
    setSearchTerm("");
    setFilters({
      search: "",
      status: "",
      category: "",
      date_from: "",
      date_to: "",
      page: 1,
      per_page: 6,
    });
  };

  //mise à jours
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const { mutate: updateEvent, isPending } = useUpdateEvent();

  // Fonction appelée quand l'utilisateur clique sur "Modifier" pour un événement
  const handleOpenEdit = (event) => {
    setSelectedEvent(event);
    setIsDrawerOpen(true);
  };

  // Fonction appelée à la soumission du formulaire du Drawer
  const handleSaveEvent = (formData) => {
    updateEvent(
      { eventId: selectedEvent.id, formData },
      {
        onSuccess: () => {
          setIsDrawerOpen(false); // Ferme le drawer si l'API répond OK
        },
      }
    );
  };
  const { mutate: deleteEvent, isPending: isEventDeleting } = useDeleteEvent();

  if (error) {
    return (
      <div className="text-center py-12 text-red-500 text-sm">
        Impossible de charger vos événements pour le moment.
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* 1. En-tête (Ne bouge jamais) */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white">
            Mes Événements
          </h1>
          <p className="text-xs text-gray-500">
            Gérez vos publications, vos brouillons et filtrez vos listes.
          </p>
        </div>
        <div className="w-full sm:w-auto">
          <Button
            variant="primary"
            onClick={() => navigateTo(ROUTES.CREATE_EVENT)}
          >
            <Plus size={16} />
            <span>Créer un événement</span>
          </Button>
        </div>
      </div>

      {/* 2. Filtres et Recherche (Reste interactif pendant le chargement) */}
      <div className="bg-white dark:bg-[var(--dark-surface)] p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="lg:col-span-2 space-y-1.5">
            <label className="block text-[11px] font-semibold text-gray-600 dark:text-gray-400">
              Recherche par nom
            </label>
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={16}
              />
              <input
                type="text"
                placeholder="Ex: Concert, Soirée VIP..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-8 py-2.5 rounded-xl bg-gray-50 dark:bg-[var(--dark-surface-soft)] border border-gray-200 dark:border-[var(--dark-border)] text-xs outline-none focus:border-[var(--primary)] text-gray-800 dark:text-gray-200"
              />
              {/* Petit loader discret dans la barre de recherche si ça charge */}
              {isFetching && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <Loader2
                    className="animate-spin text-[var(--primary)]"
                    size={14}
                  />
                </div>
              )}
              {searchTerm && !isFetching && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-[11px] font-semibold text-gray-600 dark:text-gray-400">
              Statut de l'événement
            </label>
            <select
              value={filters.status}
              onChange={(e) => handleFilterChange("status", e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-gray-50 dark:bg-[var(--dark-surface-soft)] border border-gray-200 dark:border-[var(--dark-border)] text-xs outline-none focus:border-[var(--primary)] text-gray-800 dark:text-gray-200"
            >
              <option value="">Tous les statuts</option>
              <option value="draft">Brouillon</option>
              <option value="published">Publié</option>
            </select>
          </div>

          <div className="flex items-end">
            {(searchTerm ||
              filters.status ||
              filters.date_from ||
              filters.date_to) && (
              <button
                onClick={resetFilters}
                className="w-full py-2.5 px-4 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-xs font-semibold text-gray-600 dark:text-gray-300 transition flex items-center justify-center gap-2"
              >
                <X size={14} /> Réinitialiser
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-gray-100 dark:border-gray-800">
          <div className="space-y-1.5">
            <label className="block text-[11px] font-semibold text-gray-600 dark:text-gray-400 flex items-center gap-1">
              <Calendar size={13} /> Filtrer à partir du (Date de début)
            </label>
            <input
              type="date"
              value={filters.date_from}
              onChange={(e) => handleFilterChange("date_from", e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-[var(--dark-surface-soft)] border border-gray-200 dark:border-[var(--dark-border)] text-xs outline-none focus:border-[var(--primary)] text-gray-800 dark:text-gray-200"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-[11px] font-semibold text-gray-600 dark:text-gray-400 flex items-center gap-1">
              <Calendar size={13} /> Filtrer jusqu'au (Date de fin)
            </label>
            <input
              type="date"
              value={filters.date_to}
              onChange={(e) => handleFilterChange("date_to", e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-[var(--dark-surface-soft)] border border-gray-200 dark:border-[var(--dark-border)] text-xs outline-none focus:border-[var(--primary)] text-gray-800 dark:text-gray-200"
            />
          </div>
        </div>
      </div>

      {/* 3. Grille des événements (Seule cette zone réagit visuellement au chargement initial) */}
      {isLoading ? (
        <div className="flex justify-center items-center py-24">
          <Loader2 className="animate-spin text-[var(--primary)]" size={36} />
        </div>
      ) : (
        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-opacity duration-200 ${isFetching ? "opacity-60" : "opacity-100"}`}
        >
          {events.map((event) => {
            const isDraft = event.status === "draft";

            return (
              <div
                key={event.id}
                className="bg-white dark:bg-[var(--dark-surface)] border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between transition hover:shadow-md"
              >
                <div className="h-48 bg-gray-200 dark:bg-gray-800 relative">
                  <EventCardGallery pictures={event.pictures} />

                  <div className="absolute top-3 right-3 z-10">
                    {isDraft ? (
                      <span className="px-3 py-1 bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-400 text-[10px] font-bold rounded-full uppercase tracking-wider border border-amber-200 dark:border-amber-900 shadow-sm">
                        Brouillon
                      </span>
                    ) : (
                      <span className="px-3 py-1 bg-green-100 text-green-800 dark:bg-green-950/80 dark:text-green-400 text-[10px] font-bold rounded-full uppercase tracking-wider border border-green-200 dark:border-green-900 shadow-sm">
                        Publié
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-5 space-y-3 flex-1">
                  <h3 className="font-bold text-base text-gray-900 dark:text-white truncate">
                    {event.title}
                  </h3>
                  <p className="text-xs text-gray-500 line-clamp-2">
                    {event.description || "Pas de description..."}
                  </p>

                  <div className="space-y-1.5 pt-2 border-t border-gray-100 dark:border-gray-800">
                    <div className="text-xs text-gray-400 flex items-center gap-1.5">
                      <Calendar size={13} />
                      <span>
                        {event.start_date
                          ? new Date(event.start_date).toLocaleDateString()
                          : "Date non définie"}
                      </span>
                    </div>
                    <div className="text-xs text-gray-400 flex items-center gap-1.5">
                      <MapPin size={13} />
                      <span className="truncate">
                        {event.location || "Lieu non défini"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center">
                  <div className="flex space-x-2">
                    <ActionButton
                      title="Voir"
                      icon={Eye}
                      variant="default"
                      onClick={() => {
                        navigateTo(`/organizer/events/${event.id}`);
                      }}
                    />
                    
                    <ActionButton
                      title="Modifier"
                      icon={Edit}
                      variant="default"
                      onClick={() => handleOpenEdit(event)}
                    />
                  </div>
                  <ActionButton
                    title="Archiver"
                    icon={Trash2}
                    variant="danger"
                    disabled={isEventDeleting}
                    onClick={() => {
                      deleteEvent(event.id);
                    }}
                  />
                </div>
              </div>
            );
          })}

          {events.length === 0 && (
            <div className="col-span-full text-center py-16 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-2xl space-y-3">
              <p className="text-sm font-medium text-gray-500">
                Aucun événement trouvé selon vos critères.
              </p>
              <div className="w-48 mx-auto">
                <Button variant="secondary" onClick={resetFilters}>
                  Réinitialiser les filtres
                </Button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 4. Pagination (Reste fixe, les boutons s'adaptent sans tout recharger) */}
      {lastPage > 1 && (
        <div className="flex justify-center items-center space-x-2 pt-4">
          <Button
            variant="secondary"
            disabled={currentPage === 1 || isFetching}
            onClick={() =>
              setFilters((prev) => ({ ...prev, page: prev.page - 1 }))
            }
            className="w-28 text-xs py-2"
          >
            Précédent
          </Button>

          <span className="text-xs font-semibold text-gray-600 dark:text-gray-400 px-4">
            Page {currentPage} sur {lastPage}
          </span>

          <Button
            variant="secondary"
            disabled={currentPage === lastPage || isFetching}
            onClick={() =>
              setFilters((prev) => ({ ...prev, page: prev.page + 1 }))
            }
            className="w-28 text-xs py-2"
          >
            Suivant
          </Button>
        </div>
      )}

      <EditEventDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        eventData={selectedEvent}
        onSave={handleSaveEvent}
        isSubmitting={isPending}
      />
    </div>
  );
}
