export interface DataTableRequest {
  page: number;
  perPage: number;
}

export interface DataTableResponse<T> {
  total: number;
  lastPage: number;
  data: T[];
}

export interface DataTableHeader {
  key: string;
  label: string;
}
