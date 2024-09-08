type ResourceDateInfo = {
  createdAt: string;
  updatedAt: string;
};

type PaginationModel = {
  page: number;
  pageSize: number;
};

type ErrorDetails<ErrorT> = {
  status?: number;
  error?: ErrorT | undefined;
};
