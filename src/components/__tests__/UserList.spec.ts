import { flushPromises, mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';
import UserList from '@/components/UserList.vue';
import { createTestingPinia } from '@pinia/testing';
import type { DataTableResponse } from '@/types/DataTable';
import type { User } from '@/types/User';
import UserService from '@/services/UserService';

const mockUserListResponse: DataTableResponse<User> = {
  data: [
    {
      id: 1,
      name: 'Test1',
      email: 'test1@test.com',
      isAdmin: false,
      jobTitle: 'Job title',
      createdAt: '2023-02-06T08:00:00.000000Z',
      updatedAt: '2023-02-06T08:00:00.000000Z',
    },
  ],
  total: 1,
  lastPage: 1,
};

describe('UserList', () => {
  it('should display user list', async () => {
    vi.spyOn(UserService, 'getList').mockResolvedValue(mockUserListResponse);
    const wrapper = mount(UserList, {
      global: {
        plugins: [createTestingPinia()],
      },
    });

    const tbody = wrapper.find('table tbody');

    await flushPromises();
    expect(UserService.getList).toHaveBeenCalledOnce();
    expect(tbody.text()).toContain('test1@test.com');
  });
});
