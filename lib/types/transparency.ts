// Tipos e interfaces para o Portal da Transparência

export interface DocumentAttachment {
  id?: string
  name: string
  size: string
  url?: string
  // true quando veio de nomes_arquivos da API (não é nome gerado para exibição)
  providedName?: boolean
}

export interface TransparencyDocumentData {
  id: string
  title: string
  date: string
  type: string
  author: string
  content: string
  attachments?: DocumentAttachment[]
}

export interface TransparencyPost {
  id: string
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
