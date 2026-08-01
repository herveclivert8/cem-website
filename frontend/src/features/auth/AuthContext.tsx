import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

import { apiClient, refreshAccessToken, setAccessToken } from '../../api/client'
import type { User } from '../../api/types'

interface AuthContextValue {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, fullName: string) => Promise<void>
  loginWithToken: (accessToken: string) => Promise<void>
  logout: () => Promise<void>
  googleLoginUrl: string
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

async function fetchMe(): Promise<User> {
  return (await apiClient.get<User>('/auth/me')).data
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      const token = await refreshAccessToken()
      if (token) {
        try {
          setUser(await fetchMe())
        } catch {
          setAccessToken(null)
        }
      }
      setIsLoading(false)
    })()
  }, [])

  async function login(email: string, password: string) {
    const res = await apiClient.post<{ access_token: string }>('/auth/login', { email, password })
    setAccessToken(res.data.access_token)
    setUser(await fetchMe())
  }

  async function register(email: string, password: string, fullName: string) {
    const res = await apiClient.post<{ access_token: string }>('/auth/register', {
      email,
      password,
      full_name: fullName,
    })
    setAccessToken(res.data.access_token)
    setUser(await fetchMe())
  }

  async function loginWithToken(newAccessToken: string) {
    setAccessToken(newAccessToken)
    setUser(await fetchMe())
  }

  async function logout() {
    await apiClient.post('/auth/logout')
    setAccessToken(null)
    setUser(null)
  }

  const googleLoginUrl = '/api/v1/auth/oauth/google/login'

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, loginWithToken, logout, googleLoginUrl }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider')
  return ctx
}
