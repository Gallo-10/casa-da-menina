/**
 * Classe de erro customizada para autenticação
 */
export class AuthError extends Error {
  constructor(
    message: string,
    public readonly statusCode: number
  ) {
    super(message)
    this.name = 'AuthError'
  }

  get isUnauthorized(): boolean {
    return this.statusCode === 401
  }

  get isBadRequest(): boolean {
    return this.statusCode === 400
  }

  get isServerError(): boolean {
    return this.statusCode >= 500
  }

  get isNetworkError(): boolean {
    return this.statusCode === 0
  }
}
