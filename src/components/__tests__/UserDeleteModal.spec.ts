import { describe, it, expect, vi } from 'vitest';
import { flushPromises, mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import UserDeleteModal from '@/components/UserDeleteModal.vue';
import UserService from '@/services/UserService';

describe('UserDeleteModal', () => {
  it('should call the delete method from the UserService and emit success after clicking the delete button', async () => {
    UserService.delete = vi.fn();
    const wrapper = mount(UserDeleteModal, {
      global: {
        plugins: [createTestingPinia()],
      },
      props: {
        user: {
          id: 1,
          name: 'Test',
          email: 'test@test.com',
          isAdmin: false,
          jobTitle: null,
          createdAt: '2023-03-05T21:55:43.000000Z',
          updatedAt: '2023-03-05T21:55:43.000000Z',
        },
      },
    });

    await wrapper.find('button.is-danger').trigger('click');

    await flushPromises();
    expect(UserService.delete).toHaveBeenCalledWith(1);
    expect(wrapper.emitted('success')).toBeTruthy();
  });
});
