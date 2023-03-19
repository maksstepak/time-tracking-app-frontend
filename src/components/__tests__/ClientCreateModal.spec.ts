import { describe, it, expect, vi } from 'vitest';
import { flushPromises, mount } from '@vue/test-utils';
import waitForExpect from 'wait-for-expect';
import { createTestingPinia } from '@pinia/testing';
import ClientCreateModal from '@/components/ClientCreateModal.vue';
import ClientService from '@/services/ClientService';

describe('ClientCreateModal', () => {
  it('should call the create method from the ClientService and emit success when all fields are valid', async () => {
    ClientService.create = vi.fn();
    const wrapper = mount(ClientCreateModal, {
      global: {
        plugins: [createTestingPinia()],
      },
    });

    await wrapper.find('form input[name="name"]').setValue('Test');
    await wrapper
      .find('form textarea[name="description"]')
      .setValue('test test test');
    await wrapper
      .find('form input[name="contactEmail"]')
      .setValue('test1@test.com');
    await wrapper
      .find('form input[name="contactPhone"]')
      .setValue('123 456 789');
    await wrapper.find('form').trigger('submit');

    await flushPromises();
    await waitForExpect(() => {
      expect(ClientService.create).toHaveBeenCalledWith({
        name: 'Test',
        description: 'test test test',
        contactEmail: 'test1@test.com',
        contactPhone: '123 456 789',
      });
      expect(wrapper.emitted('success')).toBeTruthy();
    });
  });

  it('should display a validation error when the email field is invalid', async () => {
    const wrapper = mount(ClientCreateModal, {
      global: {
        plugins: [createTestingPinia()],
      },
    });

    const nameInput = wrapper.find('form input[name="name"]');
    await nameInput.setValue('');
    await wrapper
      .find('form textarea[name="description"]')
      .setValue('test test test');
    await wrapper
      .find('form input[name="contactEmail"]')
      .setValue('test1@test.com');
    await wrapper
      .find('form input[name="contactPhone"]')
      .setValue('123 456 789');
    await wrapper.find('form').trigger('submit');

    await flushPromises();
    await waitForExpect(() => {
      expect(nameInput.classes()).toContain('is-danger');
    });
  });
});
