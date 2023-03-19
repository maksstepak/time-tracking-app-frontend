<script setup lang="ts">
import ClientService from '@/services/ClientService';
import type { Client } from '@/types/Client';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const props = defineProps<{
  client: Client;
}>();
const emit = defineEmits(['close', 'success']);

const isSubmitting = ref(false);

const onSubmit = async () => {
  if (isSubmitting.value) {
    return;
  }
  isSubmitting.value = true;
  await ClientService.delete(props.client.id);
  emit('success');
};

const close = () => {
  emit('close');
};
</script>

<template>
  <BaseModal :title="t('title')" @close="close">
    <template #body>
      <p>{{ t('areYouSure') }}</p>
    </template>
    <template #footer>
      <button
        @click="onSubmit"
        :class="{ 'is-loading': isSubmitting }"
        class="button is-danger"
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
    "title": "Delete client",
    "areYouSure": "Are you sure you want to delete this client?",
    "submit": "Delete",
    "close": "Cancel"
  }
}
</i18n>
