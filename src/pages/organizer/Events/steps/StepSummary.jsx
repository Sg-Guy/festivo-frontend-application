import React from "react";
import { useFormContext } from "react-hook-form";

export default function StepSummary() {
  const { watch } = useFormContext();
  const values = watch();

  return (
    <div className="bg-white dark:bg-[var(--dark-surface)] p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Récapitulatif de l'événement</h2>
        <span className="px-3 py-1 bg-amber-100 text-amber-800 dark:bg-amber-950/50 dark:text-amber-400 text-xs font-bold rounded-full uppercase tracking-wider">
          Brouillon
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
        <div className="p-5 bg-gray-50 dark:bg-gray-900/50 rounded-2xl border border-gray-100 dark:border-gray-800 space-y-3">
          <h3 className="font-bold text-gray-400 uppercase text-xs tracking-wider">Informations Générales</h3>
          <p className="text-gray-800 dark:text-gray-200"><strong>Nom :</strong> {values.title || "Non défini"}</p>
          <p className="text-gray-800 dark:text-gray-200"><strong>Courte description :</strong> {values.short_description || "Non définie"}</p>
          <p className="text-gray-800 dark:text-gray-200"><strong>Début :</strong> {values.start_date ? new Date(values.start_date).toLocaleString() : "Non défini"}</p>
          <p className="text-gray-800 dark:text-gray-200"><strong>Fin :</strong> {values.end_date ? new Date(values.end_date).toLocaleString() : "Non définie"}</p>
          <p className="text-gray-800 dark:text-gray-200"><strong>Lieu :</strong> {values.location || "Non défini"}</p>
          <p className="text-gray-800 dark:text-gray-200"><strong>Visibilité :</strong> {values.is_public ? "Public" : "Privé"}</p>
        </div>

        <div className="p-5 bg-gray-50 dark:bg-gray-900/50 rounded-2xl border border-gray-100 dark:border-gray-800 space-y-3">
          <h3 className="font-bold text-gray-400 uppercase text-xs tracking-wider">Billetterie & Galerie</h3>
          <p className="text-gray-800 dark:text-gray-200"><strong>Catégories de billets :</strong> {values.ticket_categories?.length || 0} configurée(s)</p>
          <p className="text-gray-800 dark:text-gray-200"><strong>Photos galerie :</strong> {values.images?.length || 0} image(s) ajoutée(s)</p>
          <p className="text-gray-800 dark:text-gray-200"><strong>Type de visuel :</strong> {values.ticket_visual_type === "preset" ? "Modèle prédéfini" : "Personnalisé (Fabric.js)"}</p>
        </div>
      </div>
    </div>
  );
}