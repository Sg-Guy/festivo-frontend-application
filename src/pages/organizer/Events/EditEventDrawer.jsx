import React, { useEffect } from "react";
import {
  X,
  Loader2,
  Save,
  Calendar,
  MapPin,
  Tag,
  FileText,
  Image as ImageIcon,
  Ticket,
} from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useCategories } from "../../../hooks/useCategories";
import Select from "../../../Components/ui/Select";

export default function EditEventDrawer({
  isOpen,
  onClose,
  eventData,
  onSave,
}) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const { categoryOptions, isLoading: isCategoriesLoading } = useCategories();

  // Pré-remplir le formulaire dès que l'événement change ou que le drawer s'ouvre
  useEffect(() => {
    if (eventData) {
      reset({
        title: eventData.title || "",
        description: eventData.description || "",
        category_id: eventData.category_id || "",
        start_date: eventData.start_date || "",
        end_date: eventData.end_date || "",
        location: eventData.location || "",
        city: eventData.city || "",
        status: eventData.status || "draft",
        capacity: eventData.capacity || "",
      });
    }
  }, [eventData, reset]);

  if (!isOpen) return null;

  const onSubmit = async (data) => {
    onSave(data);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Overlay sombre avec effet flou */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-xl bg-white dark:bg-[var(--dark-background)] shadow-2xl border-l border-gray-200 dark:border-[var(--dark-border)] flex flex-col">
          {/* En-tête du Drawer */}
          <div className="p-6 flex items-center justify-between border-b border-gray-100 dark:border-[var(--dark-border)]">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-950 flex items-center justify-center text-[var(--primary)] font-bold">
                ✏️
              </div>
              <div>
                <h2 className="text-base font-bold text-gray-900 dark:text-[var(--dark-text)]">
                  Modifier l'événement
                </h2>
                <p className="text-xs text-gray-400 truncate max-w-[280px]">
                  {eventData?.title || "Chargement..."}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-gray-400 hover:bg-gray-100 dark:hover:bg-[var(--dark-surface)] transition"
            >
              <X size={20} />
            </button>
          </div>

          {/* Corps du formulaire (Scrollable) */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex-1 overflow-y-auto p-6 space-y-6"
          >
            {/* Section 1 : Informations générales */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
                <FileText size={14} /> Informations générales
              </h3>

              {/* Titre */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Titre de l'événement
                </label>
                <input
                  type="text"
                  {...register("title", { required: "Le titre est requis" })}
                  className="w-full px-3.5 py-2.5 text-xs bg-gray-50 dark:bg-[var(--dark-surface)] border border-gray-200 dark:border-[var(--dark-border)] rounded-xl focus:outline-none focus:border-[var(--primary)] transition"
                />
                {errors.title && (
                  <span className="text-[10px] text-rose-500 mt-1">
                    {errors.title.message}
                  </span>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Description
                </label>
                <textarea
                  rows={4}
                  {...register("description")}
                  className="w-full px-3.5 py-2.5 text-xs bg-gray-50 dark:bg-[var(--dark-surface)] border border-gray-200 dark:border-[var(--dark-border)] rounded-xl focus:outline-none focus:border-[var(--primary)] transition resize-none"
                />
              </div>

              {/* Catégorie & Capacité */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Controller
                    name="category_id"
                    control={control}
                    rules={{ required: "Veuillez selectionner une catégorie" }}
                    render={({ field }) => (
                      <Select
                        label="Catégorie ou type"
                        options={categoryOptions}
                        disabled={isCategoriesLoading}
                        error={errors.category_id?.message}
                        value={field.value}
                        onChange={field.onChange}
                      />
                    )}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Capacité max.
                  </label>
                  <input
                    type="number"
                    {...register("capacity")}
                    className="w-full px-3.5 py-2.5 text-xs bg-gray-50 dark:bg-[var(--dark-surface)] border border-gray-200 dark:border-[var(--dark-border)] rounded-xl focus:outline-none focus:border-[var(--primary)] transition"
                  />
                </div>
              </div>
            </div>

            {/* Section 2 : Dates & Localisation */}
            <div className="space-y-4 pt-4 border-t border-gray-100 dark:border-[var(--dark-border)]">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
                <Calendar size={14} /> Planning & Lieu
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Date de début
                  </label>
                  <input
                    type="datetime-local"
                    {...register("start_date")}
                    className="w-full px-3.5 py-2.5 text-xs bg-gray-50 dark:bg-[var(--dark-surface)] border border-gray-200 dark:border-[var(--dark-border)] rounded-xl focus:outline-none focus:border-[var(--primary)] transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Date de fin
                  </label>
                  <input
                    type="datetime-local"
                    {...register("end_date")}
                    className="w-full px-3.5 py-2.5 text-xs bg-gray-50 dark:bg-[var(--dark-surface)] border border-gray-200 dark:border-[var(--dark-border)] rounded-xl focus:outline-none focus:border-[var(--primary)] transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Lieu / Adresse
                  </label>
                  <input
                    type="text"
                    {...register("location")}
                    className="w-full px-3.5 py-2.5 text-xs bg-gray-50 dark:bg-[var(--dark-surface)] border border-gray-200 dark:border-[var(--dark-border)] rounded-xl focus:outline-none focus:border-[var(--primary)] transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Ville
                  </label>
                  <input
                    type="text"
                    {...register("city")}
                    className="w-full px-3.5 py-2.5 text-xs bg-gray-50 dark:bg-[var(--dark-surface)] border border-gray-200 dark:border-[var(--dark-border)] rounded-xl focus:outline-none focus:border-[var(--primary)] transition"
                  />
                </div>
              </div>
            </div>

            

            {/* Pied du formulaire fixe en bas du drawer */}
            <div className="pt-6 border-t border-gray-100 dark:border-[var(--dark-border)] flex items-center justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold text-gray-600 hover:bg-gray-100 dark:hover:bg-[var(--dark-surface)] transition"
              >
                Annuler
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center space-x-2 px-5 py-2.5 bg-[var(--primary)] text-white text-xs font-bold rounded-xl shadow-md shadow-orange-600/20 hover:opacity-90 transition disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Enregistrement...</span>
                  </>
                ) : (
                  <>
                    <Save size={16} />
                    <span>Enregistrer les modifications</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
