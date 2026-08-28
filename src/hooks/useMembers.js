import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import api from "../api/axios";

export function useInviteMember(orgId) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (credentials) => {
            const { data } = await api.post(`invitations/organization/${orgId}/send`, {
                email: credentials.email,
                role: credentials.role, 
            });
            return data;
        },
        onSuccess: (data) => {
            toast.success(data.message || "Invitation envoyée avec succès.");
            queryClient.invalidateQueries({ queryKey: ["organization"] });
        },
        onError: (error) => {
            const message = error.response?.data?.message || "Erreur serveur.";
            toast.error(message);
        },
    });
}

export function useAcceptInvitation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (invitationToken) => {
            const { data } = await api.post(`invitations/${invitationToken}/accept`);
            return data;
        },
        onSuccess: (data) => {
            toast.success(data.message || "Invitation acceptée avec succès ! Bienvenue.");
            localStorage.removeItem("pending_invitation_token")
            queryClient.invalidateQueries({ queryKey: ["organization"] });
        },
        onError: (error) => {
            const message = error.response?.data?.message || "Lien d'invitation invalide ou expiré.";
            toast.error(message);
        },
    });
}

export function useRevokeInvitation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (invitationId) => {
            const { data } = await api.put(`invitations/${invitationId}/revoke`);
            return data;
        },
        onSuccess: (data) => {
            toast.success(data.message || "Invitation annulée .");
            queryClient.invalidateQueries({ queryKey: ["organization"] });
        },
        onError: (error) => {
            const message = error.response?.data?.message || "Erreur serveur.";
            toast.error(message);
        },
    });
}
export function useDeleteInvitation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (invitationId) => {
            const { data } = await api.delete(`invitations/${invitationId}`);
            return data;
        },
        onSuccess: (data) => {
            toast.success(data.message || "Invitation supprimée .");
            queryClient.invalidateQueries({ queryKey: ["organization"] });
        },
        onError: (error) => {
            const message = error.response?.data?.message || "Erreur serveur.";
            toast.error(message);
        },
    });
}

export const useGetInvitation = () => {
    return useQuery({
        queryKey: ['invitation', invitationToken],
        queryFn: async () => {
            const { data } = await api.get(`/invitations/${invitationToken}`);
            return data;
        },
        //enabled: !!invitationToken 
    })
}

