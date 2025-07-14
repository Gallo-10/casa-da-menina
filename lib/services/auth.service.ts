import { ApiClient } from '../http/client'
import type { LoginRequest, LoginResponse } from '../types/auth'

export class AuthService {
  // Login do admin
  static async login(email: string, password: string): Promise<LoginResponse> {
    try {
      const requestBody: LoginRequest = {
        email,
        senha: password
      }

      const response = await ApiClient.post<LoginResponse>('/api/auth/login', requestBody)

      // Salvar token se login bem-sucedido
      if (response && typeof window !== 'undefined') {
        const token = (response as any).token || (response as any).accessToken
        if (token) {
          localStorage.setItem('authToken', token)
        }
      }

      return response
    } catch (error) {
      console.error('Erro no login:', error)
      throw error
    }
  }

  // Logout
  static async logout(): Promise<void> {
    // Apenas limpar token local (sem chamar endpoint)
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
      // Apenas verificar se o token existe localmente
      // Em produção, você pode implementar um endpoint específico para validação
      return this.isAuthenticated()
    } catch (error) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('authToken')
      }
      return false
    }
  }
}
