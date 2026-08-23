import { useQuery } from "@tanstack/react-query";
import api from "../api/axios";

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

