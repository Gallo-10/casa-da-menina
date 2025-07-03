import { LoginRequest, LoginResponse } from './types/auth'
import { AuthError } from './errors/auth-error'

export class AuthService {
  private static readonly BASE_URL = process.env.NEXT_PUBLIC_MS_ADMIN_URL || 'https://api.casadamenina.org'

  static async login(email: string, passwordHash: string): Promise<LoginResponse> {
    try {
      const requestBody: LoginRequest = {
        email,
        passwordHash
      }

      const response = await fetch(`${this.BASE_URL}/ms-admin-login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(requestBody)
      })

      let responseData: LoginResponse
      try {
        responseData = await response.json()
      } catch {
        responseData = {
          message: response.ok ? 'Login realizado com sucesso' : 'Erro de autenticação'
        }
      }

      if (!response.ok) {
        throw new AuthError(
          responseData.message || `Erro HTTP ${response.status}`,
          response.status
        )
      }

      return responseData

    } catch (error) {
      // Se for um erro conhecido, re-lança
      if (error instanceof AuthError) {
        throw error
      }

      // Se for erro de rede ou outro erro desconhecido
      console.error('Erro ao comunicar com o serviço de autenticação:', error)
      throw new AuthError(
        'Erro de conexão. Verifique sua internet e tente novamente.',
        0
      )
    }
  }
}
