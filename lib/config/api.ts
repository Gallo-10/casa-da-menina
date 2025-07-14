// Configuração centralizada da API
export const API_CONFIG = {
  // URL base da API - SEMPRE usar esta configuração
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
  API_KEY: process.env.NEXT_PUBLIC_API_KEY || 'Odie@cao10'
}

// Função helper para construir URLs completas
export const buildApiUrl = (endpoint: string): string => {
  return `${API_CONFIG.BASE_URL}${endpoint}`
}

// Função para obter headers com autenticação
export const getAuthHeaders = (): Record<string, string> => {
  const headers: Record<string, string> = {
    ...API_CONFIG.DEFAULT_HEADERS,
    'x-api-key': API_CONFIG.API_KEY
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
