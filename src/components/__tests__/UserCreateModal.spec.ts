import { describe, it, expect, vi } from 'vitest';
import { flushPromises, mount } from '@vue/test-utils';
import waitForExpect from 'wait-for-expect';
import { createTestingPinia } from '@pinia/testing';
import UserCreateModal from '@/components/UserCreateModal.vue';
import UserService from '@/services/UserService';

describe('UserCreateModal', () => {
  it('should call the create method from the UserService and emit success when all fields are valid', async () => {
    UserService.create = vi.fn();
    const wrapper = mount(UserCreateModal, {
      global: {
        plugins: [createTestingPinia()],
      },
    });

    await wrapper.find('form input[name="email"]').setValue('test@test.com');
    await wrapper.find('form input[name="name"]').setValue('Test');
    await wrapper.find('form input[name="password"]').setValue('password');
    await wrapper.find('form input[name="jobTitle"]').setValue('Job title');
    await wrapper.find('form input[name="isAdmin"]').setValue(false);
    await wrapper.find('form').trigger('submit');

    await flushPromises();
    await waitForExpect(() => {
      expect(UserService.create).toHaveBeenCalledWith({
        email: 'test@test.com',
        name: 'Test',
        password: 'password',
        jobTitle: 'Job title',
        isAdmin: false,
      });
      expect(wrapper.emitted('success')).toBeTruthy();
    });
  });

  it('should display a validation error when the email field is invalid', async () => {
    const wrapper = mount(UserCreateModal, {
      global: {
        plugins: [createTestingPinia()],
      },
    });

    const emailInput = wrapper.find('form input[name="email"]');
    await emailInput.setValue('test');
    await wrapper.find('form input[name="name"]').setValue('Test');
    await wrapper.find('form input[name="password"]').setValue('password');
    await wrapper.find('form input[name="jobTitle"]').setValue('Job title');
    await wrapper.find('form input[name="isAdmin"]').setValue(false);
    await wrapper.find('form').trigger('submit');

    await flushPromises();
    await waitForExpect(() => {
      expect(emailInput.classes()).toContain('is-danger');
    });
  });

  it('should display a validation error when the password field is invalid', async () => {
    const wrapper = mount(UserCreateModal, {
      global: {
        plugins: [createTestingPinia()],
      },
    });

    await wrapper.find('form input[name="email"]').setValue('test@test.com');
    await wrapper.find('form input[name="name"]').setValue('Test');
    const passwordInput = wrapper.find('form input[name="password"]');
    await passwordInput.setValue('pass123');
    await wrapper.find('form input[name="jobTitle"]').setValue('Job title');
    await wrapper.find('form input[name="isAdmin"]').setValue(false);
    await wrapper.find('form').trigger('submit');

    await flushPromises();
    await waitForExpect(() => {
      expect(passwordInput.classes()).toContain('is-danger');
    });
  });
});
