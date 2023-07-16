import type {
  Client,
  CreateClientRequest,
  UpdateClientRequest,
} from '@/types/Client';
import type { DataTableRequest, DataTableResponse } from '@/types/DataTable';
import type { SelectOption } from '@/types/SelectOption';
import apiClient from '@/utils/apiClient';

export default class ClientService {
  static async getList(
    params: DataTableRequest
  ): Promise<DataTableResponse<Client>> {
    const { data } = await apiClient.get<DataTableResponse<Client>>(
      '/clients',
      {
        params,
      }
    );
    return data;
  }

  static async getById(id: number): Promise<Client> {
    const { data } = await apiClient.get<Client>(`/clients/${id}`);
    return data;
  }

  static async create(payload: CreateClientRequest): Promise<void> {
    await apiClient.post('/clients', payload);
  }

  static async update(id: number, payload: UpdateClientRequest): Promise<void> {
    await apiClient.put(`/clients/${id}`, payload);
  }

  static async delete(id: number): Promise<void> {
    await apiClient.delete(`/clients/${id}`);
  }

  static async getSelectOptions(): Promise<SelectOption[]> {
    const { data } = await apiClient.get<SelectOption[]>(
      '/clients/select-options'
    );
    return data;
  }
}
