export default class FetchError<ErrorT = unknown> extends Error {
  status: number | undefined;
  error: ErrorT | undefined;
  constructor(message: string, details?: ErrorDetails<ErrorT> & ErrorOptions) {
    super(message, { cause: details?.cause });
    this.status = details?.status;
    this.error = details?.error;
  }
}

export type WithErrorAndRefetch<RestProps = unknown, ErrorT = unknown> = {
  refetch: () => void;
  error: FetchError<ErrorT> | null;
} & RestProps;
