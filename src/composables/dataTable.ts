import type { DataTableRequest, DataTableResponse } from '@/types/DataTable';
import { ref, type Ref } from 'vue';

type dataTableFn<T> = (
  params: DataTableRequest
) => Promise<DataTableResponse<T>>;

export const useDataTable = <T>(dataTableFn: dataTableFn<T>) => {
  const loading = ref(false);
  const currentPage = ref(1);
  const perPage = ref(15);
  const totalItems = ref(0);
  const lastPage = ref(1);
  const items: Ref<T[]> = ref([]);

  const fetch = async () => {
    loading.value = true;
    const data = await dataTableFn({
      page: currentPage.value,
      perPage: perPage.value,
    });
    items.value = data.data;
    totalItems.value = data.total;
    lastPage.value = data.lastPage;
    loading.value = false;
  };

  const setPage = async (page: number) => {
    if (page === 0 || page > lastPage.value) return;
    currentPage.value = page;
    await fetch();
  };

  return {
    loading,
    currentPage,
    perPage,
    totalItems,
    lastPage,
    items,
    fetch,
    setPage,
  };
};
