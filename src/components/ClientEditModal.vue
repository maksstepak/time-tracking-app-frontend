<script setup lang="ts">
import ClientService from '@/services/ClientService';
import type { Client, UpdateClientRequest } from '@/types/Client';
import axios from 'axios';
import { useForm } from 'vee-validate';
import { useI18n } from 'vue-i18n';
import * as yup from 'yup';

const { t } = useI18n();
const props = defineProps<{
  client: Client;
}>();
const emit = defineEmits(['close', 'success']);

const schema = yup.object({
  name: yup.string().required().max(64).label(t('name')),
  description: yup.string().nullable().max(10000).label(t('description')),
  contactEmail: yup.string().nullable().max(255).label(t('contactEmail')),
  contactPhone: yup.string().nullable().max(255).label(t('contactPhone')),
});

const { handleSubmit, isSubmitting } = useForm<UpdateClientRequest>({
  validationSchema: schema,
  initialValues: {
    name: props.client.name,
    description: props.client.description,
    contactEmail: props.client.contactEmail,
    contactPhone: props.client.contactPhone,
  },
});

const onSubmit = handleSubmit(async (values, actions) => {
  try {
    await ClientService.update(props.client.id, values);
    emit('success');
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data.errors) {
      actions.setErrors(error.response.data.errors);
    }
  }
});

const close = () => {
  emit('close');
};
</script>

<template>
  <BaseModal :title="t('title')" @close="close">
    <template #body>
      <form @submit="onSubmit">
        <FormTextField name="name" type="text" :label="t('name')" />
        <FormTextarea name="description" :label="t('description')" />
        <FormTextField
          name="contactEmail"
          type="text"
          :label="t('contactEmail')"
        />
        <FormTextField
          name="contactPhone"
          type="text"
          :label="t('contactPhone')"
        />
      </form>
    </template>
    <template #footer>
      <button
        @click="onSubmit"
        :class="{ 'is-loading': isSubmitting }"
        class="button is-success"
      >
        {{ t('submit') }}
      </button>
      <button @click="close" class="button">{{ t('close') }}</button>
    </template>
  </BaseModal>
</template>

<i18n lang="json">
{
  "en": {
    "title": "Edit client",
    "name": "Name",
    "description": "Description",
    "contactEmail": "Contact email",
    "contactPhone": "Contact phone",
    "submit": "Save",
    "close": "Cancel"
  }
}
</i18n>
