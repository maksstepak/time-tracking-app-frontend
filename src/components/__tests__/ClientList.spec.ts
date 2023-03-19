import { flushPromises, mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';
import ClientList from '@/components/ClientList.vue';
import { createTestingPinia } from '@pinia/testing';
import type { DataTableResponse } from '@/types/DataTable';
import type { Client } from '@/types/Client';
import ClientService from '@/services/ClientService';

const mockClientListResponse: DataTableResponse<Client> = {
  data: [
    {
      id: 1,
      name: 'Test1',
      description: 'test test test',
      contactEmail: 'test1@test.com',
      contactPhone: '123 456 789',
      createdAt: '2023-03-19T08:00:00.000000Z',
      updatedAt: '2023-03-19T08:00:00.000000Z',
    },
  ],
  total: 1,
  lastPage: 1,
};

describe('ClientList', () => {
  it('should display client list', async () => {
    vi.spyOn(ClientService, 'getList').mockResolvedValue(
      mockClientListResponse
    );
    const wrapper = mount(ClientList, {
      global: {
        plugins: [createTestingPinia()],
      },
    });

    const tbody = wrapper.find('table tbody');

    await flushPromises();
    expect(ClientService.getList).toHaveBeenCalledOnce();
    expect(tbody.text()).toContain('Test1');
  });
});
