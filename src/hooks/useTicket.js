import { useMutation, useQuery } from "@tanstack/react-query";
import api from "../api/axios";
import toast from "react-hot-toast";

export function useCreateTicket(eventId) {
    return useMutation({
        mutationFn: async (credentials) => {
            const { data } = await api.post(`/events/${eventId}/tickets`, {
                tickets: credentials.ticket_categories
            });
            //console.log(data.data);
            return data;
            
        },
        onSuccess: (data) => {
            toast.success(data.message || "Billets et tarifs enrégistrés !");
        },
        onError: (error) => {
            const message = error.response?.data?.message || "Erreur serveur.";
            toast.error(message);
        },
    });
}