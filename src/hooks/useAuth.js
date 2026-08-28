import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../api/axios";
import { navigateTo } from "../utils/navigation";
import { ROUTES } from "../constants/routes";

// Hook pour la Connexion
export function useLogin() {
    return useMutation({
        mutationFn: async (credentials) => {
            //await api.get("/sanctum/csrf-cookie");
            const { data } = await api.post("/login", credentials);
            return data;
        },
        onSuccess: (data) => {
            toast.success("Connexion réussie ! Bienvenue.");
            if (data && data.token) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify(data.data));
                window.dispatchEvent(new Event("auth-storage"));
            };
            
            navigateTo(ROUTES.EVENTS);
        },
        onError: (error) => {
            const message = error.response?.data?.message || "Erreur serveur.";
            toast.error(message);
        },
    });
}

// Hook pour l'Inscription
export function useRegister() {
    return useMutation({
        mutationFn: async (userData) => {
            const { data } = await api.post("/users", {
                firstname: userData.firstname,
                lastname: userData.lastname,
                phone: userData.phone,
                email: userData.email,
                password: userData.password,
                password_confirmation: userData.password,
            });
            return data.data;
        },
        onSuccess: (data) => {
            toast.success(data.message || "Compte créé avec succès ! Connectez-vous.");
            navigateTo(ROUTES.LOGIN);
        },
        onError: (error) => {
            const message = error.response?.data?.message || "Erreur lors de la création du compte.";
            //toast.error(message);
        },
    });
}

// Récevoir un lien de modification de mot de passe
export function useForgotPassword() {
    return useMutation({
        mutationFn: async (credentials) => {
            const { data } = await api.post("/forgot-password", { email: credentials.email });
            return data;
        },
        onSuccess: (data) => {
            toast.success(
                data.message ||
                "Un lien de réinitialisation a été envoyé à votre adresse email.",
            );
        },
        onError: (error) => {
            const message =
                error.response?.data?.message ||
                "Impossible d'envoyer le lien de réinitialisation.";
            toast.error(message);
        },
    });
}

// restauration de mot de passe
export function useResetPassword() {
    return useMutation({
        mutationFn: async (credentials) => {
            const { data } = await api.post("/reset-password", credentials);
            return data;
        },
        onSuccess: (data) => {
            toast.success(
                data.message || "Votre mot de passe a été réinitialisé avec succès.",
            );

            navigateTo(ROUTES.LOGIN);
        },

        onError: (error) => {
            const message =
                error.response?.data?.message ||
                "Impossible de réinitialiser votre mot de passe.";

            toast.error(message);
        },
    });
}

export function useLogout() {
    return useMutation({
        mutationFn: async () => {
            const data = await api.delete("/logout");
            return data;
        },
        onSuccess: (data) => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            window.dispatchEvent(new Event("auth-change")); // Met à jour l'interface instantanément            t
            toast.success(data.message || "Déconnecté");
            navigateTo(ROUTES.HOME);
        },
        onError: (error) => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            window.dispatchEvent(new Event("auth-change")); 
            navigateTo(ROUTES.HOME)
        }
    })
}

export function useProfile() {
    return useQuery({
        queryKey: ["me"],
        queryFn: async () => {
            const data = await api.get("/me");
            return data.data;
        },
        select: (res) => res.data || []
    })
}

export function useUpdate() {
    return useMutation({
        mutationFn: async (credentials) => {
            const data = await api.put("/me", credentials);
            return data;
        },
        onSuccess: (data) => {
            toast.success(data.message || "Profil mis à jour avec ");
        },
        onError: (error) => {
            const messsage = error?.response?.data?.message || "Erreur lors de de la mise jour du profil."

            toast.error(messsage);
        }
    })
}