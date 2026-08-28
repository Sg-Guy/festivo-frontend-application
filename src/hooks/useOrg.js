import { useMutation, useQuery } from "@tanstack/react-query";
import api from "../api/axios";
import { ROUTES } from "../constants/routes";
import toast from "react-hot-toast";
import { navigateTo } from "../utils/navigation";

export function useOrg() {
    return useQuery({
        queryKey: ["organizations"],
        queryFn: async () => {
            const { data } = await api.get("/organizations");
            return data;
        },
        select: (res) => res.data || [],

        onError: (error) => {
            const message =
                error.response?.data?.message ||
                "Erreur lors de la récupération de vos organisations";

            toast.error(message);
        }
    })
}

export const useOrgDetails = (id) => {
    return useQuery({
        queryKey: ['organization', id],
        queryFn: async () => {
            const { data } = await api.get(`/organizations/${id}`);
            return data.data;
        },
        enabled: !!id // Ne lance la requête que si id existe
    })
}

export const useCreateOrg = () => {
    return useMutation({
        mutationFn: async (orgData) => {
            const { data } = await api.post("organizations", {
                name: orgData.name,
                description: orgData.description,
                email: orgData.email,
                organization_phone_number: orgData.organization_phone_number,
                //logo: orgData.logo,
            });
            return data.data;
        },
        onSuccess: (data) => {
            toast.success(data.message || "Organisation créée avec succès !");
            navigateTo(ROUTES.ORGANIZATIONS_LIST);
        },
        onError: (error) => {
            const message = error.response?.data?.message || "Erreur lors de la création de l'organisationk";
            toast.error(message);
        },

    })
}