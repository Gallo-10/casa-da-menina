import { ApiClient } from '../../config/base/base-client'

export class SecretManagerApi {
  static async getSecret<T = any>(secretName: string): Promise<T> {
    const endpoint = `/secret-utils/ms?secretName=${encodeURIComponent(secretName)}`

    return ApiClient.request(endpoint, { method: 'GET'}) as Promise<T>
  }
}
