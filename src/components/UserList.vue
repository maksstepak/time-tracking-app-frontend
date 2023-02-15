<script setup lang="ts">
import UserService from '@/services/UserService';
import type { User } from '@/types/User';
import { onMounted } from 'vue';
import { useDataTable } from '@/composables/dataTable';
import type { DataTableHeader } from '@/types/DataTable';
import { useI18n } from 'vue-i18n';
import dayjs from 'dayjs';

const { t } = useI18n();

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

const openAddUserModal = () => {
  // TODO
};

const openEditModal = (id: number) => {
  console.log(id);
  // TODO
};

const openDeleteModal = (id: number) => {
  console.log(id);
  // TODO
};

onMounted(async () => {
  await fetch();
});
</script>

<template>
  <div class="is-flex is-justify-content-flex-end">
    <button @click="openAddUserModal" class="button is-success">
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
        <button @click="openEditModal(item.id)" class="button is-success">
          <span class="icon is-small">
            <i class="fas fa-pen"></i>
          </span>
        </button>
        <button @click="openDeleteModal(item.id)" class="button is-danger">
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
    }
  }
}
</i18n>
