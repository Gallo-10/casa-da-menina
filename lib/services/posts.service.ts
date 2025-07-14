import { ApiClient } from '../http/client'
import type { TransparencyPost, TransparencyCategory, TransparencyDocumentData } from '../types/transparency'

export interface CreatePostRequest {
  title: string
  content: string
  type: TransparencyCategory
  files?: File[]
}

export interface UpdatePostRequest extends Partial<CreatePostRequest> {
  id: number
}

export interface PostResponse {
  id: number
  message: string
  success: boolean
}

export class PostsService {
  // Mapear dados da API para o formato esperado pelo frontend
  private static mapApiPostToTransparencyPost(apiPost: any): TransparencyPost {
    return {
      id: apiPost.id,
      title: apiPost.titulo,
      date: new Date(apiPost.createdAtUtc).toLocaleDateString('pt-BR'),
      excerpt: apiPost.conteudo ? apiPost.conteudo.substring(0, 150) + '...' : '',
      type: apiPost.tipo
    }
  }

  // Buscar todos os posts
  static async getAllPosts(): Promise<TransparencyPost[]> {
    const apiPosts = await ApiClient.get<any[]>('/postagens')
    return apiPosts.map(post => this.mapApiPostToTransparencyPost(post))
  }

  // Buscar posts por categoria
  static async getPostsByCategory(category: TransparencyCategory): Promise<TransparencyPost[]> {
    if (category === 'Todos') {
      return this.getAllPosts()
    }
    const apiPosts = await ApiClient.get<any[]>(`/postagens/tipo/${encodeURIComponent(category)}`)
    return apiPosts.map(post => this.mapApiPostToTransparencyPost(post))
  }

  // Mapear dados da API para documento completo
  private static mapApiPostToTransparencyDocument(apiPost: any): TransparencyDocumentData {
    return {
      id: apiPost.id,
      title: apiPost.titulo,
      date: new Date(apiPost.createdAtUtc).toLocaleDateString('pt-BR'),
      type: apiPost.tipo,
      author: 'Administração', // Valor padrão já que a API não retorna autor
      content: apiPost.conteudo || 'Conteúdo não disponível',
      attachments: apiPost.arquivos_base64?.map((arquivo: string, index: number) => {
        // Criar nome baseado no título da postagem
        const safeTitleName = apiPost.titulo
          .replace(/[^a-zA-Z0-9\s]/g, '') // Remove caracteres especiais
          .replace(/\s+/g, '_') // Substitui espaços por underscore
          .substring(0, 30) // Limita a 30 caracteres

        return {
          name: apiPost.arquivos_base64.length === 1
            ? `${safeTitleName}.pdf`
            : `${safeTitleName}_${index + 1}.pdf`,
          size: 'Tamanho não informado',
          url: arquivo // Base64 do arquivo
        }
      }) || []
    }
  }

  // Buscar post completo por ID
  static async getPostById(id: string): Promise<TransparencyDocumentData> {
    const apiPost = await ApiClient.get<any>(`/postagens/${id}`)
    return this.mapApiPostToTransparencyDocument(apiPost)
  }
  // Criar novo post
  static async createPost(data: CreatePostRequest): Promise<PostResponse> {
    // Converter arquivos para base64 se existirem
    let arquivos_base64: string[] = []

    if (data.files && data.files.length > 0) {
      for (const file of data.files) {
        try {
          const base64 = await this.fileToBase64(file)
          arquivos_base64.push(base64)
        } catch (error) {
          throw new Error(`Erro ao processar arquivo: ${file.name}`)
        }
      }
    }

    const payload = {
      titulo: data.title,      // Backend espera 'titulo'
      conteudo: data.content,  // Backend espera 'conteudo'
      tipo: data.type,         // Backend espera 'tipo'
      arquivos_base64,         // Backend espera 'arquivos_base64'
    }

    return ApiClient.post<PostResponse>('/postagens', payload)
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

  // Atualizar post
  static async updatePost(data: UpdatePostRequest): Promise<PostResponse> {
    const { id, ...updateData } = data

    // Converter arquivos para base64 se existirem
    let arquivos_base64: string[] = []

    if (updateData.files && updateData.files.length > 0) {

      for (const file of updateData.files) {
        try {
          const base64 = await this.fileToBase64(file)
          arquivos_base64.push(base64)
        } catch (error) {
          console.error(`❌ Erro ao converter arquivo ${file.name}:`, error)
          throw new Error(`Erro ao processar arquivo: ${file.name}`)
        }
      }
    }

    // Converter nomes dos campos para português
    const payload: any = {}
    if (updateData.title) payload.titulo = updateData.title
    if (updateData.content) payload.conteudo = updateData.content
    if (updateData.type) payload.tipo = updateData.type
    if (arquivos_base64.length > 0) payload.arquivos_base64 = arquivos_base64

    return ApiClient.put<PostResponse>(`/postagens/${id}`, payload)
  }

  // Deletar post
  static async deletePost(id: string): Promise<PostResponse> {
    return ApiClient.delete<PostResponse>(`/postagens/${id}`)
  }

  // Publicar rascunho
  static async publishPost(id: string): Promise<PostResponse> {
    return ApiClient.post<PostResponse>(`/postagens/${id}/publish`)
  }

  // Salvar como rascunho
  static async saveDraft(data: CreatePostRequest): Promise<PostResponse> {
    return this.createPost(data)
  }
}
