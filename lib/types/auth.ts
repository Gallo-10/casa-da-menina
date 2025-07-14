/**
 * Interfaces para autenticação administrativa
 */

export interface LoginRequest {
  email: string
  senha: string
}

export interface LoginResponse {
  status: string
  message: string
  userId: number
  accessToken: string
  tokenType: string
  expiresIn: number
}

export interface TokenValidationResponse {
  status: string
  message: string
  user: {
    sub: number
    email: string
    iat: number
    exp: number
  }
}

export interface User {
  id: number
  email: string
  iat: number
  exp: number
}
