<script setup lang="ts">
import type { DataTableHeader } from '@/types/DataTable';
import { useSlots } from 'vue';
import { useI18n } from 'vue-i18n';

const props = defineProps<{
  loading: boolean;
  headers: DataTableHeader[];
  items: any[];
}>();

const { t } = useI18n();

const slots = useSlots();
</script>

<template>
  <div class="table-container">
    <table class="table is-fullwidth is-striped">
      <thead>
        <tr>
          <th v-for="header in props.headers" :key="header.key">
            {{ header.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <template v-if="props.loading">
          <tr>
            <td colspan="100%" class="has-text-centered">{{ t('loading') }}</td>
          </tr>
        </template>
        <template v-else>
          <tr v-for="item in props.items" :key="item.id">
            <td v-for="header in headers" :key="header.key">
              <template v-if="slots[`item-${header.key}`]">
                <slot :item="item" :name="`item-${header.key}`"></slot>
              </template>
              <template v-else>{{ item[header.key] }}</template>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<i18n lang="json">
{
  "en": {
    "loading": "Loading..."
  }
}
</i18n>
