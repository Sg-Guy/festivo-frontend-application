import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useOrganizationStore = create(
  persist(
    (set) => ({
      activeOrganization: null,
      setActiveOrganization: (org) => set({ activeOrganization: org }),
    }),
    {
      name: 'festivo-active-org', // Clé du localStorage
    }
  )
);