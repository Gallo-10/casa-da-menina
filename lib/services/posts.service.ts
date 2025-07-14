import { ApiClient } from '../http/client'
import type { TransparencyPost, TransparencyCategory, TransparencyDocumentData } from '../types/transparency'

export interface CreatePostRequest {
  title: string
  content: string
  type: TransparencyCategory
  files?: File[]
  isDraft?: boolean
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
  // Buscar todos os posts
  static async getAllPosts(): Promise<TransparencyPost[]> {
    return ApiClient.get<TransparencyPost[]>('/postagens')
  }

  // Buscar posts por categoria
  static async getPostsByCategory(category: TransparencyCategory): Promise<TransparencyPost[]> {
    if (category === 'Todos') {
      return this.getAllPosts()
    }
    return ApiClient.get<TransparencyPost[]>(`/postagens/tipo/${encodeURIComponent(category)}`)
  }

  // Buscar post completo por ID
  static async getPostById(id: number): Promise<TransparencyDocumentData> {
    return ApiClient.get<TransparencyDocumentData>(`/postagens/${id}`)
  }

  // Criar novo post
  static async createPost(data: CreatePostRequest): Promise<PostResponse> {
    if (data.files && data.files.length > 0) {
      const formData = new FormData()
      formData.append('title', data.title)
      formData.append('content', data.content)
      formData.append('type', data.type)
      formData.append('isDraft', String(data.isDraft || false))

      data.files.forEach((file, index) => {
        formData.append(`files[${index}]`, file)
      })

      return ApiClient.upload<PostResponse>('/postagens', formData)
    } else {
      return ApiClient.post<PostResponse>('/postagens', {
        title: data.title,
        content: data.content,
        type: data.type,
        isDraft: data.isDraft || false,
      })
    }
  }

  // Atualizar post
  static async updatePost(data: UpdatePostRequest): Promise<PostResponse> {
    const { id, ...updateData } = data

    if (updateData.files && updateData.files.length > 0) {
      const formData = new FormData()

      if (updateData.title) formData.append('title', updateData.title)
      if (updateData.content) formData.append('content', updateData.content)
      if (updateData.type) formData.append('type', updateData.type)

      updateData.files.forEach((file, index) => {
        formData.append(`files[${index}]`, file)
      })

      return ApiClient.upload<PostResponse>(`/postagens/${id}`, formData)
    } else {
      return ApiClient.put<PostResponse>(`/postagens/${id}`, updateData)
    }
  }

  // Deletar post
  static async deletePost(id: number): Promise<PostResponse> {
    return ApiClient.delete<PostResponse>(`/postagens/${id}`)
  }

  // Publicar rascunho
  static async publishPost(id: number): Promise<PostResponse> {
    return ApiClient.post<PostResponse>(`/postagens/${id}/publish`)
  }

  // Salvar como rascunho
  static async saveDraft(data: Omit<CreatePostRequest, 'isDraft'>): Promise<PostResponse> {
    return this.createPost({ ...data, isDraft: true })
  }
}
