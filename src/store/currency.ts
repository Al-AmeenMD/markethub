import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Currency {
  code: string;
  symbol: string;
  name: string;
  rate: number; // Exchange rate relative to USD
}

export const currencies: Currency[] = [
  { code: 'USD', symbol: '$', name: 'US Dollar', rate: 1 },
  { code: 'NGN', symbol: '₦', name: 'Nigerian Naira', rate: 900 },
  { code: 'EUR', symbol: '€', name: 'Euro', rate: 0.92 },
  { code: 'GBP', symbol: '£', name: 'British Pound', rate: 0.79 },
];

interface CurrencyStore {
  selectedCurrency: Currency;
  setSelectedCurrency: (currency: Currency) => void;
  formatPrice: (price: number) => string;
  convertPrice: (price: number) => number;
}

export const useCurrencyStore = create<CurrencyStore>()(
  persist(
    (set, get) => ({
      selectedCurrency: currencies[1], // Default to NGN
      setSelectedCurrency: (currency) => set({ selectedCurrency: currency }),
      formatPrice: (price) => {
        const { selectedCurrency } = get();
        const convertedPrice = price * selectedCurrency.rate;
        return new Intl.NumberFormat('en-NG', {
          style: 'currency',
          currency: selectedCurrency.code,
          minimumFractionDigits: 0,
          maximumFractionDigits: 2,
        }).format(convertedPrice);
      },
      convertPrice: (price) => {
        const { selectedCurrency } = get();
        return price * selectedCurrency.rate;
      },
    }),
    {
      name: 'currency-store',
    }
  )
);
