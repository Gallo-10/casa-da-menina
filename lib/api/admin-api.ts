import { ApiClient } from './client'

export interface DashboardStats {
  totalPosts: number
  totalViews: number
  totalDownloads: number
  recentActivity: Array<{
    id: string
    type: 'post' | 'view' | 'download'
    description: string
    timestamp: string
  }>
}

export class AdminApi {
  // Dashboard stats
  static async getDashboardStats(): Promise<DashboardStats> {
    return ApiClient.get<DashboardStats>('/admin/dashboard/stats')
  }

  // Listar todos os posts (incluindo rascunhos) para admin
  static async getAllPostsAdmin(): Promise<Array<{
    id: number
    title: string
    type: string
    status: 'published' | 'draft'
    createdAt: string
    updatedAt: string
  }>> {
    return ApiClient.get('/admin/posts')
  }

  // Configurações básicas do sistema
  static async getSettings(): Promise<Record<string, any>> {
    return ApiClient.get('/admin/settings')
  }

  static async updateSettings(settings: Record<string, any>): Promise<{ success: boolean; message: string }> {
    return ApiClient.put('/admin/settings', settings)
  }
}
