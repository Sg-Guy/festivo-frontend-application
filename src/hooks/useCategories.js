import { useQuery } from "@tanstack/react-query";
import api from "../api/axios";

export function useCategories() {
  const { data: categories, isLoading, isError } = useQuery({
    queryKey: ["event-categories"],
    queryFn: async () => {
      const { data } = await api.get("/categories"); // Adapte ton URL Laravel
      return data;
    },
    select: (res) => res.categories || []
  });

  const categoryOptions = (categories || []).map((cat) => ({
    value: cat.id,   // ID de l'événement / de la catégorie
    label: cat.title, // Nom de l'événement / de la catégorie
  }));

  return {
    categoryOptions,
    isLoading,
    isError,
  };
}