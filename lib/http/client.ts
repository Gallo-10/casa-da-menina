// Cliente HTTP genérico para todas as APIs
export class ApiClient {
  private static readonly BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://backend.casadamenina.com';

  static async request<T = any>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    // Debug completo das variáveis de ambiente
    console.log('🔍 Environment Variables Debug:')
    console.log('NODE_ENV:', process.env.NODE_ENV)
    console.log('NEXT_PUBLIC_API_URL:', process.env.NEXT_PUBLIC_API_URL)
    console.log('NEXT_PUBLIC_API_KEY:', process.env.NEXT_PUBLIC_API_KEY ? '[DEFINED]' : '[UNDEFINED]')
    console.log('BASE_URL resolved:', this.BASE_URL)

    // Validar se BASE_URL não está undefined
    if (!this.BASE_URL || this.BASE_URL === 'undefined') {
      throw new Error('❌ API URL não configurada! Verifique NEXT_PUBLIC_API_URL nas variáveis de ambiente.')
    }

    const url = `${this.BASE_URL}${endpoint}`

    console.log(`🔗 Making request to: ${url}`) // Debug temporário

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
        'x-api-key': apiKey.trim(),
      }
    }

    // Adicionar token de autenticação se disponível (apenas no browser)
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('authToken')
      const tokenType = localStorage.getItem('tokenType')

      if (token) {
        config.headers = {
          ...config.headers,
          'Authorization': `${tokenType || 'Bearer'} ${token}`,
        }
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
    // Validar se BASE_URL não está undefined
    if (!this.BASE_URL || this.BASE_URL === 'undefined') {
      throw new Error('❌ API URL não configurada! Verifique NEXT_PUBLIC_API_URL nas variáveis de ambiente.')
    }

    const url = `${this.BASE_URL}${endpoint}`

    console.log(`📤 Making upload request to: ${url}`) // Debug temporário

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
