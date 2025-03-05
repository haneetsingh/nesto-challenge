import { create } from "zustand";
import { Product } from "@/types";

interface ProductStore {
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product) => void;
  clearProduct: () => void;
}

export const useProductStore = create<ProductStore>((set) => ({
  selectedProduct: null,
  setSelectedProduct: (product) => set({ selectedProduct: product }),
  clearProduct: () => set({ selectedProduct: null }),
}));
