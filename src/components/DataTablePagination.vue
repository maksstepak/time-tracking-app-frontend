<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const props = defineProps<{
  currentPage: number;
  lastPage: number;
  perPage: number;
  totalItems: number;
}>();

const emit = defineEmits<{
  (e: 'setPage', page: number): Promise<void>;
}>();

const { t } = useI18n();

const firstItem = computed(() => {
  return props.currentPage * props.perPage - props.perPage + 1;
});

const lastItem = computed(() => {
  return Math.min(props.currentPage * props.perPage, props.totalItems);
});

const setPage = (page: number) => {
  emit('setPage', page);
};
</script>

<template>
  <nav class="pagination is-rounded" role="navigation" aria-label="pagination">
    <a
      @click="setPage(props.currentPage - 1)"
      :class="{ 'is-disabled': props.currentPage === 1 }"
      class="pagination-previous"
    >
      <span class="icon"> <i class="fa-solid fa-chevron-left"></i></span
      ><span>{{ t('previous') }}</span></a
    >
    <a
      @click="setPage(props.currentPage + 1)"
      :class="{
        'is-disabled': props.currentPage === props.lastPage,
      }"
      class="pagination-next"
      ><span>{{ t('next') }}</span
      ><span class="icon"> <i class="fa-solid fa-chevron-right"></i></span
    ></a>
  </nav>
  <div>
    <span>{{ firstItem }}-{{ lastItem }} / {{ props.totalItems }}</span>
  </div>
</template>

<i18n lang="json">
{
  "en": {
    "previous": "Previous",
    "next": "Next page"
  }
}
</i18n>
