import { useMutation, useQuery } from "@tanstack/react-query";
import api from "../api/axios";
import toast from "react-hot-toast";


export function useCreateEventGallery(eventId) {
    return useMutation({
        mutationFn: async (credentials) => {
            const formData = new FormData();

            // credentials.images attend ton tableau : [{ image: File, caption: "..." }]
            if (credentials && credentials.images) {
                credentials.images.forEach((item, index) => {
                    if (item.image && item.image[0]) {
                        // Si l'input file renvoie un FileList, on prend le premier fichier
                        formData.append(`images[${index}][image]`, item.image[0]);
                    } else if (item.image instanceof File) {
                        // Si c'est déjà un objet File direct
                        formData.append(`images[${index}][image]`, item.image);
                    }
                    formData.append(`images[${index}][caption]`, item.caption || "");
                });
            }

            const { data } = await api.post(`/events/${eventId}/pictures`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            return data;
        },
        onSuccess: (data) => {
            toast.success(data.message || "Galerie enregistrée avec succès !");
        },
        onError: (error) => {
            const message = error.response?.data?.message || "Erreur serveur.";
            toast.error(message);
        },
    });
}

export function useUpdateEventGallery(eventId) {
    return useMutation({
        mutationFn: async (credentials) => {
            const formData = new FormData();

            // credentials.images attend ton tableau : [{ image: File, caption: "..." }]
            if (credentials && credentials.images) {
                credentials.images.forEach((item, index) => {
                    if (item.image && item.image[0]) {
                        // Si l'input file renvoie un FileList, on prend le premier fichier
                        formData.append(`images[${index}][image]`, item.image[0]);
                    } else if (item.image instanceof File) {
                        // Si c'est déjà un objet File direct
                        formData.append(`images[${index}][image]`, item.image);
                    }
                    formData.append(`images[${index}][caption]`, item.caption || "");
                });
            }

            const { data } = await api.post(`/events/${eventId}/pictures`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            return data;
        },
        onSuccess: (data) => {
            toast.success(data.message || "Galerie enregistrée avec succès !");
        },
        onError: (error) => {
            const message = error.response?.data?.message || "Erreur serveur.";
            toast.error(message);
        },
    });
}
