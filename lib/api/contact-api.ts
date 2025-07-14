import { ApiClient } from './client'

export interface ContactRequest {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
}

export interface ContactResponse {
  success: boolean
  message: string
  id?: string
}

export class ContactApi {
  // Enviar mensagem de contato
  static async sendContactMessage(data: ContactRequest): Promise<ContactResponse> {
    return ApiClient.post<ContactResponse>('/contact', data)
  }

  // Para o admin: listar mensagens de contato
  static async getContactMessages(): Promise<Array<ContactRequest & { id: string; createdAt: string; status: string }>> {
    return ApiClient.get('/admin/contact/messages')
  }

  // Para o admin: marcar mensagem como lida
  static async markAsRead(messageId: string): Promise<ContactResponse> {
    return ApiClient.put(`/admin/contact/messages/${messageId}/read`)
  }

  // Para o admin: responder mensagem
  static async replyToMessage(messageId: string, reply: string): Promise<ContactResponse> {
    return ApiClient.post(`/admin/contact/messages/${messageId}/reply`, { reply })
  }
}
