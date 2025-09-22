import { ApiClient } from '../../config/base/base-client'

export class SecretManagerApi {
  static async getSecret<T = any>(secretName: string): Promise<T> {
    const endpoint = `/secret-utils/ms?secretName=${encodeURIComponent(secretName)}`

    const headers: Record<string, string> = {
      Accept: '*/*',
      'x-api-key': process.env.NEXT_PUBLIC_API_KEY || 'Odie@cao10',
    }

    return ApiClient.request(endpoint, { method: 'GET', headers }) as Promise<T>
  }
}
