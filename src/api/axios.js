import axios from "axios";
import { navigateTo } from "../utils/navigation";
import { ROUTES } from "../constants/routes";
import { useLogout } from "../hooks/useAuth";

const API_URL = import.meta.env.VITE_API_URL;
const api = axios.create({
    baseURL: API_URL,
    withCredentials: true, // Indispensable pour Sanctum (cookies d'authentification)
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    },
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }
)

// Intercepteur pour gérer les erreurs globales 
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // Si le token/la session expire , redirection
            navigateTo(ROUTES.LOGIN);
        }
        return Promise.reject(error);
    }
);

export default api;