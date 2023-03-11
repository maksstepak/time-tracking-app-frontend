import { describe, it, expect, vi } from 'vitest';
import { flushPromises, mount } from '@vue/test-utils';
import waitForExpect from 'wait-for-expect';
import { createTestingPinia } from '@pinia/testing';
import UserEditModal from '@/components/UserEditModal.vue';
import UserService from '@/services/UserService';

describe('UserEditModal', () => {
  it('should call the update method from the UserService and emit success when all fields are valid', async () => {
    UserService.update = vi.fn();
    const wrapper = mount(UserEditModal, {
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
          createdAt: '2023-03-05T10:00:00.000000Z',
          updatedAt: '2023-03-05T10:00:00.000000Z',
        },
      },
    });

    await wrapper.find('form input[name="name"]').setValue('Edited');
    await wrapper.find('form').trigger('submit');

    await flushPromises();
    await waitForExpect(() => {
      expect(UserService.update).toHaveBeenCalledWith(1, {
        name: 'Edited',
        jobTitle: null,
        password: null,
        isAdmin: false,
      });
      expect(wrapper.emitted('success')).toBeTruthy();
    });
  });

  it('should display a validation error when the name field is invalid', async () => {
    const wrapper = mount(UserEditModal, {
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
          createdAt: '2023-03-05T10:00:00.000000Z',
          updatedAt: '2023-03-05T10:00:00.000000Z',
        },
      },
    });

    const nameInput = wrapper.find('form input[name="name"]');
    await nameInput.setValue('');
    await wrapper.find('form').trigger('submit');

    await flushPromises();
    await waitForExpect(() => {
      expect(nameInput.classes()).toContain('is-danger');
    });
  });

  it('should display a validation error when the password field is invalid', async () => {
    const wrapper = mount(UserEditModal, {
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
          createdAt: '2023-03-05T10:00:00.000000Z',
          updatedAt: '2023-03-05T10:00:00.000000Z',
        },
      },
    });

    const passwordInput = wrapper.find('form input[name="password"]');
    await passwordInput.setValue('pass123');
    await wrapper.find('form').trigger('submit');

    await flushPromises();
    await waitForExpect(() => {
      expect(passwordInput.classes()).toContain('is-danger');
    });
  });
});
