import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Building2,
  Mail,
  Phone,
  FileText,
  Image,
  ArrowRight,
  Loader2,
} from "lucide-react";
import Input from "../../Components/ui/Input";
import { useCreateOrg } from "../../hooks/useOrg";
import { useForm } from "react-hook-form";
import Button from "../../Components/ui/Button";

export default function CreateOrganization() {
  const navigate = useNavigate();

  const {
    register,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const { mutate: createOrganization, isPending } = useCreateOrg();
  // État du formulaire
  /* const [formData, setFormData] = useState({
    name: "",
    description: "",
    organization_phone: "",
    email: "",
    logo: null, // Pour un fichier image ou une URL selon ton API
  });*/

  const handleCreateOrg = async (formData) => {
    createOrganization(formData, {
      onSuccess: (data) => {
        
      },
      onError: (error) => {
        const validationErrors = error.response?.data?.errors;

        if (validationErrors) {
          Object.entries(validationErrors).forEach(([field, messages]) => {
            setError(field, {
              type: "server",
              message: messages[0],
            });
          });
        }
      },
    });

    // Validation simple (seul le nom est obligatoire)
    /* if (!formData.name.trim()) {
      setError("Le nom de l'organisation est obligatoire.");
      return;
    }

    setLoading(true);

    try {
      // TODO: Remplace ceci par ton appel API (ex: mutation TanStack Query ou Axios)
      // Si tu envoie un fichier (logo), pense à utiliser FormData()
      const dataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        if (formData[key] !== null && formData[key] !== "") {
          dataToSend.append(key, formData[key]);
        }
      });

      console.log("Envoi des données de l'organisation...", formData);

      // Simulation d'un délai réseau
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Redirection après succès (ex: vers le dashboard ou la liste)
      navigate("/dashboard");
    } catch (err) {
      setError(
        "Une erreur est survenue lors de la création de l'organisation.",
      );
    } finally {
      setLoading(false);
    }*/
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 sm:py-12">
      {/* En-tête de la page */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-2">
          <div className="bg-orange-100 dark:bg-orange-950/50 p-2.5 rounded-2xl text-[var(--primary)]">
            <Building2 size={24} />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-[var(--dark-text)]">
            Créer une organisation
          </h1>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Configurez votre espace organisationnel pour commencer à créer et
          gérer vos événements sur FESTIVO.
        </p>
      </div>

      {/* Carte du Formulaire */}
      <div className="bg-white dark:bg-[var(--dark-background)] border border-gray-200 dark:border-[var(--dark-border)] rounded-3xl p-6 sm:p-8 shadow-xl shadow-gray-100 dark:shadow-none">
        <form onSubmit={handleSubmit(handleCreateOrg)} className="space-y-6">
          <div>
            <Input
              label="Nom de l'organisation"
              type="text"
              placeholder="Ex: FESTIVO Events Corp"
              {...register("name")}
              error={errors.name?.message}
              icon={Building2}
            />
            <span className="text-xs text-gray-400 mt-1 block pl-1">
              Ce nom sera visible publiquement sur vos événements.
            </span>
          </div>

          <Input
            label="Adresse email professionnelle"
            type="email"
            placeholder="contact@festivo-events.com"
            placeholder="Ex: FESTIVO Events Corp"
            {...register("email")}
            error={errors.email?.message}
            icon={Mail}
          />

          <Input
            label="Téléphone"
            type="tel"
            placeholder="+228 90 00 00 00"
            placeholder="Ex: FESTIVO Events Corp"
            {...register("organization_phone_number")}
            error={errors.organization_phone_number?.message}
            icon={Phone}
          />

          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
              Description
            </label>
            <div className="relative">
              <textarea
                rows={4}
                placeholder="Décrivez brièvement votre organisation..."
                placeholder="Ex: FESTIVO Events Corp"
                {...register("description")}
                error={errors.description?.message}
                className="w-full rounded-2xl border border-gray-200 dark:border-[var(--dark-border)] bg-gray-50/50 dark:bg-[var(--dark-surface)] px-4 py-3 text-sm text-gray-900 dark:text-[var(--dark-text)] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition"
              />
            </div>
          </div>

          {/* Logo (Upload de fichier) */}
          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
              Logo de l'organisation
            </label>
            <div className="flex items-center space-x-4">
              <label className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 dark:border-[var(--dark-border)] rounded-2xl p-6 cursor-pointer hover:border-[var(--primary)] dark:hover:border-[var(--primary)] transition bg-gray-50/50 dark:bg-[var(--dark-surface)] group">
                <Image className="w-8 h-8 text-gray-400 group-hover:text-[var(--primary)] transition mb-2" />
                <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  "Cliquez pour importer un logo"
                </span>
                <span className="text-xs text-gray-400 mt-1">
                  PNG, JPG, WEBP (Max. 2Mo)
                </span>
                <input type="file" accept="image/*" className="hidden" />
              </label>
            </div>
          </div>

          {/* Boutons d'action */}
          <div className="pt-4 border-t border-gray-100 dark:border-[var(--dark-border)] flex items-center justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-3 rounded-xl text-sm font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[var(--dark-surface)] transition"
            >
              Annuler
            </button>

            <Button
              type="submit"
              variant="primary"
              isLoading={isPending}
              loadingText="Creation en cours..."
              className="mt-2"
            >
              <span>Créer l'organisation</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
