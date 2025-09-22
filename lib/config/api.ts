import { SecretManagerApi } from "../api/secret-manager/secret-manager.api"

// Configuração centralizada da API
export const API_CONFIG = {
  BASE_URL: 'https://backend.casadamenina.com',

  // Endpoints principais
  ENDPOINTS: {
    AUTH: {
      LOGIN: '/auth/login',
      VALIDATE: '/auth/validate',
      LOGOUT: '/auth/logout'
    },
    POSTS: {
      LIST: '/postagens',
      CREATE: '/postagens',
      GET_BY_ID: (id: string) => `/postagens/${id}`,
      DELETE: (id: string) => `/postagens/${id}`,
      UPDATE: (id: string) => `/postagens/${id}`,
      BY_TYPE: (type: string) => `/postagens/tipo/${encodeURIComponent(type)}`,
      PUBLISH: (id: string) => `/postagens/${id}/publish`
    }
  },

  // Headers padrão
  DEFAULT_HEADERS: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },

  // API Key (pode vir de variável de ambiente ou fallback)
  // getApiKey retorna uma Promise<string> para que a resolução seja assíncrona
  getApiKey: async (): Promise<string> => {
    const val = await SecretManagerApi.getSecret('API_KEY')
    return typeof val === 'string' ? val : String(val ?? '')
  }
}

// Função helper para construir URLs completas
// Função para obter headers com autenticação
export const getAuthHeaders = async (): Promise<Record<string, string>> => {
  const apiKey = await API_CONFIG.getApiKey()
  const headers: Record<string, string> = {
    ...API_CONFIG.DEFAULT_HEADERS,
    'x-api-key': apiKey
  }

  // Adicionar token se disponível (apenas no browser)
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('authToken')
    const tokenType = localStorage.getItem('tokenType')

    if (token) {
      headers['Authorization'] = `${tokenType || 'Bearer'} ${token}`
    }
  }

  return headers
}
