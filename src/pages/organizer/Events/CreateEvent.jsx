import React, { useState, useRef, useEffect, useTransition } from "react";
import { useForm, FormProvider } from "react-hook-form";
import StepInformations from "./steps/StepInformations";
import StepGallery from "./steps/StepGallery";
import StepTicketsConfig from "./steps/StepTicketsConfig";
import StepTicketVisual from "./steps/StepTicketVisual";
import StepSummary from "./steps/StepSummary";
import Button from "../../../Components/ui/Button";
import { Check, Loader2 } from "lucide-react";
import {
  useCreateEvent,
  usePublishEvent,
  useUpdateEvent,
} from "../../../hooks/useEvents";
import { useParams } from "react-router-dom";
import { useCreateTicket } from "../../../hooks/useTicket";
import { useCreateEventGallery } from "../../../hooks/useEvenetGallery";
import toast from "react-hot-toast";
import { navigateTo } from "../../../utils/navigation";
import { ROUTES } from "../../../constants/routes";
import { PictureBaseUrl } from "../../../constants/picturesBaseUrl";

export default function CreateEvent() {
  const [currentStep, setCurrentStep] = useState(1);
  const [eventId, setEventId] = useState(null);
  const { id } = useParams();
  const [isPendingTransition, startTransition] = useTransition();

  // Permet de mémoriser les données validées par étape pour éviter les appels API inutiles
  const lastSavedDataRef = useRef({});

  const methods = useForm({
    mode: "onChange",
    defaultValues: {
      title: "",
      short_description: "",
      description: "",
      category_id: "",
      capacity: "",
      start_date: "",
      end_date: "",
      location: "",
      city: "",
      is_public: true,
      images: [],
      ticket_categories: [
        {
          name: "Standard",
          description: "",
          regular_price: "",
          quantity_available: "",
          sales_start_at: "",
          sales_end_at: "",
        },
      ],
      ticket_visual_type: "preset",
      selected_preset_template: null,
      custom_ticket_canvas_json: null,
    },
  });

  const { trigger, getValues, setError, setValue } = methods;

  // Si un ID est présent dans l'URL (ex: mode édition directe), on l'initialise
  useEffect(() => {
    if (id) setEventId(id);
  }, [id]);

  const steps = [
    { id: 1, name: "Informations" },
    { id: 2, name: "Galerie" },
    { id: 3, name: "Billets & Tarifs" },
    { id: 4, name: "Visuel Billet" },
    { id: 5, name: "Récapitulatif" },
  ];

  // Hooks TanStack Query
  const { mutateAsync: createEvent, isPending: isEventCreating } =
    useCreateEvent();
  const { mutateAsync: updateEvent, isPending: isEventUpdating } =
    useUpdateEvent(eventId);
  const { mutateAsync: createGallery, isPending: isGalleryCreating } =
    useCreateEventGallery(eventId);
  const { mutateAsync: createTickets, isPending: isTicketsCreating } =
    useCreateTicket(eventId);
  const { mutateAsync: publishEvent, isPending: isEventPublishing } =
    usePublishEvent(eventId);

  const isSaving =
    isEventCreating ||
    isEventUpdating ||
    isGalleryCreating ||
    isTicketsCreating ||
    isPendingTransition ||
    isEventPublishing;

  // Fonction utilitaire pour comparer si les données d'une étape ont changé
  const hasDataChanged = (step, currentValues) => {
    const previousData = lastSavedDataRef.current[step];
    if (!previousData) return true;
    return JSON.stringify(previousData) !== JSON.stringify(currentValues);
  };

  // Sauvegarde par étape avec gestion des erreurs Backend (422)
  const saveStepData = async (step) => {
    const data = getValues();

    try {
      if (step === 1) {
        const stepPayload = data;

        // Si rien n'a changé depuis la dernière validation de cette étape, on saute l'appel réseau
        if (eventId && !hasDataChanged(step, stepPayload)) {
          return true;
        }

        if (eventId) {
          updateEvent(stepPayload, {
            onSuccess: (data) => {
              setEventId(data.id);
            },
          });
        } else {
          createEvent(stepPayload, {
            onSuccess: (data) => {
              setEventId(data.id);
            },
          });
        }
        lastSavedDataRef.current[step] = stepPayload;
      } else if (step === 2) {
        if (data.images && data.images.length > 0) {
          if (!hasDataChanged(step, data.images)) return true;
          console.log(data.image);
          createGallery(data, {
            onSuccess: (response) => {
              const savedImages = response.data || [];

            // On transforme chaque image de la DB pour qu'elle corresponde à ce que StepGallery attend
            const formattedImages = savedImages.map((item) => ({
              id: item.id, // ID en base de données
              image: null, // Pas de fichier File puisque c'est déjà stocké
              caption: item.caption || "", // La légende
              preview: item.path // L'URL publique pour l'affichage de l'aperçu
                ? `${PictureBaseUrl.EVENTS}/${item.path}`
                : null,
              isExisting: true, // Un petit flag pour dire "c'est déjà sur le serveur"
            }));

            // On met à jour le formulaire avec la structure propre
            setValue("images", formattedImages);
            },
          });
          lastSavedDataRef.current[step] = [...data.images];
        }
      } else if (step === 3) {
        if (!hasDataChanged(step, data.ticket_categories)) return true;

        createTickets(data, {
          onSuccess: (response) => {
            methods.setValue("ticket_categories", response.data.tickets);
          },
        });
        lastSavedDataRef.current[step] = JSON.parse(
          JSON.stringify(data.ticket_categories),
        );
      } else if (step === 4) {
        const visualPayload = {
          ticket_visual_type: data.ticket_visual_type,
          selected_preset_template: data.selected_preset_template,
          custom_ticket_canvas_json: data.custom_ticket_canvas_json,
        };
        if (!hasDataChanged(step, visualPayload)) return true;
        // Remplace par hook de mutation pour le visuel du billet si disponible
        // ex: await updateVisual(visualPayload);
        lastSavedDataRef.current[step] = visualPayload;
      }

      return true;
    } catch (error) {
      console.error(`Erreur étape ${step}`, error);

      // Capture des erreurs de validation  pour les afficher sous les champs
      if (error?.response?.status === 422 && error.response.data?.errors) {
        const backendErrors = error.response.data.errors;
        Object.keys(backendErrors).forEach((field) => {
          setError(field, {
            type: "server",
            message: backendErrors[field][0],
          });
        });
        toast.error(
          "Veuillez corriger les erreurs signalées dans le formulaire.",
        );
      } else {
        toast.error(
          "Une erreur est survenue lors de l'enregistrement. Veuillez réessayer.",
        );
      }
      return false;
    }
  };

  // Gestion du bouton "Continuer"
  const nextStep = async () => {
    if (isSaving) return;

    let isValid = false;

    // 1. Validation locale React Hook Form par étape
    if (currentStep === 1) {
      isValid = await trigger([
        "title",
        "category_id",
        "short_description",
        "start_date",
        "end_date",
        "location",
      ]);
    } else if (currentStep === 3) {
      isValid = await trigger(["ticket_categories"]);
    } else {
      isValid = true;
    }

    if (!isValid) {
      toast.error("Veuillez remplir correctement les champs requis.");
      return;
    }

    // 2. Sauvegarde / Synchronisation Backend
    const isSaved = await saveStepData(currentStep);

    // 3. Passage à l'étape suivante de manière fluide
    if (isSaved) {
      startTransition(() => {
        setCurrentStep((prev) => Math.min(prev + 1, steps.length));
      });
    }
  };

  const prevStep = () => {
    if (isSaving) return;
    startTransition(() => {
      setCurrentStep((prev) => Math.max(prev - 1, 1));
    });
  };

  // Étape finale : Publication définitive
  const handlePublish = async (data) => {
    publishEvent();
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(handlePublish)}
        className="max-w-5xl mx-auto p-4 sm:p-6 space-y-6 sm:space-y-8"
      >
        {/* En-Tête */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white">
              Créer un événement
            </h1>
            <p className="text-xs text-gray-500">
              {eventId
                ? `ID Brouillon : ${eventId}`
                : "Enregistrement automatique étape par étape"}
            </p>
          </div>
          {currentStep > 1 && (
            <span className="px-3 py-1 bg-amber-100 text-amber-800 dark:bg-amber-950/50 dark:text-amber-400 text-xs font-bold rounded-full uppercase tracking-wider border border-amber-200 dark:border-amber-900">
              📁 Brouillon sauvegardé
            </span>
          )}
        </div>

        {/* Barre de progression Responsive */}
        <div className="w-full">
          {/* Version Mobile : Indicateur simplifié */}
          <div className="flex sm:hidden items-center justify-between bg-gray-50 dark:bg-gray-800/50 px-4 py-2.5 rounded-xl border border-gray-100 dark:border-gray-800">
            <span className="text-xs font-bold text-[var(--primary)]">
              Étape {currentStep} sur {steps.length}
            </span>
            <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
              {steps.find((s) => s.id === currentStep)?.name}
            </span>
          </div>

          {/* Version Desktop : Stepper complet */}
          <div className="hidden sm:flex items-center justify-between relative">
            {steps.map((step, idx) => {
              const isCompleted = currentStep > step.id;
              const isCurrent = currentStep === step.id;

              return (
                <React.Fragment key={step.id}>
                  <div className="flex flex-col items-center relative z-10 space-y-2">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                        isCompleted
                          ? "bg-green-600 text-white shadow-md shadow-green-600/20"
                          : isCurrent
                            ? "bg-[var(--primary)] text-white shadow-md shadow-orange-600/20 ring-4 ring-[var(--primary)]/20"
                            : "bg-gray-100 dark:bg-gray-800 text-gray-400"
                      }`}
                    >
                      {isCompleted ? <Check size={18} /> : step.id}
                    </div>
                    <span
                      className={`text-xs font-semibold ${
                        isCurrent ? "text-[var(--primary)]" : "text-gray-400"
                      }`}
                    >
                      {step.name}
                    </span>
                  </div>

                  {idx < steps.length - 1 && (
                    <div className="flex-1 h-1 mx-2 bg-gray-200 dark:bg-gray-800 relative rounded-full overflow-hidden">
                      <div
                        className={`absolute inset-0 transition-all duration-300 ${
                          currentStep > step.id ? "bg-green-600 w-full" : "w-0"
                        }`}
                      />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Contenu de l'étape active */}
        <div className="min-h-[420px] transition-opacity duration-200">
          {currentStep === 1 && <StepInformations />}
          {currentStep === 2 && <StepGallery />}
          {currentStep === 3 && <StepTicketsConfig />}
          {currentStep === 4 && <StepTicketVisual />}
          {currentStep === 5 && <StepSummary />}
        </div>

        {/* Boutons de navigation */}
        <div className="flex justify-between pt-4 border-t border-gray-200 dark:border-gray-800">
          {currentStep > 1 ? (
            <div className="w-28 sm:w-32">
              <Button
                type="button"
                variant="secondary"
                onClick={prevStep}
                disabled={isSaving}
              >
                Retour
              </Button>
            </div>
          ) : (
            <div />
          )}

          <div className="w-36 sm:w-44">
            {currentStep < steps.length ? (
              <Button
                type="button"
                variant="primary"
                onClick={nextStep}
                disabled={isSaving}
              >
                {isSaving ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 size={16} className="animate-spin" />
                    Enregistrement...
                  </span>
                ) : (
                  "Continuer"
                )}
              </Button>
            ) : (
              <Button
                type="submit"
                variant="primary"
                className="bg-green-600 hover:bg-green-700 shadow-green-600/20"
                disabled={isSaving}
                isLoading={isSaving}
                loadingText="Publication..."
              >
                Publier
              </Button>
            )}
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
