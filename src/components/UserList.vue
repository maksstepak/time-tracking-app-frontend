<script setup lang="ts">
import UserService from '@/services/UserService';
import type { User } from '@/types/User';
import { onMounted, ref } from 'vue';
import { useDataTable } from '@/composables/dataTable';
import type { DataTableHeader } from '@/types/DataTable';
import { useI18n } from 'vue-i18n';
import dayjs from 'dayjs';
import UserCreateModal from '@/components/UserCreateModal.vue';
import UserEditModal from '@/components/UserEditModal.vue';
import UserDeleteModal from '@/components/UserDeleteModal.vue';
import { useNotificationStore } from '@/stores/notification';
import { NotificationType } from '@/types/Notification';

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
} = useDataTable<User>(UserService.getList);

const headers: DataTableHeader[] = [
  { key: 'email', label: t('email') },
  { key: 'name', label: t('name') },
  { key: 'jobTitle', label: t('jobTitle') },
  { key: 'role', label: t('role') },
  { key: 'createdAt', label: t('dateCreated') },
  { key: 'actions', label: t('actions') },
];

const isCreateModalShown = ref(false);
const isEditModalShown = ref(false);
const isDeleteModalShown = ref(false);
const editedUser = ref<User | null>(null);
const deletedUser = ref<User | null>(null);

const openCreateModal = () => {
  isCreateModalShown.value = true;
};

const closeCreateModal = () => {
  isCreateModalShown.value = false;
};

const onSuccessCreate = async () => {
  closeCreateModal();
  notificationStore.display(
    t('notifications.userCreated'),
    NotificationType.Success
  );
  await fetch();
};

const openEditModal = async (user: User) => {
  editedUser.value = user;
  isEditModalShown.value = true;
};

const closeEditModal = () => {
  isEditModalShown.value = false;
  editedUser.value = null;
};

const onSuccessEdit = async () => {
  closeEditModal();
  notificationStore.display(
    t('notifications.userUpdated'),
    NotificationType.Success
  );
  await fetch();
};

const openDeleteModal = (user: User) => {
  deletedUser.value = user;
  isDeleteModalShown.value = true;
};

const closeDeleteModal = () => {
  isDeleteModalShown.value = false;
  deletedUser.value = null;
};

const onSuccessDelete = async () => {
  closeDeleteModal();
  notificationStore.display(
    t('notifications.userDeleted'),
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
      <span>{{ t('addNewUser') }}</span>
    </button>
  </div>
  <DataTable class="mt-5" :headers="headers" :items="items" :loading="loading">
    <template v-slot:item-role="{ item }">
      <div>
        <span v-if="item.isAdmin" class="tag is-primary">{{
          t('roles.admin')
        }}</span>
        <span v-else class="tag is-info">{{ t('roles.user') }}</span>
      </div>
    </template>
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
  <UserCreateModal
    v-if="isCreateModalShown"
    @close="closeCreateModal"
    @success="onSuccessCreate"
  />
  <UserEditModal
    v-if="isEditModalShown"
    :user="editedUser!"
    @close="closeEditModal"
    @success="onSuccessEdit"
  />
  <UserDeleteModal
    v-if="isDeleteModalShown"
    :user="deletedUser!"
    @close="closeDeleteModal"
    @success="onSuccessDelete"
  />
</template>

<i18n lang="json">
{
  "en": {
    "email": "Email",
    "name": "Name",
    "jobTitle": "Job title",
    "role": "Role",
    "dateCreated": "Date created",
    "actions": "Actions",
    "addNewUser": "Add new user",
    "roles": {
      "user": "User",
      "admin": "Admin"
    },
    "notifications": {
      "userCreated": "User has been successfully created.",
      "userUpdated": "User has been successfully updated.",
      "userDeleted": "User has been successfully deleted."
    }
  }
}
</i18n>
