import React, { useEffect } from "react";
import { X } from "lucide-react";

export default function Modal({ isOpen, onClose, title, children }) {
  // Fermer la modale avec la touche "Escape"
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      {/* Conteneur de la modale */}
      <div
        className="relative w-full max-w-lg bg-white dark:bg-[var(--dark-surface)] rounded-2xl shadow-2xl border border-gray-100 dark:border-[var(--dark-border)] p-6 overflow-hidden transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* En-tête */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-100 dark:border-[var(--dark-border)]">
          <h3 className="text-lg font-bold text-gray-900 dark:text-[var(--dark-text)]">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-[var(--dark-surface-soft)] transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Corps */}
        <div className="text-gray-600 dark:text-gray-300">{children}</div>
      </div>
    </div>
  );
}
