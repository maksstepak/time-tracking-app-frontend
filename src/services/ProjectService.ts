import type {
  Project,
  CreateProjectRequest,
  UpdateProjectRequest,
} from '@/types/Project';
import type { DataTableRequest, DataTableResponse } from '@/types/DataTable';
import apiClient from '@/utils/apiClient';

export default class ProjectService {
  static async getList(
    params: DataTableRequest
  ): Promise<DataTableResponse<Project>> {
    const { data } = await apiClient.get<DataTableResponse<Project>>(
      '/projects',
      {
        params,
      }
    );
    return data;
  }

  static async getById(id: number): Promise<Project> {
    const { data } = await apiClient.get<Project>(`/projects/${id}`);
    return data;
  }

  static async create(
    clientId: number,
    payload: CreateProjectRequest
  ): Promise<void> {
    await apiClient.post(`/clients/${clientId}/projects`, payload);
  }

  static async update(
    id: number,
    payload: UpdateProjectRequest
  ): Promise<void> {
    await apiClient.put(`/projects/${id}`, payload);
  }

  static async delete(id: number): Promise<void> {
    await apiClient.delete(`/projects/${id}`);
  }
}
