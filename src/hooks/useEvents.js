import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../api/axios";
import toast from "react-hot-toast";
import { useOrganizationStore } from "../store/useOrganizationStore";
import { navigateTo } from "../utils/navigation";
import { ROUTES } from "../constants/routes";
import { replace } from "react-router-dom";

export function useCreateEvent() {
    const { activeOrganization } = useOrganizationStore();
    return useMutation({
        mutationFn: async (credentials) => {
            const { data } = await api.post(`/organizations/${activeOrganization?.id}/events`, {
                category_id: credentials.category_id,
                title: credentials.title,
                description: credentials.description,
                country: "Bénin", //credentials.country,
                city: "Cotonou", //credentials.city,
                location: credentials.location,
                start_date: credentials.start_date,
                end_date: credentials.end_date,
                capacity: credentials.capacity,
                is_public: credentials.is_public
            });
            return data.data;

        },
        onSuccess: (data) => {
            toast.success(data.message || "Bouillon enregistré avec succès !");
        },
        onError: (error) => {
            const message = error.response?.data?.message || "Erreur serveur.";
            toast.error(message);
        },
    });
}


export function useUpdateEvent(eventId) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (credentials) => {
            const { data } = await api.put(`/events/${eventId}`, {
                category_id: credentials.category_id,
                title: credentials.title,
                description: credentials.description,
                country: "Bénin", //credentials.country,
                city: "Cotonou", //credentials.city,
                location: credentials.location,
                start_date: credentials.start_date,
                end_date: credentials.end_date,
                capacity: credentials.capacity,
                is_public: credentials.is_public

            });
            return data.data;
        },
        onSuccess: () => {
            // Invalider le cache pour forcer le rechargement de la liste des événements
            queryClient.invalidateQueries({ queryKey: ["organizer-events"] });
            toast.success("Événement mis à jour avec succès !");
        },
        onError: (error) => {
            toast.error(error?.response?.data?.message || "Erreur lors de la mise à jour.");
        },
    });
}

export function useDeleteEvent() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (eventId) => {
            const { data } = await api.delete(`/events/${eventId}`);
            return data;
        },
        onSuccess: (data) => {
            toast.success(data.message || "Suppression éffectuée.")
            queryClient.invalidateQueries({ queryKey: ["organizer-events"] });
        },
        onError: (error) => {
            const message = error.response?.data?.message || "Erreur serveur.";
            toast.error(message);
        },
    })
}

//Liste des evenements pour le public
export function useEvents(filters) {
    return useQuery({
        queryKey: ["events", filters], // Relance de requete par TanStack dès que les filtres changent
        queryFn: async () => {
            const { data } = await api.get("/events", { params: filters });
            return data;
        },
        keepPreviousData: true, // Garde l'ancienne liste pendant le chargement des nouveaux filtres
    });
}


//Details d'un evenement pour le public
export const useEvent = (id) => {
    return useQuery({
        queryKey: ['event', id],
        queryFn: async () => {
            const { data } = await api.get(`events/${id}/details`);
            return data.data;
        },
        enabled: !!id // Ne lance la requête que si id existe
    })
}

//Liste des évenements pour oganizateur
export function useOrganizerEvents(filters = {}) {
    const { activeOrganization, setActiveOrganization } = useOrganizationStore();
    return useQuery({
        // activeOrganization?.id permet de refethcher et affiche le loader
        queryKey: ["organizer-events", activeOrganization?.id, filters],
        queryFn: async () => {
            // Nettoyage des paramètres vides (undefined, null, "")
            const cleanParams = Object.fromEntries(
                Object.entries(filters).filter(([_, v]) => v !== "" && v !== null && v !== undefined)
            );

            const { data } = await api.get(`/organizations/${activeOrganization?.id}/events`, {
                params: cleanParams, // Axios se charge de les formater en query string (?search=...&status=...)
            });
            return data; // Attend un objet paginé de Laravel : { data: [...], current_page: 1, last_page: 5, ... }
        },
        keepPreviousData: true, // Évite les sauts visuels désagréables lors du changement de page
    });
}


//Details d'un evenement pour l'organisateur
export function useEventDetails(eventId) {
    return useQuery({
        queryKey: ["event-details", eventId],
        queryFn: async () => {
            const { data } = await api.get(`/events/${eventId}`);
            return data.data; // Retourne l'objet contenu dans "data"
        },
        enabled: !!eventId, // Ne s'exécute que si l'ID est présent
    });
}


export function usePublishEvent(eventId) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async () => {
            const { data } = await api.put(`/events/${eventId}`, {
                status: "published"
            });
            return data.data;
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["organizer-events"] });
            toast.success("Événement publié avec succès !");
            navigateTo(ROUTES.ORGANIZER_EVENTS , {replace: true});
        },
        onError: (error) => {
            toast.error(error?.response?.data?.message || "Erreur lors de la publication.");
        },
    });
}