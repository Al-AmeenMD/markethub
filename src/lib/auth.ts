import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface User {
  id: string
  email: string
  role: 'user' | 'vendor' | 'admin'
}

interface AuthStore {
  user: User | null
  token: string | null
  setUser: (user: User | null) => void
  setToken: (token: string | null) => void
  logout: () => void
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      setUser: (user) => set({ user }),
      setToken: (token) => set({ token }),
      logout: () => set({ user: null, token: null }),
    }),
    {
      name: 'auth-storage',
    }
  )
)

export async function loginUser(email: string, password: string): Promise<{ user: User; token: string }> {
  // TODO: Replace with actual API call
  // This is a mock implementation
  if (email === 'test@example.com' && password === 'password123') {
    return {
      user: {
        id: '1',
        email: 'test@example.com',
        role: 'user',
      },
      token: 'mock-jwt-token',
    }
  }
  throw new Error('Invalid credentials')
}
