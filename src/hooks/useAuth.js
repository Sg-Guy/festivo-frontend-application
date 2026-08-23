import { useMutation } from "@tanstack/react-query";
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
            if (data.token) localStorage.setItem("token", data.token);
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
        onSuccess: () => {
            toast.success(data.message || "Compte créé avec succès ! Connectez-vous.");
            navigateTo(ROUTES.LOGIN);
        },
        onError: (error) => {
            const message = error.response?.data?.message || "Erreur lors de la création du compte.";
            //toast.error(message);
        },
    });
}

//Hook pour la réinitialisation de mot de passe
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
            const data = await api.post("/logout");
            return data;
        },
        onSuccess: (data) => {
            localStorage.removeItem("token");
            toast.success(data.message || "Déconnecté");
            navigateTo(ROUTES.HOME);
        },
        onError: (error) => {
            localStorage.removeItem("token")
            navigateTo(ROUTES.HOME)
        }
    })
}