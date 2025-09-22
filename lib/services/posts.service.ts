import { ApiClient } from '../http/client'
import { API_CONFIG } from '../config/api'
import type { TransparencyPost, TransparencyCategory, TransparencyDocumentData } from '../types/transparency'

// Tipos das respostas da API (apenas campos usados aqui)
interface ApiPostBase {
  id?: string
  titulo?: string
  created_at?: string
  conteudo?: string
  tipo?: string
  arquivos_base64?: string[]
  nomes_arquivos?: string[]
  updated_at?: string
}

interface ApiPostAltKeys {
  postagem_id?: string
  postagem_titulo?: string
  postagem_created_at?: string
  postagem_conteudo?: string
  postagem_tipo?: string
  postagem_updated_at?: string
}

type ApiPost = ApiPostBase & ApiPostAltKeys

type PostPayload = {
  titulo?: string
  conteudo?: string
  tipo?: TransparencyCategory
  arquivos_base64?: string[]
  nomes_arquivos?: string[]
}

export interface CreatePostRequest {
  title: string
  content: string
  type: TransparencyCategory
  files?: File[]
  // Nomes reais dos arquivos vindos da página
  nomes_arquivos?: string[]
}

export interface UpdatePostRequest extends Partial<CreatePostRequest> {
  id: string | number
  // Lista de arquivos já existentes (base64) a serem mantidos na atualização
  existingArquivosBase64?: string[]
  // Nomes para os arquivos existentes (mesma ordem de existingArquivosBase64)
  existingNomesArquivos?: string[]
}

export interface PostResponse {
  id: number
  message: string
  success: boolean
}

export class PostsService {
  // Mapear dados da API para o formato esperado pelo frontend
  private static mapApiPostToTransparencyPost(apiPost: ApiPost): TransparencyPost {
    const id = (apiPost.id ?? apiPost.postagem_id ?? '') as string
    const title = (apiPost.titulo ?? apiPost.postagem_titulo ?? '') as string
    const createdAt = (apiPost.created_at ?? apiPost.postagem_created_at ?? '') as string
    const content = (apiPost.conteudo ?? apiPost.postagem_conteudo ?? '') as string
    const type = (apiPost.tipo ?? apiPost.postagem_tipo ?? '') as string

    const date = createdAt && !Number.isNaN(Date.parse(createdAt))
      ? new Date(createdAt).toLocaleDateString('pt-BR')
      : ''

    const excerpt = content ? `${content.substring(0, 150)}...` : ''

    return { id, title, date, excerpt, type }
  }

  static async getAllPostsMeta(): Promise<TransparencyPost[]> {
    return ApiClient.get<TransparencyPost[]>('/postagens/sem-arquivos')
  }

  // Buscar todos os posts
  static async getAllPosts(): Promise<TransparencyPost[]> {
    const apiPosts = await ApiClient.get<ApiPost[]>(API_CONFIG.ENDPOINTS.POSTS.LIST)
    return apiPosts.map(post => this.mapApiPostToTransparencyPost(post))
  }

  static async getPostsByTypeNoBase64(type: TransparencyCategory): Promise<TransparencyPost[]> {
    const apiPosts = await ApiClient.get<ApiPost[]>(`/postagens/tipo-sem-arquivos/${encodeURIComponent(type)}`)
    return apiPosts.map(post => {
      const id = (post.postagem_id ?? post.id ?? '') as string
      const title = (post.postagem_titulo ?? post.titulo ?? '') as string
      const createdAt = (post.postagem_created_at ?? post.created_at ?? '') as string
      const date = createdAt && !Number.isNaN(Date.parse(createdAt))
        ? new Date(createdAt).toLocaleDateString('pt-BR')
        : ''
      const content = (post.postagem_conteudo ?? post.conteudo ?? '') as string
      const typeStr = (post.postagem_tipo ?? post.tipo ?? '') as string
      const excerpt = content ? `${content.substring(0, 150)}...` : ''
      return { id, title, date, excerpt, type: typeStr }
    })
  }
  // Buscar posts por categoria
  static async getPostsByCategory(category: TransparencyCategory): Promise<TransparencyPost[]> {
    if (category === 'Todos') {
      return this.getAllPosts()
    }
    const apiPosts = await ApiClient.get<any[]>(API_CONFIG.ENDPOINTS.POSTS.BY_TYPE(category))
    return apiPosts.map(post => this.mapApiPostToTransparencyPost(post))
  }

  // Mapear dados da API para documento completo
  private static mapApiPostToTransparencyDocument(apiPost: ApiPost): TransparencyDocumentData {
    // Datas
    const createdAt = (apiPost.created_at ?? apiPost.postagem_created_at ?? '') as string
    const date = createdAt && !Number.isNaN(Date.parse(createdAt))
      ? new Date(createdAt).toLocaleDateString('pt-BR')
      : ''

    // Campos básicos
    const id = (apiPost.id ?? apiPost.postagem_id ?? '') as string
    const title = (apiPost.titulo ?? apiPost.postagem_titulo ?? '') as string
    const type = (apiPost.tipo ?? apiPost.postagem_tipo ?? '') as string
    const content = (apiPost.conteudo ?? apiPost.postagem_conteudo ?? 'Conteúdo não disponível') as string

    // Anexos
    const base64List = Array.isArray(apiPost.arquivos_base64) ? apiPost.arquivos_base64 : []
    const nomes = Array.isArray(apiPost.nomes_arquivos) ? apiPost.nomes_arquivos : []

    const safeTitleName = title
      .replace(/[^a-zA-Z0-9\s]/g, '')
      .replace(/\s+/g, '_')
      .substring(0, 30) || 'documento'

    const attachments = base64List.map((arquivo, index) => {
      const providedName = nomes[index]
      const hasProvided = typeof providedName === 'string' && providedName.trim().length > 0
      let name = hasProvided ? providedName : ''
      if (!name) {
        name = base64List.length === 1 ? `${safeTitleName}.pdf` : `${safeTitleName}_${index + 1}.pdf`
      }
      return {
        name,
        size: 'Tamanho não informado',
        url: arquivo,
        providedName: hasProvided,
      }
    })

    return {
      id,
      title,
      date,
      type,
      author: 'Administração',
      content,
      attachments,
    }
  }

