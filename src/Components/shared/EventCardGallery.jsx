import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PictureBaseUrl } from "../../constants/picturesBaseUrl";

export function EventCardGallery({ pictures }) {
  const [currentIndex, setCurrentIndex] = useState(0);


  if (!pictures || pictures.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center text-xs text-gray-400 font-medium bg-gray-100 dark:bg-gray-800">
        Aucune image
      </div>
    );
  }

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % pictures.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + pictures.length) % pictures.length);
  };

  const currentPicture = pictures[currentIndex];
  // Si le path commence déjà par http, on l'utilise direct, sinon on le concatène au storage Laravel
  const imageUrl = currentPicture.path.startsWith("http") 
    ? currentPicture.path 
    : `${PictureBaseUrl.EVENTS}/${currentPicture.path}`;

  return (
    <div className="relative w-full h-full group overflow-hidden">
      {/* Image active */}
      <img 
        src={imageUrl} 
        alt={currentPicture.caption || "Aperçu événement"} 
        className="w-full h-full object-cover transition-all duration-300"
      />

      {/* Légende discrète en bas de l'image si elle existe */}
      {currentPicture.caption && (
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent p-2 text-[10px] text-white truncate">
          {currentPicture.caption}
        </div>
      )}

      {/* Flèches de navigation (visibles au survol si plus d'1 image) */}
      {pictures.length > 1 && (
        <>
          <button 
            type="button"
            onClick={prevImage}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition shadow-md"
          >
            <ChevronLeft size={14} />
          </button>
          <button 
            type="button"
            onClick={nextImage}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition shadow-md"
          >
            <ChevronRight size={14} />
          </button>

          {/* Indicateurs (petits points) */}
          <div className="absolute top-3 left-3 flex space-x-1 bg-black/30 px-2 py-1 rounded-full backdrop-blur-xs">
            {pictures.map((_, idx) => (
              <span 
                key={idx} 
                className={`w-1.5 h-1.5 rounded-full transition-all ${idx === currentIndex ? "bg-white w-3" : "bg-white/50"}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}