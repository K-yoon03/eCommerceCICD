import { createContext, useContext, useState, useCallback } from 'react'
import type { ReactNode } from 'react'
import type { LoginResult } from '../api/authApi'
import { USER_TYPE } from '../constants/userConstants'

interface AuthUser {
  idUser: string
  nmUser: string
  cdUserType: string
}

interface AuthContextType {
  user: AuthUser | null
  isLoggedIn: boolean
  isAdmin: boolean
  login: (result: LoginResult) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    const stored = localStorage.getItem('user')
    return stored ? JSON.parse(stored) : null
  })

  const login = useCallback((result: LoginResult) => {
    localStorage.setItem('accessToken', result.accessToken)
    const authUser: AuthUser = {
      idUser: result.idUser,
      nmUser: result.nmUser,
      cdUserType: result.cdUserType,
    }
    localStorage.setItem('user', JSON.stringify(authUser))
    setUser(authUser)
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('user')
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider value={{
      user,
      isLoggedIn: !!user,
      isAdmin: user?.cdUserType === USER_TYPE.ADMIN,
      login,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}