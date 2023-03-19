<script setup lang="ts">
import { useDataTable } from '@/composables/dataTable';
import ClientService from '@/services/ClientService';
import { useNotificationStore } from '@/stores/notification';
import type { Client } from '@/types/Client';
import type { DataTableHeader } from '@/types/DataTable';
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import dayjs from 'dayjs';
import { NotificationType } from '@/types/Notification';
import ClientCreateModal from '@/components/ClientCreateModal.vue';
import ClientEditModal from '@/components/ClientEditModal.vue';
import ClientDeleteModal from '@/components/ClientDeleteModal.vue';

const { t } = useI18n();
const notificationStore = useNotificationStore();

const {
  items,
  loading,
  currentPage,
  perPage,
  totalItems,
  lastPage,
  fetch,
  setPage,
} = useDataTable<Client>(ClientService.getList);

const headers: DataTableHeader[] = [
  { key: 'name', label: t('name') },
  { key: 'createdAt', label: t('dateCreated') },
  { key: 'actions', label: t('actions') },
];

const isCreateModalShown = ref(false);
const isEditModalShown = ref(false);
const isDeleteModalShown = ref(false);
const editedClient = ref<Client | null>(null);
const deletedClient = ref<Client | null>(null);

const openCreateModal = () => {
  isCreateModalShown.value = true;
};

const closeCreateModal = () => {
  isCreateModalShown.value = false;
};

const onSuccessCreate = async () => {
  closeCreateModal();
  notificationStore.display(
    t('notifications.clientCreated'),
    NotificationType.Success
  );
  await fetch();
};

const openEditModal = async (client: Client) => {
  editedClient.value = client;
  isEditModalShown.value = true;
};

const closeEditModal = () => {
  isEditModalShown.value = false;
  editedClient.value = null;
};

const onSuccessEdit = async () => {
  closeEditModal();
  notificationStore.display(
    t('notifications.clientUpdated'),
    NotificationType.Success
  );
  await fetch();
};

const openDeleteModal = (client: Client) => {
  deletedClient.value = client;
  isDeleteModalShown.value = true;
};

const closeDeleteModal = () => {
  isDeleteModalShown.value = false;
  deletedClient.value = null;
};

const onSuccessDelete = async () => {
  closeDeleteModal();
  notificationStore.display(
    t('notifications.clientDeleted'),
    NotificationType.Success
  );
  await fetch();
};

onMounted(async () => {
  await fetch();
});
</script>

<template>
  <div class="is-flex is-justify-content-flex-end">
    <button @click="openCreateModal" class="button is-success">
      <span class="icon is-small">
        <i class="fas fa-user-plus"></i>
      </span>
      <span>{{ t('addNewClient') }}</span>
    </button>
  </div>
  <DataTable class="mt-5" :headers="headers" :items="items" :loading="loading">
    <template v-slot:item-createdAt="{ item }">
      {{ dayjs(item.createdAt).format('YYYY-MM-DD HH:mm') }}
    </template>
    <template v-slot:item-actions="{ item }">
      <div class="buttons">
        <button @click="openEditModal(item)" class="button is-success">
          <span class="icon is-small">
            <i class="fas fa-pen"></i>
          </span>
        </button>
        <button @click="openDeleteModal(item)" class="button is-danger">
          <span class="icon is-small">
            <i class="fas fa-trash-can"></i>
          </span>
        </button></div
    ></template>
  </DataTable>
  <DataTablePagination
    :current-page="currentPage"
    :per-page="perPage"
    :total-items="totalItems"
    :last-page="lastPage"
    @set-page="setPage"
  />
  <ClientCreateModal
    v-if="isCreateModalShown"
    @close="closeCreateModal"
    @success="onSuccessCreate"
  />
  <ClientEditModal
    v-if="isEditModalShown"
    :client="editedClient!"
    @close="closeEditModal"
    @success="onSuccessEdit"
  />
  <ClientDeleteModal
    v-if="isDeleteModalShown"
    :client="deletedClient!"
    @close="closeDeleteModal"
    @success="onSuccessDelete"
  />
</template>

<i18n lang="json">
{
  "en": {
    "name": "Name",
    "dateCreated": "Date created",
    "actions": "Actions",
    "addNewClient": "Add new client",
    "notifications": {
      "clientCreated": "Client has been successfully created.",
      "clientUpdated": "Client has been successfully updated.",
      "clientDeleted": "Client has been successfully deleted."
    }
  }
}
</i18n>
