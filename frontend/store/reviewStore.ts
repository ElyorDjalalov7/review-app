// store/reviewStore.ts
import { create } from "zustand";

interface ReviewStore {
  filters: {
    titleSearch: string;
    author: string;
    rating: number | null;
  };
  page: number;
  setPage: (page: number) => void;
  setFilters: (filters: Partial<ReviewStore["filters"]>) => void;
  resetFilters: () => void;
}

export const useReviewStore = create<ReviewStore>((set) => ({
  filters: {
    titleSearch: "",
    author: "",
    rating: null,
  },
  page: 1,
  setPage: (page) => set({ page }),
  setFilters: (newFilters) =>
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
      page: 1,
    })),
  resetFilters: () =>
    set({
      filters: {
        titleSearch: "",
        author: "",
        rating: null,
      },
      page: 1,
    }),
}));
