/**
 * Interfaces para autenticação administrativa
 */

export interface LoginRequest {
  email: string
  senha: string
}

export interface LoginResponse {
  message: string
  success?: boolean
}
