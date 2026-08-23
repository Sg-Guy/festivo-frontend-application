import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  ArrowLeft, Heart, Share2, Calendar, Clock, MapPin, 
  Users, Sparkles, Minus, Plus, Tag, User 
} from "lucide-react";

import Button from "../../Components/ui/Button";
import Spinner from "../../Components/ui/Spinner";
import { useEvent } from "../../hooks/useEvents";

export default function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: event, isLoading } = useEvent(id);

  const [selectedTicket, setSelectedTicket] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [promoCode, setPromoCode] = useState("");

  // Sélectionner le premier ticket par défaut dès que les données arrivent
  React.useEffect(() => {
    if (event?.tickets && event.tickets.length > 0 && !selectedTicket) {
      setSelectedTicket(event.tickets[0]);
    }
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
      <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
        <p className="text-gray-500 mb-4">Événement introuvable.</p>
        <Button onClick={() => navigate(-1)}>Retour</Button>
      </div>
    );
  }

  const handleQuantityChange = (delta) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  const totalPrice = selectedTicket ? selectedTicket.regular_price * quantity : 0;
  
  // Formatage des dates
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  const formatTime = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  };

  // Image de couverture principale (depuis le tableau pictures)
 const mainImage = event.pictures?.[0]?.path ? `http://localhost:8000/storage/${event.pictures[0].path}` : null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[var(--dark-background)] pb-24 transition-colors duration-200">
      
      {/* 1. Hero / Image de couverture */}
      <div className="relative h-64 sm:h-80 lg:h-96 bg-gradient-to-tr from-gray-900 to-gray-700 flex items-center justify-center">
        {mainImage ? (
          <img src={mainImage} alt={event.title} className="w-full h-full object-cover" />
        ) : (
          <span className="text-6xl">🎵</span>
        )}

        {/* Boutons du haut */}
        <div className="absolute top-6 inset-x-6 flex justify-between items-center max-w-7xl mx-auto">
          <button 
            onClick={() => navigate(-1)}
            className="p-3 bg-white/90 dark:bg-[var(--dark-surface)]/90 backdrop-blur-md rounded-full shadow-lg text-gray-900 dark:text-[var(--dark-text)] hover:scale-105 transition"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="flex items-center space-x-3">
            <button className="p-3 bg-white/90 dark:bg-[var(--dark-surface)]/90 backdrop-blur-md rounded-full shadow-lg text-gray-900 dark:text-[var(--dark-text)] hover:scale-105 transition">
              <Heart size={20} />
            </button>
            <button className="p-3 bg-white/90 dark:bg-[var(--dark-surface)]/90 backdrop-blur-md rounded-full shadow-lg text-gray-900 dark:text-[var(--dark-text)] hover:scale-105 transition">
              <Share2 size={20} />
            </button>
          </div>
        </div>

        {/* Badge Catégorie dynamique */}
        <div className="absolute bottom-6 left-6 lg:left-12">
          {event.categories?.[0] && (
            <span className="inline-flex items-center space-x-1 bg-[var(--primary)] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md uppercase">
              <span>🎵</span>
              <span>{event.categories[0].title}</span>
            </span>
          )}
        </div>
      </div>

      {/* 2. Layout Principal en Grille (2 colonnes sur PC) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* COLONNE GAUCHE (Infos, Titre, Cartes, À propos) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Titre */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 dark:text-[var(--dark-text)] tracking-tight">
              {event.title}
            </h1>

            {/* Organisateur info */}
            {event.owner && (
              <div className="flex items-center space-x-3 bg-white dark:bg-[var(--dark-surface)] p-4 rounded-2xl border border-gray-100 dark:border-[var(--dark-border)] shadow-sm">
                <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-950 flex items-center justify-center text-[var(--primary)] font-bold">
                  <User size={20} />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Organisé par</p>
                  <p className="text-sm font-bold text-gray-900 dark:text-[var(--dark-text)]">
                    {event.owner.firstname} {event.owner.lastname}
                  </p>
                </div>
              </div>
            )}

            {/* Grille des Infos (Date, Heure, Lieu, Capacité) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white dark:bg-[var(--dark-surface)] p-4 sm:p-5 rounded-3xl shadow-sm border border-gray-100 dark:border-[var(--dark-border)] flex items-center space-x-4">
                <div className="w-12 h-12 rounded-2xl bg-orange-50 dark:bg-orange-950/50 flex items-center justify-center text-[var(--primary)] shrink-0">
                  <Calendar size={22} />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium">Date de début</p>
                  <p className="text-sm sm:text-base font-bold text-gray-900 dark:text-[var(--dark-text)]">{formatDate(event.start_date)}</p>
                </div>
              </div>

              <div className="bg-white dark:bg-[var(--dark-surface)] p-4 sm:p-5 rounded-3xl shadow-sm border border-gray-100 dark:border-[var(--dark-border)] flex items-center space-x-4">
                <div className="w-12 h-12 rounded-2xl bg-orange-50 dark:bg-orange-950/50 flex items-center justify-center text-[var(--primary)] shrink-0">
                  <Clock size={22} />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium">Heure</p>
                  <p className="text-sm sm:text-base font-bold text-gray-900 dark:text-[var(--dark-text)]">{formatTime(event.start_date)}</p>
                </div>
              </div>

              <div className="bg-white dark:bg-[var(--dark-surface)] p-4 sm:p-5 rounded-3xl shadow-sm border border-gray-100 dark:border-[var(--dark-border)] flex items-center space-x-4">
                <div className="w-12 h-12 rounded-2xl bg-orange-50 dark:bg-orange-950/50 flex items-center justify-center text-[var(--primary)] shrink-0">
                  <MapPin size={22} />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium">Lieu</p>
                  <p className="text-sm sm:text-base font-bold text-gray-900 dark:text-[var(--dark-text)] truncate">{event.location}, {event.city}</p>
                </div>
              </div>

              <div className="bg-white dark:bg-[var(--dark-surface)] p-4 sm:p-5 rounded-3xl shadow-sm border border-gray-100 dark:border-[var(--dark-border)] flex items-center space-x-4">
                <div className="w-12 h-12 rounded-2xl bg-orange-50 dark:bg-orange-950/50 flex items-center justify-center text-[var(--primary)] shrink-0">
                  <Users size={22} />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium">Capacité totale</p>
                  <p className="text-sm sm:text-base font-bold text-gray-900 dark:text-[var(--dark-text)]">{event.capacity} places</p>
                </div>
              </div>
            </div>

            {/* Section À propos */}
            <div className="bg-white dark:bg-[var(--dark-surface)] p-6 sm:p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-[var(--dark-border)] space-y-3">
              <h2 className="text-xl font-bold text-gray-900 dark:text-[var(--dark-text)]">À propos</h2>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                {event.description}
              </p>
            </div>

          </div>

          {/* COLONNE DROITE (Panneau de sélection des billets & Paiement - Sticky) */}
          <div className="lg:col-span-1 bg-white dark:bg-[var(--dark-surface)] p-6 sm:p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-[var(--dark-border)] space-y-6 lg:sticky lg:top-6">
            
            <h2 className="text-xl font-bold text-gray-900 dark:text-[var(--dark-text)]">Choisir vos billets</h2>

            {/* Liste des types de billets dynamiques */}
            <div className="space-y-3">
              {event.tickets?.map((ticket) => {
                const isSelected = selectedTicket?.id === ticket.id;
                return (
                  <div
                    key={ticket.id}
                    onClick={() => setSelectedTicket(ticket)}
                    className={`p-4 rounded-2xl border-2 transition cursor-pointer flex justify-between items-center ${
                      isSelected 
                        ? "border-[var(--primary)] bg-orange-50/30 dark:bg-orange-950/20 shadow-sm" 
                        : "border-gray-100 dark:border-[var(--dark-border)] bg-transparent hover:border-gray-200"
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-sm sm:text-base text-gray-900 dark:text-[var(--dark-text)]">{ticket.name}</span>
                        {ticket.regular_price > 50000 && (
                          <span className="inline-flex items-center space-x-1 bg-amber-100 dark:bg-amber-950 text-amber-600 text-[10px] font-bold px-2 py-0.5 rounded-md">
                            <Sparkles size={10} />
                            <span>VIP</span>
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{ticket.description}</p>
                    </div>

                    <div className="text-right">
                      <p className="font-black text-[var(--primary)] text-base sm:text-lg">{ticket.regular_price} FCFA</p>
                      <p className="text-xs text-gray-400">{ticket.quantity_available} dispo</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Sélecteur de quantité */}
            <div className="flex items-center justify-between pt-2">
              <span className="font-semibold text-sm text-gray-700 dark:text-gray-300">Quantité</span>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-[var(--dark-surface-soft)] flex items-center justify-center text-gray-900 dark:text-[var(--dark-text)] hover:bg-gray-200 transition"
                >
                  <Minus size={18} />
                </button>
                <span className="font-bold text-lg text-gray-900 dark:text-[var(--dark-text)] w-6 text-center">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-[var(--dark-surface-soft)] flex items-center justify-center text-gray-900 dark:text-[var(--dark-text)] hover:bg-gray-200 transition"
                >
                  <Plus size={18} />
                </button>
              </div>
            </div>

            {/* Code Promo */}
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Tag size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Code promo"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 dark:bg-[var(--dark-surface-soft)] border border-gray-200 dark:border-[var(--dark-border)] text-sm text-gray-900 dark:text-[var(--dark-text)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                />
              </div>
              <Button variant="outline" className="rounded-xl px-4 text-xs sm:text-sm">Appliquer</Button>
            </div>

            {/* Récapitulatif Total */}
            <div className="pt-4 space-y-2 border-t border-gray-100 dark:border-[var(--dark-border)]">
              <div className="flex justify-between text-sm text-gray-500">
                <span>{quantity} × {selectedTicket?.name || "Billet"}</span>
                <span>{totalPrice} FCFA</span>
              </div>
              <div className="flex justify-between items-center text-lg font-black text-gray-900 dark:text-[var(--dark-text)]">
                <span>Total</span>
                <span className="text-[var(--primary)] text-xl sm:text-2xl">{totalPrice} FCFA</span>
              </div>
            </div>

            {/* Bouton Payer */}
            <Button className="w-full py-4 rounded-2xl text-base font-bold shadow-lg shadow-orange-600/25">
              Payer maintenant
            </Button>

          </div>

        </div>
      </div>
    </div>
  );
}