<script setup lang="ts">
import ClientService from '@/services/ClientService';
import ProjectService from '@/services/ProjectService';
import type { SelectOption } from '@/types/SelectOption';
import axios from 'axios';
import { useForm } from 'vee-validate';
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import * as yup from 'yup';

const { t } = useI18n();
const emit = defineEmits(['close', 'success']);

const schema = yup.object({
  clientId: yup.number().required().label(t('client')),
  name: yup.string().required().max(64).label(t('name')),
  description: yup.string().nullable().max(10000).label(t('description')),
});

interface CreateProjectForm {
  clientId: number | null;
  name: string;
  description: string | null;
}

const { handleSubmit, isSubmitting } = useForm<CreateProjectForm>({
  validationSchema: schema,
  initialValues: {
    clientId: null,
    name: '',
    description: null,
  },
});

const isClientOptionsLoading = ref(true);
const clientOptions = ref<SelectOption[]>([]);

const onSubmit = handleSubmit(async (values, actions) => {
  try {
    await ProjectService.create(values.clientId!, {
      name: values.name,
      description: values.description,
    });
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

onMounted(async () => {
  clientOptions.value = await ClientService.getSelectOptions();
  isClientOptionsLoading.value = false;
});
</script>

<template>
  <BaseModal :title="t('title')" @close="close">
    <template #body>
      <form @submit="onSubmit">
        <FormSelect
          name="clientId"
          :label="t('client')"
          :is-loading="isClientOptionsLoading"
          :options="clientOptions"
        />
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
    "title": "Create new project",
    "client": "Client",
    "name": "Name",
    "description": "Description",
    "submit": "Save",
    "close": "Cancel"
  }
}
</i18n>
