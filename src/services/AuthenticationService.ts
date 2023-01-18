import type { LoginRequest, LoginResponse } from '@/types/Authentication';
import type { User } from '@/types/User';
import apiClient from '@/utils/apiClient';

export default class AuthenticationService {
  static async login(payload: LoginRequest): Promise<LoginResponse> {
    const { data } = await apiClient.post<LoginResponse>('/login', payload);
    return data;
  }

  static async getCurrentUser(): Promise<User> {
    const { data } = await apiClient.get<User>('/me');
    return data;
  }

  static async logout(): Promise<void> {
    await apiClient.post('/logout');
  }
}
