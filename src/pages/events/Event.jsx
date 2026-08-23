import React, { useState } from "react";
import {
  Search,
  SlidersHorizontal,
  Calendar,
  MapPin,
  ArrowRight,
  Sparkles,
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
  const options = {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return new Date(dateString)
    .toLocaleDateString("fr-FR", options)
    .replace(".", "");
};

export default function Events() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(""); // id vide = tous
  const [date, setDate] = useState("");
  const [city, setCity] = useState("");
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const { data: eventsData, isLoading } = useEvents({
    search,
    category,
    date,
    city,
  });
  const { data: categories, isLoading: isLoadingCategories } = useCategories();

  const categoryTabs = [
    { id: "", label: "Tous", icon: Sparkles },
    ...(categories?.map((cat) => ({
      id: cat.id, // 1, 2, 3
      label: cat.title,
      icon:
        cat.title === "concert"
          ? "🎵"
          : cat.title === "gastronomie"
            ? "🍽️"
            : "🎉",
    })) || []),
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[var(--dark-background)] pb-16 transition-colors duration-200">
      {/* Hero */}
      <div className="bg-gradient-to-b from-orange-50/50 to-transparent dark:from-[var(--dark-surface)]/30 pt-8 pb-6 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <h1 className="text-3xl sm:text-5xl font-black text-gray-900 dark:text-[var(--dark-text)] tracking-tight">
            
            Découvrez les événements
          </h1>
          <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400">
            
            Cotonou • Porto-Novo • Parakou • et partout au Bénin
          </p>
          <div className="flex items-center gap-2 max-w-xl mx-auto mt-6 bg-white dark:bg-[var(--dark-surface)] p-2 rounded-2xl shadow-xl border border-gray-100 dark:border-[var(--dark-border)]">
            <div className="flex-1">
              <Input
                placeholder="Recher un événement, un artiste..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                icon={Search}
                className="border-none bg-transparent shadow-none focus:ring-0"
              />
            </div>
            <button
              onClick={() => setIsFilterModalOpen(true)}
              className="p-3 bg-[var(--primary)] text-white rounded-xl hover:bg-orange-600 transition shadow-md shadow-orange-600/20"
            >
              <SlidersHorizontal size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Onglets Catégories */}
      <div className="max-w-4xl mx-auto px-4 py-4 flex gap-3 overflow-x-auto no-scrollbar">
        {isLoadingCategories ? (
          <Spinner size={20} />
        ) : (
          categoryTabs.map((cat) => {
            const Icon = cat.icon; 
            return (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.id)}
                className={`flex items-center space-x-2 px-5 py-2.5 rounded-2xl font-semibold text-sm whitespace-nowrap transition shadow-sm ${category === cat.id ? "bg-[var(--primary)] text-white shadow-orange-600/25" : "bg-white dark:bg-[var(--dark-surface)] text-gray-600 dark:text-gray-300 border border-gray-100 dark:border-[var(--dark-border)] hover:bg-gray-50"}`}
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

      {/* Liste Events */}
        {eventsData?.meta?.total ===0 ? (<div className="text-center flex justify-center m-5 p-5">
            Aucun evenement
        </div>) : (
      <div className="max-w-4xl mx-auto px-4 mt-6"> 

        <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-4">
          
          {eventsData?.meta?.total || 0} événement(s) trouvé(s)
        </p>

        {isLoading ? (
          <div className="py-20">
            
            <Spinner size={40} />
          </div>
        ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {eventsData?.data?.map((event) => (
              <div
                key={event.id}
                className="bg-white dark:bg-[var(--dark-surface)] rounded-3xl overflow-hidden shadow-xl border border-gray-100 dark:border-[var(--dark-border)] flex-col justify-between transition hover:scale-[1.01]"
              >
                <div className="relative h-48 bg-gradient-to-tr from-gray-900 to-gray-700 flex items-center justify-center">
                  {event.pictures?.[0] ? (
                    <img
                      src={`${PictureBaseUrl.EVENTS}/${event.pictures[0].path}`}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-4xl">🎵</span>
                  )}
                  <span className="absolute top-4 left-4 bg-orange-100 dark:bg-orange-950/80 text-[var(--primary)] text-xs font-bold px-3 py-1 rounded-full shadow-sm capitalize">
                    {event.categories?.[0]?.title}
                  </span>
                </div>

                <div className="p-5 space-y-4">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-[var(--dark-text)] tracking-tight line-clamp-1">
                    
                    {event.title}
                  </h3>
                  <div className="space-y-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center space-x-2">
                      <Calendar size={16} className="text-[var(--primary)]" />
                      <span>{formatDate(event.start_date)}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin size={16} className="text-[var(--primary)]" />
                      <span className="truncate">
                        {event.city}, {event.country}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-[var(--dark-border)]">
                    <span className="font-black text-lg text-[var(--primary)]">
                      
                      2000 FCFA
                    </span>
                    <Link
                      to={`/events/${event.id}/details`}
                      className="inline-flex items-center space-x-1 text-sm font-bold text-gray-900 dark:text-[var(--dark-text)] hover:text-[var(--primary)] transition"
                    >
                      <span>Voir</span> <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>)}

      <Modal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        title="Filtrer les événements"
      >
        <div className="space-y-4 py-2">
          <Input
            label="Filtrer par Ville / Lieu"
            placeholder="Ex: Cotonou"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <Input
            label="Filtrer par Date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <div className="flex justify-end space-x-3 pt-4">
            <Button
              variant="outline"
              onClick={() => {
                setCity("");
                setDate("");
                setCategory("");
              }}
            >
              
              Réinitialiser
            </Button>
            <Button onClick={() => setIsFilterModalOpen(false)}>
              
              Appliquer les filtres
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
