import { API_CONFIG, buildApiUrl, getAuthHeaders } from '@/lib/config/api'

// Cliente HTTP genérico para todas as APIs
export class ApiClient {
  static async request<T = any>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = buildApiUrl(endpoint)

    // Await async auth headers before constructing the final config
    const authHeaders = await getAuthHeaders()
    const incoming = (options.headers || {}) as Record<string, string>
    const headers: Record<string, string> = {
      ...authHeaders,
      ...incoming,
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

  static async upload<T = any>(
    endpoint: string, 
    formData: FormData,
    method: 'POST' | 'PUT' = 'POST'
  ): Promise<T> {
    const url = buildApiUrl(endpoint)

    const headers: Record<string, string> = {}
    try {
      const apiKey = await API_CONFIG.getApiKey()
      headers['x-api-key'] = apiKey
    } catch (e) {
      console.warn('Could not retrieve API key for upload:', e)
    }

    const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }

    try {
      const response = await fetch(url, {
        method: method,
        headers,
        body: formData,
      })

      if (!response.ok) {
        const errorBody = await response.text()
        console.error(`Falha no Upload [${method} ${endpoint}]: ${response.status}`, errorBody)
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error(`Upload Error [${endpoint}]:`, error)
      throw error
    }
  }
}

