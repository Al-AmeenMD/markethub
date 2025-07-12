import { create } from 'zustand';
import { useProductStore } from './products';
import type { Product } from './products';

interface Vendor {
  id: string;
  name: string;
  image?: string;
  rating?: number;
  products?: number;
}

interface SearchState {
  searchQuery: string;
  results: {
    products: Product[];
    vendors: Vendor[];
  };
  setSearchQuery: (query: string) => void;
  search: (query: string) => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  searchQuery: '',
  results: {
    products: [],
    vendors: [],
  },
  setSearchQuery: (query) => set({ searchQuery: query }),
  search: (query) => {
    const { products } = useProductStore.getState();
    const normalizedQuery = query.toLowerCase();

    // Filter products
    const matchedProducts = products.filter(
      (product) =>
        product.name.toLowerCase().includes(normalizedQuery) ||
        product.description?.toLowerCase().includes(normalizedQuery) ||
        product.category?.toLowerCase().includes(normalizedQuery)
    );

    // Group products by vendor
    const vendorMap = new Map<string, { count: number; products: Product[] }>();
    matchedProducts.forEach((product) => {
      if (!vendorMap.has(product.vendorId)) {
        vendorMap.set(product.vendorId, { count: 0, products: [] });
      }
      const vendorData = vendorMap.get(product.vendorId)!;
      vendorData.count++;
      vendorData.products.push(product);
    });

    // Create vendor results
    const vendors: Vendor[] = Array.from(vendorMap.entries()).map(([id, data]) => {
      const firstProduct = data.products[0];
      return {
        id,
        name: firstProduct.vendor?.name || 'Unknown Vendor',
        image: firstProduct.vendor?.image,
        products: data.count,
      };
    });

    set({
      searchQuery: query,
      results: {
        products: matchedProducts,
        vendors,
      },
    });
  },
}));
