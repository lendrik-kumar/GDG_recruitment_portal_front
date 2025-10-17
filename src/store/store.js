import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useStore = create(
  persist(
    (set) => ({
      user: {
        name: '',
        email: '',
        isResuming: false,
      },
      setUser: (user) => set({ user }),
      clearAuth: () => set({ 
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
        user: state.user,
      }),
    }
  )
)

export default useStore