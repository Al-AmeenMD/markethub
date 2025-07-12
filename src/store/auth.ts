import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { jwtDecode } from 'jwt-decode';

interface GoogleUser {
  email: string;
  name: string;
  picture: string;
  sub: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'user' | 'vendor' | 'admin';
}

interface AuthStore {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: (credential: string) => Promise<void>;
  logout: () => void;
  updateUserRole: (role: User['role']) => Promise<void>;
  isAuthenticated: boolean;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: async (email: string, password: string) => {
        // Mock login - replace with actual API call
        if (email && password) {
          const user: User = {
            id: '1',
            email,
            name: 'User',
            role: 'user',
          };
          set({ user, isAuthenticated: true });
        }
      },
      loginWithGoogle: async (credential: string) => {
        try {
          const decoded = jwtDecode<GoogleUser>(credential);
          const user: User = {
            id: decoded.sub,
            email: decoded.email,
            name: decoded.name,
            avatar: decoded.picture,
            role: 'user',
          };
          set({ user, isAuthenticated: true });
        } catch (error) {
          console.error('Failed to decode Google credential:', error);
          throw error;
        }
      },
      updateUserRole: async (role: User['role']) => {
        // In a real app, make an API call to update the user's role
        set((state) => ({
          user: state.user ? { ...state.user, role } : null,
        }));
      },
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
    }),
    {
      name: 'auth-store',
    }
  )
);
