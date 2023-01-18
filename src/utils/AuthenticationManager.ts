import AuthenticationService from '@/services/AuthenticationService';
import type { LoginRequest } from '@/types/Authentication';
import apiClient from '@/utils/apiClient';

export default class AuthenticationManager {
  static async login(data: LoginRequest) {
    const loginResponse = await AuthenticationService.login(data);
    const accessToken = loginResponse.accessToken;
    localStorage.setItem('accessToken', accessToken);
    this.setAuthorizationHeader(accessToken);
  }

  static initialize() {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      this.setAuthorizationHeader(accessToken);
    }
  }

  static async logout() {
    await AuthenticationService.logout();
    localStorage.removeItem('accessToken');
    delete apiClient.defaults.headers.common['Authorization'];
  }

  private static setAuthorizationHeader(accessToken: string) {
    apiClient.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${accessToken}`;
  }
}
