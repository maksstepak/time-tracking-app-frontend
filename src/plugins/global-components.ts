import DataTable from '@/components/DataTable.vue';
import DataTablePagination from '@/components/DataTablePagination.vue';
import FormTextField from '@/components/FormTextField.vue';
import type { App } from 'vue';

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    FormTextField: typeof FormTextField;
    DataTable: typeof DataTable;
    DataTablePagination: typeof DataTablePagination;
  }
}

export const registerGlobalComponents = (app: App<Element>): void => {
  app.component('FormTextField', FormTextField);
  app.component('DataTable', DataTable);
  app.component('DataTablePagination', DataTablePagination);
};
