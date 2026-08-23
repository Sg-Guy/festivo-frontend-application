import { useQuery } from "@tanstack/react-query";
import api from "../api/axios";

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const res = await api.get('/categories');
      return res.data; 
    },
    select: (res) => res.categories || []
  })
}