import React, { useState } from "react";
import {
  Calendar,
  MapPin,
  Users,
  Tag,
  Ticket,
  ArrowLeft,
  Edit,
  Trash2,
  Globe,
  Lock,
  Loader2,
  Mail,
  Phone,
} from "lucide-react";
import { PictureBaseUrl } from "../../../constants/picturesBaseUrl";
import Button from "../../../Components/ui/Button";
import { navigateTo } from "../../../utils/navigation";
import { useDeleteEvent, useEventDetails } from "../../../hooks/useEvents";
import { useParams } from "react-router-dom";

export default function OrganizerEventDetails({
  eventId: propEventId,
  onBack,
  onEdit,
}) {
  // Récupération de l'ID soit par les props, soit par l'URL 
  const { id: urlEventId } = useParams();
  const eventId = propEventId || urlEventId;

  const { data: event, isLoading, error } = useEventDetails(eventId);

  const { mutate: deleteEvent, isPending: isEventDeleting } = useDeleteEvent();

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="animate-spin text-[var(--primary)]" size={36} />
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="text-center py-16 space-y-3">
        <p className="text-sm font-medium text-red-500">
          Impossible de charger les détails de cet événement.
        </p>
        <Button
          variant="secondary"
          onClick={() => (onBack ? onBack() : navigateTo(-1))}
        >
          Retour
        </Button>
      </div>
    );
  }

  const isDraft = event.status === "draft";
  const mainPicture = event.pictures?.[activeImageIndex];
  const mainPictureUrl = mainPicture
    ? mainPicture.path.startsWith("http")
      ? mainPicture.path
      : `${PictureBaseUrl.EVENTS}/${mainPicture.path}`
    : null;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Barre de navigation haute */}
      <div className="flex justify-between items-center">
        <button
          onClick={() => (onBack ? onBack() : navigateTo(-1))}
          className="flex items-center gap-2 text-xs font-semibold text-gray-600 dark:text-gray-400 hover:text-[var(--primary)] transition"
        >
          <ArrowLeft size={16} /> Retour à la liste
        </button>

        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            onClick={() => onEdit && onEdit(event.id)}
          >
            <Edit size={16} /> Modifier
          </Button>
          <Button
            variant="danger"
            className="bg-red-50 text-red-600 hover:bg-red-100 border-none"
            isLoading = {isEventDeleting}
            loadingText="Suppression..."
            onClick={() => 
                deleteEvent(event.id , {
                    onSuccess: ()=> {
                        navigateTo(-1);
                    }
                })
            }
            >
            <Trash2 size={16} /> Supprimer
          </Button>
        </div>
      </div>

      {/* En-tête de l'événement : Titre, Statut et Référence */}
      <div className="bg-white dark:bg-[var(--dark-surface)] p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-bold text-gray-400 tracking-wider">
              #{event.reference}
            </span>
            {isDraft ? (
              <span className="px-3 py-1 bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-400 text-[10px] font-bold rounded-full uppercase tracking-wider border border-amber-200">
                Brouillon
              </span>
            ) : (
              <span className="px-3 py-1 bg-green-100 text-green-800 dark:bg-green-950/80 dark:text-green-400 text-[10px] font-bold rounded-full uppercase tracking-wider border border-green-200">
                Publié
              </span>
            )}
            <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-[10px] font-bold rounded-full flex items-center gap-1">
              {event.is_public ? <Globe size={12} /> : <Lock size={12} />}
              {event.is_public ? "Public" : "Privé"}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white">
            {event.title}
          </h1>
        </div>

        {/* Catégories */}
        <div className="flex flex-wrap gap-2">
          {event.categories?.map((cat) => (
            <span
              key={cat.id}
              className="px-3 py-1.5 bg-[var(--primary)]/10 text-[var(--primary)] text-xs font-bold rounded-xl flex items-center gap-1.5"
            >
              <Tag size={13} /> {cat.title}
            </span>
          ))}
        </div>
      </div>

      {/* Corps principal : Galerie & Infos Clés */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Colonne de Gauche : Détails pratiques & Billets */}
        <div className="space-y-6">
          {/* Informations pratiques */}
          <div className="bg-white dark:bg-[var(--dark-surface)] p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 space-y-4">
            <h3 className="font-bold text-sm text-gray-900 dark:text-white">
              Informations pratiques
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-3 text-gray-600 dark:text-gray-300">
                <Calendar
                  className="text-[var(--primary)] shrink-0 mt-0.5"
                  size={16}
                />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    Du : {event.start_date}
                  </p>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    Au : {event.end_date}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 text-gray-600 dark:text-gray-300">
                <MapPin
                  className="text-[var(--primary)] shrink-0 mt-0.5"
                  size={16}
                />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {event.location}
                  </p>
                  <p className="text-gray-400">
                    {event.city}, {event.country}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                <Users className="text-[var(--primary)] shrink-0" size={16} />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    Capacité maximale
                  </p>
                  <p className="text-gray-400">{event.capacity} participants</p>
                </div>
              </div>
            </div>
          </div>

          {/* Billets / Tarifs configurés */}
          <div className="bg-white dark:bg-[var(--dark-surface)] p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 space-y-4">
            <h3 className="font-bold text-sm text-gray-900 dark:text-white flex items-center gap-2">
              <Ticket size={16} className="text-[var(--primary)]" /> Types de
              Billets ({event.tickets?.length || 0})
            </h3>

            <div className="space-y-3">
              {event.tickets &&
                event.tickets.map((ticket) => (
                  <div
                    key={ticket.id}
                    className="p-3.5 bg-gray-50 dark:bg-gray-900/40 border border-gray-100 dark:border-gray-800 rounded-xl space-y-2"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-xs text-gray-900 dark:text-white">
                        {ticket.name}
                      </span>
                      <span className="text-xs font-black text-[var(--primary)]">
                        {ticket.regular_price} XOF
                      </span>
                    </div>
                    {ticket.description && (
                      <p className="text-[11px] text-gray-500">
                        {ticket.description}
                      </p>
                    )}
                    <div className="flex justify-between items-center text-[10px] text-gray-400 pt-1 border-t border-gray-200/50 dark:border-gray-800">
                      <span>Stock : {ticket.quantity_available} dispo</span>
                      <span className="font-mono">{ticket.path}</span>
                    </div>
                  </div>
                ))}

              {(!event.tickets || event.tickets.length === 0) && (
                <p className="text-xs text-gray-400 text-center py-4">
                  Aucun billet configuré pour cet événement.
                </p>
              )}
            </div>
          </div>

          {/* Informations Propriétaire (Organisateur) */}
          {event.owner && (
            <div className="bg-white dark:bg-[var(--dark-surface)] p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 space-y-3">
              <h3 className="font-bold text-sm text-gray-900 dark:text-white">
                Organisateur
              </h3>
              <div className="text-xs space-y-1 text-gray-600 dark:text-gray-300">
                <p className="font-bold text-gray-900 dark:text-white text-sm">
                  {event.owner.firstname} {event.owner.lastname}
                </p>
                <p className="flex items-center gap-1.5 text-gray-400">
                  <Mail size={13} /> {event.owner.email}
                </p>
                <p className="flex items-center gap-1.5 text-gray-400">
                  <Phone size={13} /> {event.owner.phone}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Colonne de Droite : Galerie Photos */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white dark:bg-[var(--dark-surface)] p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 space-y-4">
            <h3 className="font-bold text-sm text-gray-900 dark:text-white">
              Galerie & Affiche
            </h3>

            {/* Image Principale */}
            <div className="h-72 sm:h-96 bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden relative">
              {mainPictureUrl ? (
                <img
                  src={mainPictureUrl}
                  alt="Vue principale"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
                  Aucune image disponible
                </div>
              )}
              {mainPicture?.caption && (
                <div className="absolute bottom-0 inset-x-0 bg-black/60 backdrop-blur-xs p-3 text-xs text-white">
                  {mainPicture.caption}
                </div>
              )}
            </div>

            {/* Miniatures */}
            {event.pictures && event.pictures.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {event.pictures.map((pic, idx) => {
                  const thumbUrl = pic.path.startsWith("http")
                    ? pic.path
                    : `${PictureBaseUrl.EVENTS}/${pic.path}`;
                  return (
                    <button
                      key={pic.id}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition shrink-0 ${idx === activeImageIndex ? "border-[var(--primary)] scale-105" : "border-transparent opacity-70"}`}
                    >
                      <img
                        src={thumbUrl}
                        alt="Miniature"
                        className="w-full h-full object-cover"
                      />
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Description */}
          <div className="bg-white dark:bg-[var(--dark-surface)] p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 space-y-3">
            <h3 className="font-bold text-sm text-gray-900 dark:text-white">
              À propos de l'événement
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">
              {event.description || "Aucune description détaillée fournie."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
