<script setup lang="ts">
import ProjectService from '@/services/ProjectService';
import type { Project, UpdateProjectRequest } from '@/types/Project';
import axios from 'axios';
import { useForm } from 'vee-validate';
import { useI18n } from 'vue-i18n';
import * as yup from 'yup';

const { t } = useI18n();
const props = defineProps<{
  project: Project;
}>();
const emit = defineEmits(['close', 'success']);

const schema = yup.object({
  name: yup.string().required().max(64).label(t('name')),
  description: yup.string().nullable().max(10000).label(t('description')),
});

const { handleSubmit, isSubmitting } = useForm<UpdateProjectRequest>({
  validationSchema: schema,
  initialValues: {
    name: props.project.name,
    description: props.project.description,
  },
});

const onSubmit = handleSubmit(async (values, actions) => {
  try {
    await ProjectService.update(props.project.id, values);
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
    "title": "Edit project",
    "name": "Name",
    "description": "Description",
    "submit": "Save",
    "close": "Cancel"
  }
}
</i18n>
