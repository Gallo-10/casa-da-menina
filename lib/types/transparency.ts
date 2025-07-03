// Tipos e interfaces para o Portal da Transparência

export interface DocumentAttachment {
  name: string
  size: string
  url?: string
}

export interface TransparencyDocumentData {
  id: number
  title: string
  date: string
  type: string
  author: string
  content: string
  attachments?: DocumentAttachment[]
}

export interface TransparencyPost {
  id: number
  title: string
  date: string
  excerpt: string
  type: string
}

export type TransparencyCategory =
  | "Todos"
  | "Documentos Constitutivos"
  | "Organização Administrativa"
  | "Contratos Vigentes"
  | "Relação dos Fornecedores"
  | "Mural de Publicações"
  | "Relação das Parcerias"

// Estados da aplicação
export interface TransparencyState {
  posts: TransparencyPost[]
  loading: boolean
  error: string | null
  currentFilter: TransparencyCategory
}

// Resposta da API (para futuro uso)
export interface ApiResponse<T> {
  data: T
  success: boolean
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  hasNext: boolean
  hasPrev: boolean
}
