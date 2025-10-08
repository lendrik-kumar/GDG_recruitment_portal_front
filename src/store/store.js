import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useStore = create(
  persist(
    (set) => ({
      token: null,
      user: {
        name: '',
        email: '',
        isResuming: false,
      },
      setToken: (token) => set({ token }),
      setUser: (user) => set({ user }),
      clearAuth: () => set({ 
        token: null, 
        user: {
          name: '',
          email: '',
          isResuming: false,
        }
      }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        token: state.token,
        user: state.user,
      }),
    }
  )
)

export default useStore