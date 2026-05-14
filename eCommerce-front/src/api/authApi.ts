import api from './api'

export interface SignupPayload {
  idUser: string
  nmUser: string
  nmPaswd: string
  noMobile: string
  nmEmail: string
}

export interface LoginPayload {
  idUser: string
  nmPaswd: string
}

export interface LoginResult {
  accessToken: string
  idUser: string
  nmUser: string
  cdUserType: string
}

export const authApi = {
  signup: (data: SignupPayload) =>
    api.post<{ message: string }>('/api/auth/signup', data),

  login: (data: LoginPayload) =>
    api.post<LoginResult>('/api/auth/login', data),
}