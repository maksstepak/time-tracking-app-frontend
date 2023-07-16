import DataTable from '@/components/DataTable.vue';
import DataTablePagination from '@/components/DataTablePagination.vue';
import FormTextField from '@/components/FormTextField.vue';
import FormCheckbox from '@/components/FormCheckbox.vue';
import FormTextarea from '@/components/FormTextarea.vue';
import FormSelect from '@/components/FormSelect.vue';
import BaseModal from '@/components/BaseModal.vue';
import type { App } from 'vue';

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    BaseModal: typeof BaseModal;
    FormTextField: typeof FormTextField;
    FormCheckbox: typeof FormCheckbox;
    FormTextarea: typeof FormTextarea;
    FormSelect: typeof FormSelect;
    DataTable: typeof DataTable;
    DataTablePagination: typeof DataTablePagination;
  }
}

export const registerGlobalComponents = (app: App<Element>): void => {
  app.component('BaseModal', BaseModal);
  app.component('FormTextField', FormTextField);
  app.component('FormCheckbox', FormCheckbox);
  app.component('FormTextarea', FormTextarea);
  app.component('FormSelect', FormSelect);
  app.component('DataTable', DataTable);
  app.component('DataTablePagination', DataTablePagination);
};
