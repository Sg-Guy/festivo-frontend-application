import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Heart,
  Share2,
  CalendarDays,
  Clock3,
  MapPin,
  Users,
  ShoppingBag,
  Minus,
  Plus,
  ChevronLeft,
  ChevronRight,
  Check,
  Music,
  CircleCheck,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

import Button from "../../Components/ui/Button";
import Spinner from "../../Components/ui/Spinner";
import { useEvent } from "../../hooks/useEvents";
import { useAddToBasket } from "../../hooks/useBasket";
import { PictureBaseUrl } from "../../constants/picturesBaseUrl";

/* ── Helpers ──────────────────────────────────────────────── */

const formatDate = (dateString) => {
  if (!dateString) return "";

  return new Date(dateString).toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
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

const formatPrice = (price) =>
  new Intl.NumberFormat("fr-FR").format(price || 0);

const extractBasketErrors = (error, ticketsPayload) => {
  const errors = error?.response?.data?.errors;

  if (!errors) {
    return {};
  }

  const ticketErrors = {};
  const messages = errors.message || [];

  messages.forEach((message) => {
    const match = message.match(/tickets\.(\d+)\./);

    if (!match) {
      return;
    }

    const index = Number(match[1]);
    const ticket = ticketsPayload[index];

    if (!ticket) {
      return;
    }

    ticketErrors[ticket.id] = message;
  });

  return ticketErrors;
};

/* ── Galerie hero ─────────────────────────────────────────── */

function EventGallery({ event }) {
  const pictures = event.pictures || [];
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () =>
    setCurrentIndex((index) => (index === pictures.length - 1 ? 0 : index + 1));

  const prev = () =>
    setCurrentIndex((index) => (index === 0 ? pictures.length - 1 : index - 1));

  return (
    <div className="relative h-[360px] sm:h-[440px] lg:h-[500px] overflow-hidden rounded-b-[2rem] group bg-gradient-to-br from-[#1a2436] via-[#111827] to-[#0a0f1d]">
      {pictures.length > 0 ? (
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={`${PictureBaseUrl.EVENTS}/${pictures[currentIndex].path}`}
            alt={`${event.title} — image ${currentIndex + 1}`}
            className="w-full h-full object-cover"
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          />
        </AnimatePresence>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center text-[120px] opacity-10 select-none">
          🎵
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/20 pointer-events-none" />

      <div className="absolute top-5 left-4 right-4 flex justify-between items-center">
        <motion.button
          whileTap={{ scale: 0.93 }}
          onClick={() => window.history.back()}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/30 backdrop-blur-md text-white text-sm font-medium border border-white/15 hover:bg-black/50 transition-colors"
          aria-label="Retour"
        >
          <ArrowLeft size={16} />
          Retour
        </motion.button>

        <div className="flex gap-2">
          {[
            { Icon: Heart, label: "Ajouter aux favoris" },
            { Icon: Share2, label: "Partager" },
          ].map(({ Icon, label }) => (
            <motion.button
              key={label}
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 rounded-full bg-black/30 backdrop-blur-md border border-white/15 text-white flex items-center justify-center hover:bg-black/50 transition-colors"
              aria-label={label}
            >
              <Icon size={17} />
            </motion.button>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 px-5 pb-7">
        {event.categories?.[0] && (
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--primary)]/20 border border-[var(--primary)]/40 text-[var(--primary)] text-[11px] font-semibold tracking-wider uppercase mb-3"
            style={{ color: "#fb923c" }}
          >
            <Music size={10} />
            {event.categories[0].title}
          </motion.span>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-white text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight tracking-tight mb-4"
        >
          {event.title}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28 }}
          className="flex items-center gap-3 flex-wrap"
        >
          {event.owner && (
            <div className="flex items-center gap-2.5">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold border-2 border-white/20"
                style={{ backgroundColor: "var(--primary)" }}
              >
                {event.owner.firstname?.charAt(0)}
                {event.owner.lastname?.charAt(0)}
              </div>

              <div>
                <p className="text-white/60 text-[10px] uppercase tracking-wide">
                  Organisé par
                </p>
                <p className="text-white text-sm font-medium leading-tight">
                  {event.owner.firstname} {event.owner.lastname}
                </p>
              </div>
            </div>
          )}

          {event.status === "published" && (
            <span className="ml-auto flex items-center gap-1.5 bg-[var(--primary)]/20 border border-[var(--primary)]/40 text-[#fb923c] text-[11px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] animate-pulse" />
              Publié
            </span>
          )}
        </motion.div>

        {pictures.length > 1 && (
          <div className="flex gap-1.5 mt-4">
            {pictures.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "w-5 bg-[var(--primary)]"
                    : "w-1.5 bg-white/30"
                }`}
                aria-label={`Image ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {pictures.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/30 backdrop-blur-sm text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/60"
            aria-label="Image précédente"
          >
            <ChevronLeft size={18} />
          </button>

          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/30 backdrop-blur-sm text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/60"
            aria-label="Image suivante"
          >
            <ChevronRight size={18} />
          </button>
        </>
      )}
    </div>
  );
}

/* ── Carte méta ───────────────────────────────────────────── */

function MetaCard({ icon: Icon, label, value, iconColor, iconBg }) {
  return (
    <div className="flex items-start gap-3 p-4 rounded-2xl bg-white dark:bg-[var(--dark-surface)] border border-gray-100 dark:border-[var(--dark-border)]">
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
        style={{ background: iconBg }}
      >
        <Icon size={19} style={{ color: iconColor }} />
      </div>

      <div className="min-w-0">
        <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">
          {label}
        </p>
        <p className="text-sm font-semibold text-gray-900 dark:text-[var(--dark-text)] truncate">
          {value}
        </p>
      </div>
    </div>
  );
}

/* ── Option de billet ─────────────────────────────────────── */

function TicketOption({
  ticket,
  selection,
  error,
  onQuantityChange,
  onPromoCodeChange,
}) {
  const quantity = selection?.quantity || 0;
  const isSelected = quantity > 0;
  const isSoldOut = ticket.quantity_available <= 0;

  return (
    <motion.div
      layout
      className={[
        "p-4 rounded-2xl border-[1.5px] transition-all duration-200",
        isSoldOut
          ? "opacity-50 border-gray-100 dark:border-[var(--dark-border)]"
          : isSelected
            ? "border-[var(--primary)] bg-orange-50/50 dark:bg-[var(--primary)]/10"
            : "border-gray-100 dark:border-[var(--dark-border)] bg-white dark:bg-[var(--dark-surface)]",
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-sm text-gray-900 dark:text-[var(--dark-text)]">
              {ticket.name}
            </span>

            {isSelected && (
              <motion.span
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-5 h-5 rounded-full bg-[var(--primary)] flex items-center justify-center shrink-0"
              >
                <Check size={11} color="#fff" strokeWidth={3} />
              </motion.span>
            )}
          </div>

          {ticket.description && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
              {ticket.description}
            </p>
          )}

          <p className="text-xs mt-2">
            {isSoldOut ? (
              <span className="text-red-500 font-medium">Épuisé</span>
            ) : (
              <span className="text-[var(--primary)] font-medium">
                {ticket.quantity_available} disponible
                {ticket.quantity_available > 1 ? "s" : ""}
              </span>
            )}
          </p>
        </div>

        <span
          className={[
            "font-bold text-sm whitespace-nowrap",
            isSoldOut ? "text-gray-400" : "text-[var(--primary)]",
          ].join(" ")}
        >
          {formatPrice(ticket.regular_price)} FCFA
        </span>
      </div>

      {!isSoldOut && (
        <>
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200/70 dark:border-white/10">
            <div>
              <p className="text-xs font-medium">Quantité</p>
              <p className="text-[11px] text-gray-400 mt-0.5">
                Max : {ticket.quantity_available}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <motion.button
                whileTap={{ scale: 0.9 }}
                type="button"
                disabled={quantity <= 0}
                onClick={() => onQuantityChange(ticket, -1)}
                className="w-9 h-9 rounded-xl bg-gray-100 dark:bg-[var(--dark-surface-soft)] flex items-center justify-center disabled:opacity-30 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label={`Diminuer la quantité de ${ticket.name}`}
              >
                <Minus size={15} />
              </motion.button>

              <span className="w-6 text-center font-bold text-base">
                {quantity}
              </span>

              <motion.button
                whileTap={{ scale: 0.9 }}
                type="button"
                disabled={quantity >= ticket.quantity_available}
                onClick={() => onQuantityChange(ticket, 1)}
                className="w-9 h-9 rounded-xl bg-gray-100 dark:bg-[var(--dark-surface-soft)] flex items-center justify-center disabled:opacity-30 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label={`Augmenter la quantité de ${ticket.name}`}
              >
                <Plus size={15} />
              </motion.button>
            </div>
          </div>

          {isSelected && (
            <div className="mt-4">
              <label
                htmlFor={`promo-${ticket.id}`}
                className="text-xs font-medium text-gray-500 dark:text-gray-400"
              >
                Code promo
              </label>

              <input
                id={`promo-${ticket.id}`}
                type="text"
                value={selection?.promo_code || ""}
                onChange={(e) => onPromoCodeChange(ticket.id, e.target.value)}
                placeholder="Entrez votre code promo"
                className={[
                  "w-full mt-1.5 px-3 py-2.5 rounded-xl border",
                  "text-sm bg-gray-50 dark:bg-[var(--dark-surface-soft)]",
                  "text-gray-900 dark:text-[var(--dark-text)]",
                  "outline-none transition-colors",
                  error
                    ? "border-red-400 focus:border-red-500"
                    : "border-gray-200 dark:border-[var(--dark-border)] focus:border-[var(--primary)]",
                ].join(" ")}
              />

              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 text-xs text-red-500 leading-relaxed"
                >
                  {error}
                </motion.p>
              )}
            </div>
          )}

          {!isSelected && error && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3 text-xs text-red-500 leading-relaxed"
            >
              {error}
            </motion.p>
          )}
        </>
      )}

      {isSoldOut && error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 text-xs text-red-500 leading-relaxed"
        >
          {error}
        </motion.p>
      )}
    </motion.div>
  );
}

/* ── Page principale ──────────────────────────────────────── */

export default function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: event, isLoading } = useEvent(id);

  const [ticketSelections, setTicketSelections] = useState({});
  const [basketErrors, setBasketErrors] = useState({});
  const [basketMessage, setBasketMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const { mutate: addToBasket, isPending: isAddingToBasket } = useAddToBasket();

  useEffect(() => {
    if (!event?.tickets?.length) {
      return;
    }

    setTicketSelections((previous) => {
      const next = {};

      event.tickets.forEach((ticket) => {
        if (previous[ticket.id]) {
          next[ticket.id] = previous[ticket.id];
        }
      });

      return next;
    });
  }, [event]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[var(--dark-background)]">
        <Spinner size={40} />
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center bg-gray-50 dark:bg-[var(--dark-background)]">
        <div className="w-16 h-16 rounded-2xl bg-orange-50 flex items-center justify-center text-3xl mb-5">
          🎫
        </div>

        <h1 className="text-xl font-bold text-gray-900 dark:text-[var(--dark-text)] mb-2">
          Événement introuvable
        </h1>

        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          Cet événement n'est plus disponible.
        </p>

        <Button onClick={() => navigate(-1)}>Retour</Button>
      </div>
    );
  }

  const handleQuantityChange = (ticket, delta) => {
    setTicketSelections((previous) => {
      const current = previous[ticket.id] || {
        quantity: 0,
        promo_code: "",
      };

      const nextQuantity = Math.min(
        Math.max(0, current.quantity + delta),
        ticket.quantity_available,
      );

      const next = { ...previous };

      if (nextQuantity === 0) {
        delete next[ticket.id];
      } else {
        next[ticket.id] = {
          ...current,
          quantity: nextQuantity,
        };
      }

      return next;
    });

    setBasketErrors((previous) => {
      const next = { ...previous };
      delete next[ticket.id];
      return next;
    });

    setBasketMessage("");
    setIsSuccess(false);
  };

  const handlePromoCodeChange = (ticketId, value) => {
    setTicketSelections((previous) => ({
      ...previous,
      [ticketId]: {
        ...(previous[ticketId] || { quantity: 0 }),
        promo_code: value,
      },
    }));

    setBasketErrors((previous) => {
      const next = { ...previous };
      delete next[ticketId];
      return next;
    });

    setBasketMessage("");
    setIsSuccess(false);
  };

  const buildTicketsPayload = () => {
    return Object.entries(ticketSelections)
      .filter(([, selection]) => selection.quantity > 0)
      .map(([ticketId, selection]) => ({
        id: Number(ticketId),
        promo_code: selection.promo_code?.trim() || "",
        quantity: selection.quantity,
      }));
  };

  const handleContinue = () => {
    const ticketsPayload = buildTicketsPayload();

    if (ticketsPayload.length === 0) {
      setBasketMessage("Sélectionnez au moins une catégorie de billet.");
      setIsSuccess(false);
      return;
    }

    setBasketErrors({});
    setBasketMessage("");
    setIsSuccess(false);

    addToBasket(
      {
        eventId: event.id,
        tickets: ticketsPayload,
      },
      {
        onSuccess: (response) => {
          const basketId = response?.data?.id;

          if (!basketId) {
            setBasketMessage(
              "Impossible de récupérer les informations de votre panier !",
            );
            setIsSuccess(false);
            return;
          }

          navigate(`/baskets/${basketId}`);
        },

        onError: (error) => {
          const errors = extractBasketErrors(error, ticketsPayload);
          setBasketErrors(errors);

          if (Object.keys(errors).length === 0) {
            setBasketMessage(
              error?.response?.data?.message ||
                "Impossible de valider votre sélection.",
            );
          } else {
            setBasketMessage("");
          }

          setIsSuccess(false);
        },
      },
    );
  };

  const totalQuantity = Object.values(ticketSelections).reduce(
    (total, selection) => total + selection.quantity,
    0,
  );

  const totalPrice =
    event.tickets?.reduce((total, ticket) => {
      const quantity = ticketSelections[ticket.id]?.quantity || 0;
      return total + ticket.regular_price * quantity;
    }, 0) || 0;

  const location = [event.location, event.city].filter(Boolean).join(", ");

  const fillRate = event.capacity
    ? Math.round(
        ((event.capacity - (2000 ?? 0)) / event.capacity) *
          100,
      )
    : 0;

  return (
    <div className="min-h-screen bg-[var(--background)] dark:bg-[var(--dark-background)] text-[var(--text)] dark:text-[var(--dark-text)] pb-32 transition-colors duration-200">
      <EventGallery event={event} />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 lg:gap-10 items-start">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <MetaCard
                icon={CalendarDays}
                label="Date"
                value={formatDate(event.start_date)}
                iconColor="var(--primary)"
                iconBg="rgba(234, 88, 12, 0.1)"
              />

              <MetaCard
                icon={Clock3}
                label="Horaires"
                value={`${formatTime(event.start_date)} → ${formatTime(
                  event.end_date,
                )}`}
                iconColor="var(--primary)"
                iconBg="rgba(234, 88, 12, 0.1)"
              />

              <MetaCard
                icon={MapPin}
                label="Lieu"
                value={location || "Lieu non renseigné"}
                iconColor="#3b82f6"
                iconBg="rgba(59, 130, 246, 0.1)"
              />

              <MetaCard
                icon={Users}
                label="Capacité"
                value={`${formatPrice(event.capacity)} places`}
                iconColor="#3b82f6"
                iconBg="rgba(59, 130, 246, 0.1)"
              />
            </div>

            <section>
              <h2 className="text-base font-semibold mb-3">
                À propos de l'événement
              </h2>

              <div className="p-5 sm:p-6 rounded-2xl bg-[var(--surface)] dark:bg-[var(--dark-surface)] border border-[var(--border)] dark:border-[var(--dark-border)]">
                <p className="text-sm text-[var(--text-secondary)] dark:text-[var(--dark-text-secondary)] leading-7 whitespace-pre-line">
                  {event.description || "Aucune description disponible."}
                </p>
              </div>
            </section>

            {event.capacity > 0 && (
              <div className="p-5 rounded-2xl bg-[var(--surface)] dark:bg-[var(--dark-surface)] border border-[var(--border)] dark:border-[var(--dark-border)]">
                <div className="flex justify-between items-center mb-2.5">
                  <span className="text-sm font-medium">Remplissage</span>
                  <span className="text-sm font-semibold text-[var(--primary)]">
                    {fillRate}%
                  </span>
                </div>

                <div className="h-2 rounded-full bg-[var(--surface-soft)] dark:bg-[var(--dark-surface-soft)] overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-[var(--primary)]"
                    initial={{ width: 0 }}
                    animate={{ width: `${fillRate}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />
                </div>

                <p className="text-xs text-[var(--text-muted)] mt-2">
                  {formatPrice(event.available_capacity ?? 0)} places encore
                  disponibles
                </p>
              </div>
            )}
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="lg:sticky lg:top-6"
          >
            <div className="bg-[var(--surface)] dark:bg-[var(--dark-surface)] border border-[var(--border)] dark:border-[var(--dark-border)] rounded-3xl shadow-sm overflow-hidden">
              <div className="px-5 pt-5 pb-3">
                <div className="flex items-center gap-2 mb-1">
                  <ShoppingBag size={17} className="text-[var(--primary)]" />
                  <h2 className="text-base font-semibold">Acheter un billet</h2>
                </div>

                <p className="text-xs text-[var(--text-muted)]">
                  Choisissez les catégories et les quantités souhaitées.
                </p>
              </div>

              <div className="p-4 space-y-2.5">
                {event.tickets?.map((ticket) => (
                  <TicketOption
                    key={ticket.id}
                    ticket={ticket}
                    selection={ticketSelections[ticket.id]}
                    error={basketErrors[ticket.id]}
                    onQuantityChange={handleQuantityChange}
                    onPromoCodeChange={handlePromoCodeChange}
                  />
                ))}
              </div>

              <div className="h-px bg-[var(--border)] dark:bg-[var(--dark-border)] mx-4" />

              <div className="px-5 py-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-[var(--text-muted)]">
                    Sélection
                  </span>
                  <span className="text-xs font-medium text-[var(--text-secondary)] dark:text-[var(--dark-text-secondary)]">
                    {totalQuantity} billet
                    {totalQuantity > 1 ? "s" : ""}
                  </span>
                </div>

                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium">
                      {totalQuantity > 0
                        ? "Total à payer"
                        : "Aucun billet sélectionné"}
                    </p>
                  </div>

                  <p className="text-2xl font-bold text-[var(--primary)] leading-tight whitespace-nowrap">
                    {formatPrice(totalPrice)}{" "}
                    <span className="text-sm font-normal text-[var(--text-muted)]">
                      FCFA
                    </span>
                  </p>
                </div>
              </div>

              {basketMessage && (
                <div className="px-5">
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={[
                      "flex items-center gap-2 text-xs leading-relaxed",
                      isSuccess ? "text-[var(--primary)]" : "text-red-500",
                    ].join(" ")}
                  >
                    {isSuccess && <CircleCheck size={15} strokeWidth={2.5} />}
                    <span>{basketMessage}</span>
                  </motion.div>
                </div>
              )}

              <div className="px-4 pb-5 pt-4">
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  type="button"
                  disabled={totalQuantity === 0 || isAddingToBasket}
                  onClick={handleContinue}
                  className="w-full py-4 rounded-2xl bg-[var(--primary)] hover:bg-[var(--primary-hover)] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-sm flex items-center justify-center gap-2 transition-colors duration-200"
                >
                  <span>
                    {isAddingToBasket ? "Vérification…" : "Continuer"}
                  </span>
                </motion.button>

                <p className="text-[11px] text-center text-[var(--text-muted)] mt-3">
                  Votre sélection sera vérifiée avant de poursuivre.
                </p>
              </div>
            </div>
          </motion.aside>
        </div>
      </main>
      {/* ── Barre mobile sticky ───────────────────────── */}

      <AnimatePresence>
        {totalQuantity > 0 && (
          <motion.div
            initial={{
              y: 100,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            exit={{
              y: 100,
              opacity: 0,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 28,
            }}
            className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[var(--dark-surface)]/95 backdrop-blur-md border-t border-gray-200 dark:border-[var(--dark-border)] px-4 pt-3 pb-safe"
          >
            <div className="flex items-center gap-3 max-w-xl mx-auto">
              <div className="min-w-0 flex-1">
                <p className="text-xs text-gray-400 truncate">
                  {totalQuantity} billet
                  {totalQuantity > 1 ? "s" : ""}
                </p>

                <p className="font-bold text-[#1D9E75] text-base">
                  {formatPrice(totalPrice)} FCFA
                </p>
              </div>

              <motion.button
                whileTap={{
                  scale: 0.96,
                }}
                type="button"
                disabled={isAddingToBasket}
                onClick={handleContinue}
                className="px-5 py-3 rounded-xl bg-[#1D9E75] hover:bg-[#0F6E56] disabled:opacity-50 text-white font-semibold text-sm transition-colors"
              >
                {isAddingToBasket ? "Vérification…" : "Continuer"}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
