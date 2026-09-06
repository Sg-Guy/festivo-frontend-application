import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import api from "../api/axios";
import { useOrganizationStore } from "../store/useOrganizationStore";

export function useInviteMember(orgId) {
    const {activeOrganization} = useOrganizationStore();

    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (credentials) => {
            const { data } = await api.post(`invitations/organization/${activeOrganization?.id}/send`, {
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


export function useOrganizationMembers(page = 1) {
  const { activeOrganization } = useOrganizationStore();

  return useQuery({
    // La queryKey inclut l'ID de l'orga et la page. 
    // Dès que l'orga change, React Query relance automatiquement la requête !
    queryKey: ["organization-members", activeOrganization?.id, page],
    queryFn: async () => {
      if (!activeOrganization?.id) return null;
      
      const { data } = await api.get(`/members/organizations/${activeOrganization.id}`, {
        params: { page }
      });
      return data; // Renvoie l'objet complet { data, links, meta }
    },
    enabled: !!activeOrganization?.id, // Ne lance la requête que si une organisation est active
  });
}

