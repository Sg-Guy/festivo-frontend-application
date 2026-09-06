import React, { useRef } from "react";
import { Controller, useFormContext } from "react-hook-form";
import {
  Sparkles,
  Calendar,
  MapPin,
  Clock,
  Upload,
  Globe,
  Lock,
} from "lucide-react";
import Input from "../../../../Components/ui/Input";
import Select from "../../../../Components/ui/Select";
import { useCategories } from "../../../../hooks/useCategories";

export default function StepInformations() {
  const {
    register,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();
  const fileInputRef = useRef(null);

  const title = watch("title");
  const shortDescription = watch("short_description");
  const startDate = watch("start_date");
  const location = watch("location");
  const isPublic = watch("is_public");
  const posterFile = watch("poster_file");

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setValue("poster_file", e.target.files[0]);
    }
  };

  const { categoryOptions, isLoading: isCategoriesLoading } = useCategories();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Formulaire (2 colonnes) */}
      <div className="lg:col-span-2 bg-white dark:bg-[var(--dark-surface)] p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 space-y-6">
        {/* Affiche intelligente avec upload */}
        <div className="bg-orange-50/50 dark:bg-orange-950/20 p-4 rounded-2xl flex items-center justify-between border border-orange-100 dark:border-orange-950">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-[var(--primary)] text-white rounded-xl">
              <Sparkles size={20} />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900 dark:text-white">
                Import d'affiche intelligent
              </p>
              <p className="text-xs text-gray-500">
                {posterFile
                  ? `Fichier sélectionné : ${posterFile.name}`
                  : "L'IA remplit les champs à partir de votre affiche."}
              </p>
            </div>
          </div>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="px-4 py-2 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white text-xs font-semibold rounded-xl flex items-center gap-2 transition shadow-sm"
          >
            <Upload size={14} />
            <span>Importer</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <Input
            label="Nom de l'événement"
            isRequired
            placeholder="ex: Afrobeats Night Cotonou"
            error={errors.title?.message}
            {...register("title", {
              required: "Le nom de l'événement est requis",
            })}
          />
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

        <Input
          label="Courte description"
          isRequired
          placeholder="Résumé en une phrase accrocheuse"
          error={errors.short_description?.message}
          {...register("short_description", {
            required: "La courte description est requise",
          })}
        />

        {/* Période de l'événement (Date & Heure Début / Fin) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <Input
            label="Date et heure de début"
            type="datetime-local"
            isRequired
            icon={Calendar}
            error={errors.start_date?.message}
            {...register("start_date", {
              required: "La date de début est requise",
            })}
          />
          <Input
            label="Date et heure de fin"
            type="datetime-local"
            isRequired
            icon={Clock}
            error={errors.end_date?.message}
            {...register("end_date", {
              required: "La date de fin est requise",
            })}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Lieu principal"
            isRequired
            placeholder="ex: Canal Olympia Wologuédé"
            icon={MapPin}
            error={errors.location?.message}
            {...register("location", { required: "Le lieu est requis" })}
          />
          <Input
            label="Capacité totale (Facultatif)"
            type="number"
            placeholder="ex: 500"
            {...register("capacity")}
          />
        </div>

        {/* Visibilité de l'événement (Radio / Checkbox) */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Visibilité de l'événement
          </label>
          <div className="grid grid-cols-2 gap-4">
            <label
              className={`flex items-center space-x-3 p-3 rounded-xl border cursor-pointer transition ${isPublic ? "border-[var(--primary)] bg-orange-50/30 dark:bg-orange-950/10" : "border-gray-200 dark:border-gray-800"}`}
            >
              <input
                type="radio"
                value="true"
                checked={isPublic === true || isPublic === "true"}
                onChange={() => setValue("is_public", true)}
                className="text-[var(--primary)] focus:ring-[var(--primary)]"
              />
              <div className="flex items-center space-x-2 text-sm font-medium">
                <Globe size={16} className="text-gray-500" />
                <span>Public</span>
              </div>
            </label>

            <label
              className={`flex items-center space-x-3 p-3 rounded-xl border cursor-pointer transition ${!isPublic ? "border-[var(--primary)] bg-orange-50/30 dark:bg-orange-950/10" : "border-gray-200 dark:border-gray-800"}`}
            >
              <input
                type="radio"
                value="false"
                checked={isPublic === false || isPublic === "false"}
                onChange={() => setValue("is_public", false)}
                className="text-[var(--primary)] focus:ring-[var(--primary)]"
              />
              <div className="flex items-center space-x-2 text-sm font-medium">
                <Lock size={16} className="text-gray-500" />
                <span>Privé (Sur invitation)</span>
              </div>
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Description complète
          </label>
          <textarea
            rows={3}
            placeholder="Décrivez les temps forts de votre événement..."
            {...register("description")}
            className="w-full p-3 rounded-xl bg-gray-50 dark:bg-[var(--dark-surface-soft)] border border-gray-300 dark:border-[var(--dark-border)] text-sm outline-none focus:border-[var(--primary)]"
          />
        </div>
      </div>

      {/* Aperçu en direct (1 colonne) */}
      <div className="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 flex flex-col items-center justify-start space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
          Aperçu en direct
        </span>
        <div className="w-full bg-white dark:bg-[var(--dark-surface)] border dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm">
          <div className="h-36 bg-gradient-to-r from-gray-800 to-gray-900 flex items-center justify-center text-white text-xs font-medium">
            {posterFile ? "Affiche chargée" : "Espace Affiche"}
          </div>
          <div className="p-4 space-y-3">
            <div className="flex justify-between items-start">
              <h3 className="font-bold text-base text-gray-900 dark:text-white truncate">
                {title || "Nom de l'événement"}
              </h3>
              <span className="text-[10px] px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-full font-semibold">
                {isPublic ? "Public" : "Privé"}
              </span>
            </div>
            <p className="text-xs text-gray-500 line-clamp-2">
              {shortDescription || "Courte description de l'événement..."}
            </p>
            <div className="text-xs text-gray-400 flex items-center gap-1.5 pt-2 border-t border-gray-100 dark:border-gray-800">
              <Calendar size={13} />{" "}
              <span>
                {startDate
                  ? new Date(startDate).toLocaleString()
                  : "Date non définie"}
              </span>
            </div>
            <div className="text-xs text-gray-400 flex items-center gap-1.5">
              <MapPin size={13} /> <span>{location || "Lieu non défini"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