  // Buscar post completo por ID
  static async getPostById(id: string): Promise<TransparencyDocumentData> {
    const apiPost = await ApiClient.get<ApiPost>(API_CONFIG.ENDPOINTS.POSTS.GET_BY_ID(id))
    return this.mapApiPostToTransparencyDocument(apiPost)
  }
  // Criar novo post
  static async createPost(data: CreatePostRequest): Promise<PostResponse> {
    let arquivos_base64: string[] = []
    let nomes_arquivos: string[] = []

    if (data.files && data.files.length > 0) {
      for (const file of data.files) {
        try {
          const base64 = await this.fileToBase64(file)
          arquivos_base64.push(base64)
          nomes_arquivos.push(file.name)
        } catch (error) {
          throw new Error(`Erro ao processar arquivo: ${file.name}`)
        }
      }
    }

    const payload: PostPayload = {
      titulo: data.title,
      conteudo: data.content,
      tipo: data.type,
      arquivos_base64,
      nomes_arquivos: (data.nomes_arquivos && data.nomes_arquivos.length > 0) ? data.nomes_arquivos : nomes_arquivos,
    }

    return ApiClient.post<PostResponse>(API_CONFIG.ENDPOINTS.POSTS.CREATE, payload)
  }

  // Método auxiliar para converter arquivo para base64
  private static fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()

      reader.onload = () => {
        const result = reader.result as string
        resolve(result) // Já inclui o data:tipo/subtipo;base64,
      }

      reader.onerror = () => {
        reject(new Error('Erro ao ler arquivo'))
      }

      reader.readAsDataURL(file)
    })
  }

  static async updatePost(data: UpdatePostRequest): Promise<PostResponse> {
    const { id, ...updateData } = data

    let newArquivosBase64: string[] = []
    let newNomesArquivos: string[] = []

    if (updateData.files && updateData.files.length > 0) {

      for (const file of updateData.files) {
        try {
          const base64 = await this.fileToBase64(file)
          newArquivosBase64.push(base64)
          newNomesArquivos.push(file.name)
        } catch (error) {
          console.error(`❌ Erro ao converter arquivo ${file.name}:`, error)
          throw new Error(`Erro ao processar arquivo: ${file.name}`)
        }
      }
    }

    const payload: PostPayload = {}
    if (updateData.title) {
      payload.titulo = updateData.title
    }
    if (updateData.content) {
      payload.conteudo = updateData.content
    }
    if (updateData.type) {
      payload.tipo = updateData.type
    }

    const existingProvided = Array.isArray(updateData.existingArquivosBase64)
    const hasNew = newArquivosBase64.length > 0

    if (existingProvided || hasNew) {
      const combinedArquivos: string[] = []
      const combinedNomes: string[] = []

      const existing = existingProvided ? (updateData.existingArquivosBase64 ?? []) : []
      const existingNames = existingProvided ? (updateData.existingNomesArquivos ?? []) : []

      for (let i = 0; i < existing.length; i++) {
        combinedArquivos.push(existing[i])
      }

      for (let i = 0; i < newArquivosBase64.length; i++) {
        combinedArquivos.push(newArquivosBase64[i])
      }
      
      const providedAllNames = updateData.nomes_arquivos
      const expectedLen = existing.length + newArquivosBase64.length
      if (providedAllNames && providedAllNames.length === expectedLen) {
        payload.arquivos_base64 = combinedArquivos
        payload.nomes_arquivos = providedAllNames
      } else {
        for (let i = 0; i < existing.length; i++) {
          combinedNomes.push(existingNames[i] ?? '')
        }
        if (newArquivosBase64.length > 0) {
          const providedNew = providedAllNames ?? []
          for (let i = 0; i < newArquivosBase64.length; i++) {
            const name = providedNew[i] ?? newNomesArquivos[i]
            combinedNomes.push(name)
          }
        }
        payload.arquivos_base64 = combinedArquivos
        payload.nomes_arquivos = combinedNomes
      }
    }

    return ApiClient.put<PostResponse>(API_CONFIG.ENDPOINTS.POSTS.UPDATE(id.toString()), payload)
  }

  // Deletar post
  static async deletePost(id: string): Promise<PostResponse> {
    return ApiClient.delete<PostResponse>(API_CONFIG.ENDPOINTS.POSTS.DELETE(id))
  }

  // Publicar rascunho
  static async publishPost(id: string): Promise<PostResponse> {
    return ApiClient.post<PostResponse>(API_CONFIG.ENDPOINTS.POSTS.PUBLISH(id))
  }

  // Salvar como rascunho
  static async saveDraft(data: CreatePostRequest): Promise<PostResponse> {
    return this.createPost(data)
  }
}
