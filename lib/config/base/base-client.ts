import { SecretManagerApi } from "@/lib/api/secret-manager/secret-manager.api";

export class ApiClient {
  private static readonly BASE_URL = 'https://backend.casadamenina.com';

  static async request<T = any>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const isAbsolute = /^https?:\/\//i.test(endpoint)
    const url = isAbsolute ? endpoint : `${this.BASE_URL}${endpoint}`

    const incomingHeaders = (options.headers || {}) as Record<string, string>
    const headers: Record<string, string> = {
      // Por padrão aceite qualquer tipo de resposta
      Accept: incomingHeaders['Accept'] || incomingHeaders['accept'] || '*/*',
      ...incomingHeaders,
    }

    const hasBody = typeof options.body !== 'undefined' && options.body !== null
    const hasContentType = Object.keys(headers).some(
      (k) => k.toLowerCase() === 'content-type'
    )
    if (hasBody && !hasContentType) {
      headers['Content-Type'] = 'application/json'
    }

    // x-api-key: respeita header existente, senão usa env com fallback
    const hasApiKeyHeader = Object.keys(headers).some(
      (k) => k.toLowerCase() === 'x-api-key'
    )
    if (!hasApiKeyHeader) {
      const apiKey = await SecretManagerApi.getSecret('API_KEY');
      headers['x-api-key'] = apiKey
    }

    // Authorization: inclui se não fornecido nos headers e existir token no browser
    const hasAuthHeader = Object.keys(headers).some(
      (k) => k.toLowerCase() === 'authorization'
    )
    const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null
    if (!hasAuthHeader && token) {
      headers['Authorization'] = `Bearer ${token}`
    }

    const config: RequestInit = {
      ...options,
      headers,
    }

    try {
      const response = await fetch(url, config)

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const contentType = response.headers.get('content-type') || ''
      if (contentType.includes('application/json')) {
        return await response.json()
      }
      // @ts-expect-error: pode retornar string quando não for JSON
      return await response.text()
    } catch (error) {
      console.error(`API Error [${endpoint}]:`, error)
      throw error
    }
  }

  static get<T = any>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' })
  }

  static post<T = any>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  static put<T = any>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  static delete<T = any>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' })
  }

  static async upload<T = any>(endpoint: string, formData: FormData): Promise<T> {
    const url = `${this.BASE_URL}${endpoint}`

    const headers: Record<string, string> = {}

    const apiKey = process.env.NEXT_PUBLIC_API_KEY
    if (apiKey) {
      headers['x-api-key'] = apiKey
    }

    // Adicionar token de autenticação se existir
    const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: formData,
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error(`Upload Error [${endpoint}]:`, error)
      throw error
    }
  }
}
