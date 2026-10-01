import { useQuery, useMutation } from "@tanstack/react-query";
import api from "../api/axios";
import toast from "react-hot-toast";

export function useAddToBasket() {
    return useMutation({
        mutationFn: async ({ eventId, tickets }) => {
            const { data } = await api.post(
                `/events/${eventId}/baskets`,
                {
                    tickets,
                }
            );

            return data;
        },

        onSuccess: (data) => {
            toast.success(
                data.message || "Tickets ajoutés au panier"
            );
        },

        onError: (error) => {
            toast.error(
                error.response?.data?.message ||
                    "Une erreur s'est produite"
            );
        },
    });
}

export function useBasket(basketId) {
    return useQuery({
        queryKey: ["basket", basketId],

        queryFn: async () => {
            const { data } = await api.get(
                `/baskets/${basketId}`
            );

            return data;
        },

        enabled: !!basketId,
    });
}