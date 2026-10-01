import React, { useEffect, useRef, useState } from "react";
import {
  Search,
  SlidersHorizontal,
  Calendar,
  MapPin,
  ArrowRight,
  Sparkles,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import Input from "../../Components/ui/Input";
import Button from "../../Components/ui/Button";
import Spinner from "../../Components/ui/Spinner";
import Modal from "../../Components/ui/Modal";
import { useEvents } from "../../hooks/useEvents";
import { useCategories } from "../../hooks/useCategories";
import { PictureBaseUrl } from "../../constants/picturesBaseUrl";

const formatDate = (dateString) => {
  if (!dateString) return "";

  return new Date(dateString).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const formatTime = (dateString) => {
  if (!dateString) return "";

  return new Date(dateString).toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const formatPrice = (price) => {
  return new Intl.NumberFormat("fr-FR").format(price);
};

function EventGallery({ event }) {
  const pictures = event.pictures || [];
  const [currentIndex, setCurrentIndex] = useState(0);

  if (pictures.length === 0) {
    return (
      <div className="h-52 bg-gradient-to-tr from-gray-900 to-gray-700 flex items-center justify-center">
        <span className="text-4xl">🎵</span>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentIndex((previous) =>
      previous === pictures.length - 1 ? 0 : previous + 1
    );
  };

  const previousImage = () => {
    setCurrentIndex((previous) =>
      previous === 0 ? pictures.length - 1 : previous - 1
    );
  };

  return (
    <div className="relative h-52 bg-gray-900 overflow-hidden group/gallery">
      <img
        src={`${PictureBaseUrl.EVENTS}/${pictures[currentIndex].path}`}
        alt={`${event.title} - image ${currentIndex + 1}`}
        className="w-full h-full object-cover transition-opacity duration-300"
      />

      {event.categories?.[0]?.title && (
        <span className="absolute top-4 left-4 bg-white/90 dark:bg-gray-950/80 text-[var(--primary)] text-xs font-bold px-3 py-1.5 rounded-full shadow-sm capitalize backdrop-blur-sm">
          {event.categories[0].title}
        </span>
      )}

      {pictures.length > 1 && (
        <>
          <button
            type="button"
            onClick={previousImage}
            aria-label="Image précédente"
            className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm opacity-0 group-hover/gallery:opacity-100 transition-opacity hover:bg-black/60"
          >
            <ChevronLeft size={18} />
          </button>

          <button
            type="button"
            onClick={nextImage}
            aria-label="Image suivante"
            className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm opacity-0 group-hover/gallery:opacity-100 transition-opacity hover:bg-black/60"
          >
            <ChevronRight size={18} />
          </button>

          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {pictures.map((picture, index) => (
              <button
                key={picture.id || index}
                type="button"
                onClick={() => setCurrentIndex(index)}
                aria-label={`Afficher l'image ${index + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  index === currentIndex
                    ? "w-5 bg-white"
                    : "w-1.5 bg-white/60"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function EventTickets({ tickets }) {
  if (!tickets || tickets.length === 0) {
    return null;
  }

  const visibleTickets = tickets.slice(0, 2);
  const remainingTickets = tickets.length - visibleTickets.length;

  return (
    <div className="mt-4">
      <p className="text-[10px] uppercase tracking-wide font-semibold text-gray-400 dark:text-gray-500 mb-1.5">
        Billets disponibles
      </p>

      <div className="flex flex-wrap items-center gap-1.5 text-xs text-gray-600 dark:text-gray-300">
        {visibleTickets.map((ticket, index) => (
          <React.Fragment key={ticket.id || index}>
            <span className="font-medium">
              {ticket.name}
            </span>

            {ticket.regular_price !== undefined && (
              <span className="text-gray-400 dark:text-gray-500">
                · {formatPrice(ticket.regular_price)} FCFA
              </span>
            )}

            {index < visibleTickets.length - 1 && (
              <span className="text-gray-300 dark:text-gray-600">
                •
              </span>
            )}
          </React.Fragment>
        ))}

        {remainingTickets > 0 && (
          <span className="text-gray-400 dark:text-gray-500">
            et {remainingTickets} autre
            {remainingTickets > 1 ? "s" : ""}
          </span>
        )}
      </div>
    </div>
  );
}

export default function Events() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [city, setCity] = useState("");
  const [status, setStatus] = useState("upcoming");
  const [page, setPage] = useState(1);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const categoryContainerRef = useRef(null);

  const {
    data: eventsData,
    isLoading,
  } = useEvents({
    search,
    category,
    date,
    city,
    event_status: status,
    page,
  });

  const {
    categoryOptions,
    isLoading: isLoadingCategories,
  } = useCategories();
  /*
   * Défilement automatique lent des catégories.
   */
  useEffect(() => {
    const container = categoryContainerRef.current;

    if (!container) {
      return;
    }

    let animationFrame;
    let isPaused = false;

    const handleMouseEnter = () => {
      isPaused = true;
    };

    const handleMouseLeave = () => {
      isPaused = false;
    };

    const scroll = () => {
      if (!isPaused && container.scrollWidth > container.clientWidth) {
        container.scrollLeft += 0.35;

        if (
          container.scrollLeft + container.clientWidth >=
          container.scrollWidth - 1
        ) {
          container.scrollLeft = 0;
        }
      }

      animationFrame = requestAnimationFrame(scroll);
    };

    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);

    animationFrame = requestAnimationFrame(scroll);

    return () => {
      cancelAnimationFrame(animationFrame);
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [categoryOptions]);

  //console.log(categoryOptions);

   const categoryTabs = [
    {
      id: "",
      label: "Tous",
      icon: Sparkles,
    },
    ...( categoryOptions?.map((cat) => ({
      id: cat.value,
      label: cat.label,
      icon:
        cat.value === "concert"
          ? "🎵"
          : cat.value === "gastronomie"
            ? "🍽️"
            : "🎉",
    })) || []),
  ];

  const events = eventsData?.data || [];

  const totalEvents = eventsData?.meta?.total || 0;
  const totalPages = eventsData?.meta?.last_page || 1;
  const currentPage = eventsData?.meta?.current_page || page;

  const hasActiveFilters = category || date || city;

  const resetFilters = () => {
    setCity("");
    setDate("");
    setCategory("");
    setPage(1);
  };

  const handleCategoryChange = (value) => {
    setCategory(value);
    setPage(1);
  };

  const handleStatusChange = (value) => {
    setStatus(value);
    setPage(1);
  };

  const goToPage = (newPage) => {
    if (newPage < 1 || newPage > totalPages) {
      return;
    }

    setPage(newPage);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[var(--dark-background)] pb-16 transition-colors duration-200">
      {/* Hero */}
      <section className="bg-gradient-to-b from-orange-50/70 to-transparent dark:from-[var(--dark-surface)]/40 pt-8 pb-6 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-5xl font-black text-gray-900 dark:text-[var(--dark-text)] tracking-tight">
              Découvrez les événements
            </h1>

            <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400">
              Cotonou • Porto-Novo • Parakou • et partout au Bénin
            </p>
          </div>

          {/* Recherche */}
          <div className="flex items-center gap-2 max-w-xl mx-auto mt-6 bg-white dark:bg-[var(--dark-surface)] p-2 rounded-2xl shadow-xl border border-gray-100 dark:border-[var(--dark-border)]">
            <div className="flex-1 min-w-0">
              <Input
                placeholder="Rechercher un événement, un artiste..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                icon={Search}
                className="border-none bg-transparent shadow-none focus:ring-0"
              />
            </div>

            <button
              type="button"
              onClick={() => setIsFilterModalOpen(true)}
              aria-label="Ouvrir les filtres"
              className="relative shrink-0 p-3 bg-[var(--primary)] text-white rounded-xl hover:bg-orange-600 active:scale-95 transition shadow-md shadow-orange-600/20"
            >
              <SlidersHorizontal size={20} />

              {hasActiveFilters && (
                <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-red-500 border-2 border-white dark:border-[var(--dark-surface)]" />
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Catégories */}
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div
          ref={categoryContainerRef}
          className="flex gap-3 overflow-x-auto no-scrollbar pb-1"
        >
          {isLoadingCategories ? (
            <div className="flex items-center justify-center w-full py-2">
              <Spinner size={20} />
            </div>
          ) : (
            categoryTabs.map((cat) => {
              const Icon = cat.icon;
              const isActive = category === cat.id;

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl font-semibold text-sm whitespace-nowrap transition active:scale-95 ${
                    isActive
                      ? "bg-[var(--primary)] text-white shadow-md shadow-orange-600/20"
                      : "bg-white dark:bg-[var(--dark-surface)] text-gray-600 dark:text-gray-300 border border-gray-100 dark:border-[var(--dark-border)] hover:bg-gray-50 dark:hover:bg-[var(--dark-border)]"
                  }`}
                >
                  {typeof Icon === "string" ? (
                    <span>{Icon}</span>
                  ) : (
                    <Icon size={16} />
                  )}

                  <span>{cat.label}</span>
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* À venir / Passés */}
      <div className="max-w-6xl mx-auto px-4 mt-2">
        <div className="inline-flex p-1 bg-gray-100 dark:bg-[var(--dark-surface)] rounded-xl border border-gray-200 dark:border-[var(--dark-border)]">
          <button
            type="button"
            onClick={() => handleStatusChange("upcoming")}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
              status === "upcoming"
                ? "bg-white dark:bg-[var(--dark-background)] text-[var(--primary)] shadow-sm"
                : "text-gray-500 dark:text-gray-400"
            }`}
          >
            À venir
          </button>

          <button
            type="button"
            onClick={() => handleStatusChange("past")}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
              status === "past"
                ? "bg-white dark:bg-[var(--dark-background)] text-[var(--primary)] shadow-sm"
                : "text-gray-500 dark:text-gray-400"
            }`}
          >
            Passés
          </button>
        </div>
      </div>

      {/* Liste */}
      <main className="max-w-6xl mx-auto px-4 mt-5">
        {!isLoading && (
          <div className="flex items-center justify-between gap-4 mb-5">
            <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">
              {totalEvents} événement
              {totalEvents > 1 ? "s" : ""}
            </p>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={resetFilters}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--primary)] hover:underline"
              >
                <X size={14} />
                Effacer les filtres
              </button>
            )}
          </div>
        )}

        {/* Chargement */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-24">
            <Spinner size={40} />

            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              Recherche des événements...
            </p>
          </div>
        ) : events.length === 0 ? (
          /* Aucun événement */
          <div className="flex flex-col items-center justify-center text-center py-20 px-6">
            <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-orange-100 dark:bg-orange-950/40 mb-5">
              <Calendar
                size={28}
                className="text-[var(--primary)]"
              />
            </div>

            <h2 className="text-lg font-bold text-gray-900 dark:text-[var(--dark-text)]">
              Aucun événement{" "}
              {status === "upcoming" ? "à venir" : "passé"}
            </h2>

            <p className="max-w-sm mt-2 text-sm text-gray-500 dark:text-gray-400">
              {status === "upcoming"
                ? "Aucun événement à venir ne correspond à vos critères."
                : "Aucun événement passé ne correspond à vos critères."}
            </p>

            {hasActiveFilters && (
              <Button
                variant="outline"
                onClick={resetFilters}
                className="mt-5"
              >
                Réinitialiser les filtres
              </Button>
            )}
          </div>
        ) : (
          <>
            {/* Cartes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
              {events.map((event) => (
                <article
                  key={event.id}
                  className="group bg-white dark:bg-[var(--dark-surface)] rounded-3xl overflow-hidden shadow-lg border border-gray-100 dark:border-[var(--dark-border)] transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
                >
                  <EventGallery event={event} />

                  <div className="p-5">
                    {/* Titre */}
                    <h2 className="text-lg font-bold text-gray-900 dark:text-[var(--dark-text)] tracking-tight line-clamp-1">
                      {event.title}
                    </h2>

                    {/* Date */}
                    <div className="mt-4 space-y-2.5 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-start gap-2">
                        <Calendar
                          size={16}
                          className="shrink-0 mt-0.5 text-[var(--primary)]"
                        />

                        <p>
                          {formatDate(event.start_date)}
                          {" · "}
                          {formatTime(event.start_date)}
                          {" → "}
                          {formatDate(event.end_date)}
                          {" · "}
                          {formatTime(event.end_date)}
                        </p>
                      </div>

                      {/* Lieu */}
                      <div className="flex items-center gap-2">
                        <MapPin
                          size={16}
                          className="shrink-0 text-[var(--primary)]"
                        />

                        <span className="truncate">
                          {event.city}, {event.country}
                        </span>
                      </div>
                    </div>

                    {/* Tickets */}
                    <EventTickets tickets={event.tickets} />

                    {/* Footer */}
                    <div className="flex items-center justify-between gap-3 mt-5 pt-4 border-t border-gray-100 dark:border-[var(--dark-border)]">
                      <div>
                        <p className="text-[10px] uppercase tracking-wide font-semibold text-gray-400 dark:text-gray-500">
                          Billets à partir de
                        </p>

                        <p className="font-black text-lg text-[var(--primary)]">
                          {event.tickets?.length > 0
                            ? `${formatPrice(
                                Math.min(
                                  ...event.tickets.map((ticket) =>
                                    Number(ticket.regular_price)
                                  )
                                )
                              )} FCFA`
                            : "—"}
                        </p>
                      </div>

                      <Link
                        to={`/events/${event.id}/details`}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-sm font-bold text-gray-900 dark:text-[var(--dark-text)] hover:text-white hover:bg-[var(--primary)] transition-all duration-200"
                      >
                        <span>Voir</span>

                        <ArrowRight
                          size={16}
                          className="transition-transform group-hover:translate-x-0.5"
                        />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-10">
                <button
                  type="button"
                  disabled={currentPage === 1}
                  onClick={() => goToPage(currentPage - 1)}
                  className="w-10 h-10 flex items-center justify-center rounded-xl border border-gray-200 dark:border-[var(--dark-border)] bg-white dark:bg-[var(--dark-surface)] text-gray-600 dark:text-gray-300 disabled:opacity-40 disabled:cursor-not-allowed hover:border-[var(--primary)] hover:text-[var(--primary)] transition"
                  aria-label="Page précédente"
                >
                  <ChevronLeft size={18} />
                </button>

                <span className="px-4 text-sm font-semibold text-gray-600 dark:text-gray-300">
                  {currentPage} / {totalPages}
                </span>

                <button
                  type="button"
                  disabled={currentPage === totalPages}
                  onClick={() => goToPage(currentPage + 1)}
                  className="w-10 h-10 flex items-center justify-center rounded-xl border border-gray-200 dark:border-[var(--dark-border)] bg-white dark:bg-[var(--dark-surface)] text-gray-600 dark:text-gray-300 disabled:opacity-40 disabled:cursor-not-allowed hover:border-[var(--primary)] hover:text-[var(--primary)] transition"
                  aria-label="Page suivante"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            )}
          </>
        )}
      </main>

      {/* Filtres */}
      <Modal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        title="Filtrer les événements"
      >
        <div className="space-y-5 py-2">
          <Input
            label="Ville ou lieu"
            placeholder="Ex : Cotonou"
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
              setPage(1);
            }}
          />

          <Input
            label="Date"
            type="date"
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
              setPage(1);
            }}
          />

          <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-3">
            <Button
              variant="outline"
              onClick={resetFilters}
              className="w-full sm:w-auto"
            >
              Réinitialiser
            </Button>

            <Button
              onClick={() => setIsFilterModalOpen(false)}
              className="w-full sm:w-auto"
            >
              Appliquer les filtres
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}