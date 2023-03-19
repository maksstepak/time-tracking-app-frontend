import { describe, it, expect, vi } from 'vitest';
import { flushPromises, mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import ClientDeleteModal from '@/components/ClientDeleteModal.vue';
import ClientService from '@/services/ClientService';

describe('ClientDeleteModal', () => {
  it('should call the delete method from the ClientService and emit success after clicking the delete button', async () => {
    ClientService.delete = vi.fn();
    const wrapper = mount(ClientDeleteModal, {
      global: {
        plugins: [createTestingPinia()],
      },
      props: {
        client: {
          id: 1,
          name: 'Test',
          description: 'test test test',
          contactEmail: 'test1@test.com',
          contactPhone: '123 456 789',
          createdAt: '2023-03-19T10:00:00.000000Z',
          updatedAt: '2023-03-19T10:00:00.000000Z',
        },
      },
    });

    await wrapper.find('button.is-danger').trigger('click');

    await flushPromises();
    expect(ClientService.delete).toHaveBeenCalledWith(1);
    expect(wrapper.emitted('success')).toBeTruthy();
  });
});
