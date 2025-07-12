import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  vendorId: string;
  vendor?: {
    id: string;
    name: string;
    image?: string;
  };
  sales: number;
  isOnSale?: boolean;
  salePrice?: number;
  createdAt: string;
}

interface ProductStore {
  products: Product[];
  addProduct: (product: Omit<Product, 'id' | 'sales' | 'createdAt'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  getVendorProducts: (vendorId: string) => Product[];
}

// Initial products for testing
const initialProducts: Product[] = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    description: 'High-quality wireless headphones with noise cancellation',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80',
    category: 'Electronics',
    stock: 50,
    vendorId: 'v1',
    vendor: {
      id: 'v1',
      name: 'AudioTech Pro',
      image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=200&q=80',
    },
    sales: 250,
    createdAt: '2025-01-01T00:00:00.000Z',
  },
  {
    id: '2',
    name: 'Smart Watch Series X',
    description: 'Advanced smartwatch with health monitoring features',
    price: 399.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80',
    category: 'Electronics',
    stock: 30,
    vendorId: 'v2',
    vendor: {
      id: 'v2',
      name: 'TechGear',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=200&q=80',
    },
    sales: 180,
    createdAt: '2025-01-02T00:00:00.000Z',
  },
  {
    id: '3',
    name: 'Eco-Friendly Water Bottle',
    description: 'Sustainable and reusable water bottle',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&q=80',
    category: 'Home & Living',
    stock: 100,
    vendorId: 'v3',
    vendor: {
      id: 'v3',
      name: 'EcoLife',
      image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=200&q=80',
    },
    sales: 420,
    createdAt: '2025-01-03T00:00:00.000Z',
  },
];

export const useProductStore = create<ProductStore>()(
  persist(
    (set, get) => ({
      products: initialProducts,
      addProduct: (product) => {
        const newProduct = {
          ...product,
          id: crypto.randomUUID(),
          sales: 0,
          createdAt: new Date().toISOString(),
        };
        set((state) => ({
          products: [...state.products, newProduct],
        }));
        return newProduct;
      },
      updateProduct: (id, updates) =>
        set((state) => ({
          products: state.products.map((product) =>
            product.id === id ? { ...product, ...updates } : product
          ),
        })),
      deleteProduct: (id) =>
        set((state) => ({
          products: state.products.filter((product) => product.id !== id),
        })),
      getVendorProducts: (vendorId) =>
        get().products.filter((product) => product.vendorId === vendorId),
    }),
    {
      name: 'markethub-products',
    }
  )
);
