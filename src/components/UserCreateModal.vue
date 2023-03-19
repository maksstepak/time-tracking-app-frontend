<script setup lang="ts">
import UserService from '@/services/UserService';
import type { CreateUserRequest } from '@/types/User';
import axios from 'axios';
import { useForm } from 'vee-validate';
import { useI18n } from 'vue-i18n';
import * as yup from 'yup';

const { t } = useI18n();
const emit = defineEmits(['close', 'success']);

const schema = yup.object({
  email: yup.string().required().email().label(t('email')),
  name: yup.string().required().max(64).label(t('name')),
  password: yup.string().required().min(8).label(t('password')),
  jobTitle: yup.string().nullable().max(64).label(t('jobTitle')),
  isAdmin: yup.boolean().required().label(t('isAdmin')),
});

const { handleSubmit, isSubmitting } = useForm<CreateUserRequest>({
  validationSchema: schema,
  initialValues: {
    email: '',
    name: '',
    password: '',
    jobTitle: null,
    isAdmin: false,
  },
});

const onSubmit = handleSubmit(async (values, actions) => {
  try {
    await UserService.create(values);
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
        <FormTextField name="email" type="email" :label="t('email')" />
        <FormTextField name="name" type="text" :label="t('name')" />
        <FormTextField name="password" type="password" :label="t('password')" />
        <FormTextField name="jobTitle" type="text" :label="t('jobTitle')" />
        <FormCheckbox name="isAdmin" :label="t('isAdmin')" />
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
    "title": "Create new user",
    "email": "Email",
    "name": "Name",
    "password": "Password",
    "jobTitle": "Job title",
    "isAdmin": "Is admin",
    "submit": "Save",
    "close": "Cancel"
  }
}
</i18n>
