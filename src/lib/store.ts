import create from 'zustand'
import { persist } from 'zustand/middleware'

type User = { id: string; name: string }

type StoreState = {
  user: null | User
  submitted: boolean
  voted: boolean
}

type StoreActions = {
  setUser: (user: User) => void
  submit: () => void
  vote: () => void
}

export const useStore = create<StoreState & StoreActions>(
  persist(
    (set) => ({
      user: null,
      submitted: false,
      voted: false,
      setUser: (user: User) => set({ user }),
      submit: () => set({ submitted: true }),
      vote: () => set({ voted: true }),
    }),
    { name: 'era-uma-vez-store' }
  )
)
