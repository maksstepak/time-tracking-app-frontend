import { describe, it, expect } from 'vitest';
import { flushPromises, mount } from '@vue/test-utils';
import LoginForm from '@/components/LoginForm.vue';
import { useAuthenticationStore } from '@/stores/authentication';
import waitForExpect from 'wait-for-expect';
import { createTestingPinia } from '@pinia/testing';

describe('LoginForm', () => {
  it('should call the login function from the authentication store when all fields are valid', async () => {
    const wrapper = mount(LoginForm, {
      global: {
        plugins: [createTestingPinia()],
      },
    });
    const authenticationStore = useAuthenticationStore();

    await wrapper.find('form input[name="email"]').setValue('test@test.com');
    await wrapper.find('form input[name="password"]').setValue('password');
    await wrapper.find('form').trigger('submit');

    await flushPromises();
    await waitForExpect(() => {
      expect(authenticationStore.login).toHaveBeenCalledWith({
        email: 'test@test.com',
        password: 'password',
      });
    });
  });

  it('should display a validation error when the email field is invalid', async () => {
    const wrapper = mount(LoginForm, {
      global: {
        plugins: [createTestingPinia()],
      },
    });

    const emailInput = wrapper.find('form input[name="email"]');
    await emailInput.setValue('test');
    await wrapper.find('form input[name="password"]').setValue('password');
    await wrapper.find('form').trigger('submit');

    await flushPromises();
    await waitForExpect(() => {
      expect(emailInput.classes()).toContain('is-danger');
    });
  });
});
