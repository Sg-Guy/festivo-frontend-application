import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../api/axios";
import toast from "react-hot-toast";

export function usePromoCodeMutations(onSuccessCallback) {
    const queryClient = useQueryClient();

    // --- 1. MUTATION CRÉATION ---
    const createMutation = useMutation({
        mutationFn: async ({ eventId, formData }) => {
            const payload = {
                promo_codes: [
                    {
                        wording: formData.code.toUpperCase(),
                        remise_is_percent: formData.type === "Pourcentage",
                        remise: parseFloat(formData.discountValue) || 0,
                        total_available: parseInt(formData.maxUses, 10) || 0,
                        is_active: true,
                        ticket_ids: formData.applicableTickets || []
                    }
                ]
            };
            const { data } = await api.post(`/events/${eventId}/promo-codes`, payload);
            return data;
        },
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({ queryKey: ["promo-codes", variables.eventId] });
            toast.success(data.meaage || "Code promo créé avec succès !");
        },
        onError: (error) => {
            toast.error(error?.response?.data?.message || "Erreur lors de la création du code promo.");
        },
    });

    // --- 2. MUTATION MODIFICATION (UPDATE) ---
    const updateMutation = useMutation({
        mutationFn: async ({ id, formData }) => {
            const payload = {
                wording: formData.code.toUpperCase(),
                remise_is_percent: formData.type === "Pourcentage",
                remise: parseFloat(formData.discountValue) || 0,
                total_available: parseInt(formData.maxUses, 10) || 0,
                ticket_ids: formData.applicableTickets || []
            };
            const { data } = await api.put(`/promo-codes/${id}`, payload);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["promo-codes"] });
            toast.success("Code promo mis à jour avec succès !");
        },
        onError: (error) => {
            toast.error(error?.response?.data?.message || "Erreur lors de la modification.");
        }
    });

    // --- 3. MUTATION SUPPRESSION ---
    const deleteMutation = useMutation({
        mutationFn: async (id) => {
            await api.delete(`promo-codes/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["promo-codes"] });
            toast.success("Code promo supprimé avec succès !");
            if (onSuccessCallback) onSuccessCallback();
        },
        onError: (error) => {
            toast.error(error?.response?.data?.message || "Erreur lors de la suppression.");
        }
    });

    return {
        createPromoCode: createMutation.mutate,
        isCreating: createMutation.isPending,
        updatePromoCode: updateMutation.mutate,
        isUpdating: updateMutation.isPending,
        deletePromoCode: deleteMutation.mutate,
        isDeleting: deleteMutation.isPending,
    };
}

export function useEventPromoCodes(eventId) {
    return useQuery({
        queryKey: ["promo-codes", eventId],
        queryFn: async () => {
            const { data } = await api.get(`/events/${eventId}/promo-codes`);
            return data.data;
        },
        enabled: !!eventId, 
    });
}