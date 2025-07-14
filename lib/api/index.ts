// Centralizador das APIs essenciais
export { ApiClient } from './client'
export { PostsApi } from './posts-api'
export { AuthApi } from './auth-api'
export { AdminApi } from './admin-api'

// Re-exportar tipos importantes
export type {
  CreatePostRequest,
  UpdatePostRequest,
  PostResponse,
  UploadResponse,
} from './posts-api'

export type {
  DashboardStats,
} from './admin-api'
