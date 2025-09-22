import { ApiClient } from '../../config/base/base-client'

export class SecretManagerApi {
  static async getSecret<T = any>(secretName: string): Promise<T> {
    const endpoint = `/secret-utils/ms?secretName=${encodeURIComponent(secretName)}`
    const apiKey = await SecretManagerApi.getSecret('API_KEY');
    const headers: Record<string, string> = {
      Accept: '*/*',
      'x-api-key': apiKey,
    }

    return ApiClient.request(endpoint, { method: 'GET', headers }) as Promise<T>
  }
}
