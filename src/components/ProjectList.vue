<script setup lang="ts">
import { useDataTable } from '@/composables/dataTable';
import ProjectService from '@/services/ProjectService';
import { useNotificationStore } from '@/stores/notification';
import type { Project } from '@/types/Project';
import type { DataTableHeader } from '@/types/DataTable';
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import dayjs from 'dayjs';
import { NotificationType } from '@/types/Notification';
import ProjectCreateModal from '@/components/ProjectCreateModal.vue';
import ProjectEditModal from '@/components/ProjectEditModal.vue';
import ProjectDeleteModal from '@/components/ProjectDeleteModal.vue';

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
} = useDataTable<Project>(ProjectService.getList);

const headers: DataTableHeader[] = [
  { key: 'name', label: t('name') },
  { key: 'createdAt', label: t('dateCreated') },
  { key: 'actions', label: t('actions') },
];

const isCreateModalShown = ref(false);
const isEditModalShown = ref(false);
const isDeleteModalShown = ref(false);
const editedProject = ref<Project | null>(null);
const deletedProject = ref<Project | null>(null);

const openCreateModal = () => {
  isCreateModalShown.value = true;
};

const closeCreateModal = () => {
  isCreateModalShown.value = false;
};

const onSuccessCreate = async () => {
  closeCreateModal();
  notificationStore.display(
    t('notifications.projectCreated'),
    NotificationType.Success
  );
  await fetch();
};

const openEditModal = async (project: Project) => {
  editedProject.value = project;
  isEditModalShown.value = true;
};

const closeEditModal = () => {
  isEditModalShown.value = false;
  editedProject.value = null;
};

const onSuccessEdit = async () => {
  closeEditModal();
  notificationStore.display(
    t('notifications.projectUpdated'),
    NotificationType.Success
  );
  await fetch();
};

const openDeleteModal = (project: Project) => {
  deletedProject.value = project;
  isDeleteModalShown.value = true;
};

const closeDeleteModal = () => {
  isDeleteModalShown.value = false;
  deletedProject.value = null;
};

const onSuccessDelete = async () => {
  closeDeleteModal();
  notificationStore.display(
    t('notifications.projectDeleted'),
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
      <span>{{ t('addNewProject') }}</span>
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
  <ProjectCreateModal
    v-if="isCreateModalShown"
    @close="closeCreateModal"
    @success="onSuccessCreate"
  />
  <ProjectEditModal
    v-if="isEditModalShown"
    :project="editedProject!"
    @close="closeEditModal"
    @success="onSuccessEdit"
  />
  <ProjectDeleteModal
    v-if="isDeleteModalShown"
    :project="deletedProject!"
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
    "addNewProject": "Add new project",
    "notifications": {
      "projectCreated": "Project has been successfully created.",
      "projectUpdated": "Project has been successfully updated.",
      "projectDeleted": "Project has been successfully deleted."
    }
  }
}
</i18n>
