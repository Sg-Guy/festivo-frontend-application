import axios from "axios";
import { navigateTo } from "../utils/navigation";
import { ROUTES } from "../constants/routes";

const api = axios.create({
    baseURL: "http://localhost:8000/api/v1",
    withCredentials: true, // Indispensable pour Sanctum (cookies d'authentification)
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    },
});

// Intercepteur pour gérer les erreurs globales 
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // Si le token/la session expire, on redirige vers le login
            navigateTo(ROUTES.LOGIN);
        }
        return Promise.reject(error);
    }
);

export default api;