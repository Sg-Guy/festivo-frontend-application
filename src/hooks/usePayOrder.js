import { useMutation } from "@tanstack/react-query";
import api from "../api/axios";
import toast from "react-hot-toast";

export function usePayOrder() {
    return useMutation({
        mutationFn: async (orderId) => {
            const { data } = await api.post(
                `/orders/${orderId}/payments`
            );

            return data;
        },

        onError: (error) => {
            toast.error(
                error.response?.data?.message ||
                    "Impossible d'initialiser le paiement."
            );
        },
    });
}


export function useVerifyPayment() {
    return useMutation({
        mutationFn: async (paymentId) => {
            const { data } = await api.post(
                `/payments/${paymentId}/verify`
            );

            return data;
        },
        onError: (error) => {
            toast.error(
                error.response?.data?.message ||
                    "Impossible de vérifier le paiement"
            );
        },
    });
}