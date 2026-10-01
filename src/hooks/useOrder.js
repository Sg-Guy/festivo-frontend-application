import toast from "react-hot-toast";
import api from "../api/axios";
import { useMutation } from "@tanstack/react-query";

export function useCreateOrder() {
    return useMutation({
        mutationFn: async ({ basketId, customer }) => {
            const { data } = await api.post(
                `/baskets/${basketId}/orders`,
                customer
            );

            return data;
        },
        onSuccess: (data) => {
            toast.success(data.message || "Commande créée avec succès");
        },
        onError: (error) => {
            toast.error(
                error.response?.data?.message ||
                    "Impossible de créer la commande"
            );
        },
    });
}