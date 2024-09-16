import customFetchAPI from "./customFetchAPI";
import fetchErrorsHandler from "./fetchErrorsHandler";

export default async function fetchAPI<DataT = unknown, ErrorT = unknown>(
  path: string,
  options: {
    method?: string;
    body?: Record<string, any>;
    search?: Record<string, string>;
  } = {}
) {
  const { body, status, success } = await customFetchAPI<DataT>(path, options);

  if (success) {
    return { body, status };
  } else {
    const error = fetchErrorsHandler<ErrorT>(body, status);
    throw error;
  }
}
