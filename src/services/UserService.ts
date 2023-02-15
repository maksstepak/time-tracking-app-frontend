import type { DataTableRequest, DataTableResponse } from '@/types/DataTable';
import type { CreateUserRequest, UpdateUserRequest, User } from '@/types/User';
import apiClient from '@/utils/apiClient';

export default class UserService {
  static async getList(
    params: DataTableRequest
  ): Promise<DataTableResponse<User>> {
    const { data } = await apiClient.get<DataTableResponse<User>>('/users', {
      params,
    });
    return data;
  }

  static async getById(id: number): Promise<User> {
    const { data } = await apiClient.get<User>(`/users/${id}`);
    return data;
  }

  static async create(payload: CreateUserRequest): Promise<void> {
    await apiClient.post('/users', payload);
  }

  static async update(id: number, payload: UpdateUserRequest): Promise<void> {
    await apiClient.put(`/users/${id}`, payload);
  }

  static async delete(id: number): Promise<void> {
    await apiClient.delete(`/users/${id}`);
  }
}
