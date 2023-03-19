import { describe, it, expect, vi } from 'vitest';
import { flushPromises, mount } from '@vue/test-utils';
import waitForExpect from 'wait-for-expect';
import { createTestingPinia } from '@pinia/testing';
import ClientEditModal from '@/components/ClientEditModal.vue';
import ClientService from '@/services/ClientService';

describe('ClientEditModal', () => {
  it('should call the update method from the ClientService and emit success when all fields are valid', async () => {
    ClientService.update = vi.fn();
    const wrapper = mount(ClientEditModal, {
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

    await wrapper.find('form input[name="name"]').setValue('Edited');
    await wrapper.find('form').trigger('submit');

    await flushPromises();
    await waitForExpect(() => {
      expect(ClientService.update).toHaveBeenCalledWith(1, {
        name: 'Edited',
        description: 'test test test',
        contactEmail: 'test1@test.com',
        contactPhone: '123 456 789',
      });
      expect(wrapper.emitted('success')).toBeTruthy();
    });
  });

  it('should display a validation error when the name field is invalid', async () => {
    const wrapper = mount(ClientEditModal, {
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

    const nameInput = wrapper.find('form input[name="name"]');
    await nameInput.setValue('');
    await wrapper.find('form').trigger('submit');

    await flushPromises();
    await waitForExpect(() => {
      expect(nameInput.classes()).toContain('is-danger');
    });
  });
});
