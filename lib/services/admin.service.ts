import { ApiClient } from '../http/client'

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

export interface AdminPost {
  id: number
  title: string
  type: string
  status: 'published' | 'draft'
  createdAt: string
  updatedAt: string
}

export class AdminService {
  // Estatísticas do dashboard
  static async getDashboardStats(): Promise<DashboardStats> {
    return ApiClient.get<DashboardStats>('/admin/dashboard/stats')
  }

  // Listar todos os posts para admin (incluindo rascunhos)
  static async getAllPosts(): Promise<AdminPost[]> {
    return ApiClient.get<AdminPost[]>('/admin/posts')
  }

  // Configurações do sistema
  static async getSettings(): Promise<Record<string, any>> {
    return ApiClient.get('/admin/settings')
  }

  static async updateSettings(settings: Record<string, any>): Promise<{ success: boolean; message: string }> {
    return ApiClient.put('/admin/settings', settings)
  }
}
