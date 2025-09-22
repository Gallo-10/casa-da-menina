import { ApiClient } from '../../config/base/base-client'
import { SecretManagerApi } from '../secret-manager/secret-manager.api';
import { GraphApiResponse } from './graph-api.interface'

export class GraphApi {
  static async getFeedPosts(): Promise<GraphApiResponse> {

    const userId = await SecretManagerApi.getSecret('GRAPH_API_USER_ID');
    const accessToken = await SecretManagerApi.getSecret('GRAPH_API_TOKEN');

    try {
      // Usar o endpoint de posts com attachments para casar com nossa interface GraphFeedPost
      const fields = 'attachments{media{image{src},source},description},permalink_url';
      const url = `https://graph.facebook.com/v21.0/${userId}/posts?fields=${fields}&access_token=${accessToken}`;

      const response = await ApiClient.request<GraphApiResponse>(url, { method: 'GET' });

      return response;
    } catch (e) {
      throw new Error("Não foi possível buscar os posts do Instagram: " + e);
    }
  }
}
