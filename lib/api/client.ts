// Cliente HTTP genérico para todas as APIs
export class ApiClient {
  private static readonly BASE_URL = process.env.NEXT_PUBLIC_API_URL;

  static async request<T = any>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.BASE_URL}${endpoint}`

    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...options.headers,
      },
      ...options,
    }

    // Adicionar API key se disponível
    const apiKey = process.env.NEXT_PUBLIC_API_KEY
    if (apiKey) {
      config.headers = {
        ...config.headers,
        'x-api-key': apiKey,
      }
    }

    // Adicionar token de autenticação se existir
    const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null
    if (token) {
      config.headers = {
        ...config.headers,
        'Authorization': `Bearer ${token}`,
      }
    }

    try {
      const response = await fetch(url, config)

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      return await response.json()
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

    // Adicionar API key se disponível
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
