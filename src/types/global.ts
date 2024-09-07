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

class FetchError<ErrorT = unknown> extends Error {
  status: number | undefined;
  error: ErrorT | undefined;
  constructor(message: string, details?: ErrorDetails<ErrorT> & ErrorOptions) {
    super(message, { cause: details?.cause });
    this.status = details?.status;
    this.error = details?.error;
    if (details?.status) {
      this.name =
        details.status < 500 ? "Bad Request" : "Internal Server Error";
    }
  }
}
