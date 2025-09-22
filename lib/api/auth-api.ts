import { ApiClient } from '../config/base/base-client'
import type { LoginRequest, LoginResponse } from '../types/auth'

export class AuthApi {
  // Login do admin
  static async login(email: string, password: string): Promise<LoginResponse> {
    const requestBody: LoginRequest = {
      email,
      senha: password // Em produção, fazer hash no frontend também
    }

    try {
      const response = await ApiClient.post<LoginResponse>('/auth/login', requestBody)

      // Se login foi bem-sucedido, salvar token
      if (response && typeof window !== 'undefined') {
        // Assumindo que a resposta inclui um token
        const token = (response as any).token || (response as any).accessToken
        if (token) {
          localStorage.setItem('authToken', token)
        }
      }

      return response
    } catch (error) {
      throw error
    }
  }

  // Logout
  static async logout(): Promise<void> {
    // Limpar token local (não há endpoint de logout na API)
    if (typeof window !== 'undefined') {
      localStorage.removeItem('authToken')
    }
  }

  // Verificar se está autenticado
  static isAuthenticated(): boolean {
    if (typeof window === 'undefined') return false
    return !!localStorage.getItem('authToken')
  }

  // Obter token atual
  static getToken(): string | null {
    if (typeof window === 'undefined') return null
    return localStorage.getItem('authToken')
  }

  // Verificar validade do token
  static async validateToken(): Promise<boolean> {
    try {
      await ApiClient.get('/ms-admin-validate')
      return true
    } catch (error) {
      // Token inválido, remover
      if (typeof window !== 'undefined') {
        localStorage.removeItem('authToken')
      }
      return false
    }
  }

  // Renovar token
  static async refreshToken(): Promise<LoginResponse> {
    try {
      const response = await ApiClient.post<LoginResponse>('/ms-admin-refresh')

      // Atualizar token se necessário
      if (response && typeof window !== 'undefined') {
        const token = (response as any).token || (response as any).accessToken
        if (token) {
          localStorage.setItem('authToken', token)
        }
      }

      return response
    } catch (error) {
      // Se não conseguir renovar, fazer logout
      this.logout()
      throw error
    }
  }
}
