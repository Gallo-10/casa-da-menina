import { ApiClient } from './client'

export interface UploadResponse {
  success: boolean
  message: string
  fileUrl: string
  fileName: string
  fileSize: number
}

export interface FileInfo {
  name: string
  size: number
  type: string
  url: string
}

export class FilesApi {
  // Upload de arquivo único
  static async uploadFile(file: File, category?: string): Promise<UploadResponse> {
    const formData = new FormData()
    formData.append('file', file)

    if (category) {
      formData.append('category', category)
    }

    return ApiClient.upload<UploadResponse>('/files/upload', formData)
  }

  // Upload de múltiplos arquivos
  static async uploadMultipleFiles(files: File[], category?: string): Promise<UploadResponse[]> {
    const formData = new FormData()

    files.forEach((file, index) => {
      formData.append(`files[${index}]`, file)
    })

    if (category) {
      formData.append('category', category)
    }

    return ApiClient.upload<UploadResponse[]>('/files/upload/multiple', formData)
  }

  // Listar arquivos por categoria
  static async getFilesByCategory(category: string): Promise<FileInfo[]> {
    return ApiClient.get<FileInfo[]>(`/files?category=${encodeURIComponent(category)}`)
  }

  // Deletar arquivo
  static async deleteFile(fileName: string): Promise<{ success: boolean; message: string }> {
    return ApiClient.delete(`/files/${encodeURIComponent(fileName)}`)
  }

  // Download de arquivo (retorna URL para download)
  static getDownloadUrl(fileName: string): string {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.casadamenina.org'
    return `${baseUrl}/files/download/${encodeURIComponent(fileName)}`
  }
}
