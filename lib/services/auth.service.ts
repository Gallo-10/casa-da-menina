import { ApiClient } from '../http/client'
import type { LoginRequest, LoginResponse, TokenValidationResponse } from '../types/auth'

export class AuthService {
  // Login do admin (password deve ser enviado já em hash MD5)
  static async login(email: string, passwordHash: string): Promise<LoginResponse> {
    try {
      const requestBody: LoginRequest = {
        email,
        senha: passwordHash
      }

      const response = await ApiClient.post<LoginResponse>('/auth/login', requestBody)

      // Salvar token JWT real retornado pelo backend
      if (response && response.accessToken && typeof window !== 'undefined') {
        localStorage.setItem('authToken', response.accessToken)
        localStorage.setItem('tokenType', response.tokenType)
        localStorage.setItem('userEmail', email)
        localStorage.setItem('userId', response.userId.toString())
        localStorage.setItem('tokenExpiry', (Date.now() + (response.expiresIn * 1000)).toString())
      }

      return response
    } catch (error) {
      throw error
    }
  }

  // Logout
  static async logout(): Promise<void> {
    // Limpar token e todos os dados do usuário
    if (typeof window !== 'undefined') {
      localStorage.removeItem('authToken')
      localStorage.removeItem('tokenType')
      localStorage.removeItem('userEmail')
      localStorage.removeItem('userId')
      localStorage.removeItem('tokenExpiry')
    }
  }

  // Verificar se está autenticado (verificação local básica)
  static isAuthenticated(): boolean {
    if (typeof window === 'undefined') return false

    const token = localStorage.getItem('authToken')
    const expiry = localStorage.getItem('tokenExpiry')

    if (!token || !expiry) return false

    // Verificar se token ainda não expirou
    const now = Date.now()
    const expiryTime = parseInt(expiry)

    if (now > expiryTime) {
      this.logout()
      return false
    }

    return true
  }

  // Obter token atual
  static getToken(): string | null {
    if (typeof window === 'undefined') return null
    return localStorage.getItem('authToken')
  }

  // Obter token com tipo para Authorization header
  static getAuthHeader(): string | null {
    const token = this.getToken()
    const tokenType = typeof window !== 'undefined' ? localStorage.getItem('tokenType') : null

    if (!token) return null
    return `${tokenType || 'Bearer'} ${token}`
  }

  // Obter email do usuário logado
  static getUserEmail(): string | null {
    if (typeof window === 'undefined') return null
    return localStorage.getItem('userEmail')
  }

  // Obter ID do usuário logado
  static getUserId(): number | null {
    if (typeof window === 'undefined') return null
    const userId = localStorage.getItem('userId')
    return userId ? parseInt(userId) : null
  }

  // Verificar validade do token no backend
  static async validateToken(): Promise<boolean> {
    try {
      if (!this.isAuthenticated()) {
        return false
      }

      const authHeader = this.getAuthHeader()
      if (!authHeader) {
        return false
      }

      // Fazer requisição para validar token no backend
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/validate`, {
        method: 'GET',
        headers: {
          'Authorization': authHeader,
          'x-api-key': process.env.NEXT_PUBLIC_API_KEY || '',
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        this.logout()
        return false
      }

      const data: TokenValidationResponse = await response.json()

      if (data.status === 'valid') {
        return true
      } else {
        this.logout()
        return false
      }

    } catch (error) {
      console.error('❌ Erro na validação do token:', error)
      this.logout()
      return false
    }
  }
}
