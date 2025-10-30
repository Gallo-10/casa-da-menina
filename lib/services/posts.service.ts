import { ApiClient } from '../http/client'
import { API_CONFIG } from '../config/api'
import type { TransparencyPost, TransparencyCategory, TransparencyDocumentData, DocumentAttachment } from '../types/transparency'

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
  nomes_arquivos?: string[]
}

export interface UpdatePostRequest extends Partial<CreatePostRequest> {
  id: string | number
  novos_arquivos?: File[]
  remover_arquivos_ids?: string[]
}

export interface PostResponse {
  id: string
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
 private static mapApiPostToTransparencyDocument(apiPost: any): TransparencyDocumentData { // Mude para 'any' para aceitar a resposta do backend
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

    // [LÓGICA DE ANEXOS CORRIGIDA]
    // O backend envia 'arquivos' (com IDs) E 'arquivos_base64' (para visualização)
    const base64List: string[] = Array.isArray(apiPost.arquivos_base64) ? apiPost.arquivos_base64 : []
    const arquivosMetadados: any[] = Array.isArray(apiPost.arquivos) ? apiPost.arquivos : []

    const attachments: DocumentAttachment[] = arquivosMetadados.map((arquivoMeta, index) => {
      const nomeOriginal = arquivoMeta.nome_original || 'arquivo.bin'
      const base64Url = base64List[index] || undefined // Pega o Base64 correspondente

      return {
        id: arquivoMeta.id, // <-- O ID que precisamos para deletar
        name: nomeOriginal,
        size: `${(arquivoMeta.tamanho_bytes / 1024).toFixed(1)} KB`,
        url: base64Url,
        providedName: true,
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
    const apiPost = await ApiClient.get<any>(API_CONFIG.ENDPOINTS.POSTS.GET_BY_ID(id)) // Mude para 'any'
    return this.mapApiPostToTransparencyDocument(apiPost)
  }
  // Criar novo post
  static async createPost(data: CreatePostRequest): Promise<PostResponse> {
    // Não vamos mais converter para Base64. Vamos usar FormData.
    const formData = new FormData()

    formData.append('titulo', data.title)
    formData.append('conteudo', data.content)
    formData.append('tipo', data.type)

    // Adiciona nomes customizados (se existirem)
    if (data.nomes_arquivos && data.nomes_arquivos.length > 0) {
      data.nomes_arquivos.forEach((nome) => {
        formData.append('nomes_arquivos', nome)
      })
    }
    
    // Adiciona os arquivos
    if (data.files && data.files.length > 0) {
      data.files.forEach((file) => {
        // O backend espera um array de arquivos no campo 'arquivos'
        formData.append('arquivos', file) 
      })
    }

    // Usa ApiClient.upload (que é para FormData) em vez de .post (JSON)
    return ApiClient.upload<PostResponse>(API_CONFIG.ENDPOINTS.POSTS.CREATE, formData)
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

    const formData = new FormData()

    // Adiciona campos de texto se eles foram alterados
    if (updateData.title) {
      formData.append('titulo', updateData.title)
    }
    if (updateData.content) {
      formData.append('conteudo', updateData.content)
    }
    if (updateData.type) {
      formData.append('tipo', updateData.type)
    }

    // Adiciona os NOVOS arquivos
    if (updateData.files && updateData.files.length > 0) {
      updateData.files.forEach((file) => {
        // O backend espera novos arquivos no campo 'novos_arquivos'
        formData.append('novos_arquivos', file)
      })
    }

    if (updateData.remover_arquivos_ids && updateData.remover_arquivos_ids.length > 0) {
      updateData.remover_arquivos_ids.forEach((idParaRemover) => {
        // O backend espera os IDs dos arquivos a serem removidos
        formData.append('remover_arquivos_ids', idParaRemover)
      })
    }


    
    return ApiClient.upload<PostResponse>(
      API_CONFIG.ENDPOINTS.POSTS.UPDATE(id.toString()),
      formData,
      'PUT'
    )
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
