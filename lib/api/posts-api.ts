import { ApiClient } from './client'
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

export interface UploadResponse {
  success: boolean
  message: string
  fileUrl: string
  fileName: string
  fileSize: number
}

export class PostsApi {
  // Buscar todos os posts
  static async getAllPosts(): Promise<TransparencyPost[]> {
    return ApiClient.get<TransparencyPost[]>('/posts')
  }

  // Buscar posts por categoria
  static async getPostsByCategory(category: TransparencyCategory): Promise<TransparencyPost[]> {
    if (category === 'Todos') {
      return this.getAllPosts()
    }
    return ApiClient.get<TransparencyPost[]>(`/posts?category=${encodeURIComponent(category)}`)
  }

  // Buscar post completo por ID (com conteúdo detalhado)
  static async getPostById(id: number): Promise<TransparencyDocumentData> {
    return ApiClient.get<TransparencyDocumentData>(`/posts/${id}`)
  }

  // Criar novo post
  static async createPost(data: CreatePostRequest): Promise<PostResponse> {
    if (data.files && data.files.length > 0) {
      // Se tem arquivos, usar FormData
      const formData = new FormData()
      formData.append('title', data.title)
      formData.append('content', data.content)
      formData.append('type', data.type)
      formData.append('isDraft', String(data.isDraft || false))

      data.files.forEach((file, index) => {
        formData.append(`files[${index}]`, file)
      })

      return ApiClient.upload<PostResponse>('/posts', formData)
    } else {
      // Se não tem arquivos, usar JSON
      return ApiClient.post<PostResponse>('/posts', {
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

      return ApiClient.upload<PostResponse>(`/posts/${id}`, formData)
    } else {
      return ApiClient.put<PostResponse>(`/posts/${id}`, updateData)
    }
  }

  // Deletar post
  static async deletePost(id: number): Promise<PostResponse> {
    return ApiClient.delete<PostResponse>(`/posts/${id}`)
  }

  // Publicar rascunho
  static async publishPost(id: number): Promise<PostResponse> {
    return ApiClient.post<PostResponse>(`/posts/${id}/publish`)
  }

  // Salvar como rascunho
  static async saveDraft(data: Omit<CreatePostRequest, 'isDraft'>): Promise<PostResponse> {
    return this.createPost({ ...data, isDraft: true })
  }

  // Upload de arquivo individual (para usar separadamente)
  static async uploadFile(file: File, category?: string): Promise<UploadResponse> {
    const formData = new FormData()
    formData.append('file', file)

    if (category) {
      formData.append('category', category)
    }

    return ApiClient.upload<UploadResponse>('/files/upload', formData)
  }

  // Deletar arquivo
  static async deleteFile(fileName: string): Promise<{ success: boolean; message: string }> {
    return ApiClient.delete(`/files/${encodeURIComponent(fileName)}`)
  }

  // Obter URL de download para arquivo
  static getFileDownloadUrl(fileName: string): string {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.casadamenina.org'
    return `${baseUrl}/files/download/${encodeURIComponent(fileName)}`
  }
}
