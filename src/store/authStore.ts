import { create } from 'zustand'
import { User } from '../types'
import { api } from '../services/api'

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: JSON.parse(localStorage.getItem('@financeflow:user') || 'null'),
  token: localStorage.getItem('@financeflow:token'),
  isAuthenticated: !!localStorage.getItem('@financeflow:token'),

  login: async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password })
    localStorage.setItem('@financeflow:token', data.token)
    localStorage.setItem('@financeflow:user', JSON.stringify(data.user))
    set({ user: data.user, token: data.token, isAuthenticated: true })
  },

  register: async (name, email, password) => {
    const { data } = await api.post('/auth/register', { name, email, password })
    localStorage.setItem('@financeflow:token', data.token)
    localStorage.setItem('@financeflow:user', JSON.stringify(data.user))
    set({ user: data.user, token: data.token, isAuthenticated: true })
  },

  logout: () => {
    localStorage.removeItem('@financeflow:token')
    localStorage.removeItem('@financeflow:user')
    set({ user: null, token: null, isAuthenticated: false })
  },
}))
