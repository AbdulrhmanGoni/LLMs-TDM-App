import FetchError from "./FetchError";

export default function fetchErrorsHandler<ErrorT>(
  responseBody: any,
  status: number
) {
  let errorMessage = "Unexpected error";

  if (status === 403) {
    errorMessage = "Validation Error";
  } else if (status === 401) {
    errorMessage = "Authorization Error";
  } else if (status < 500) {
    errorMessage = "Bad Request";
  } else {
    errorMessage = "Internal Server Error";
  }

  const error = new FetchError<ErrorT>(responseBody.message || errorMessage, {
    status,
    error: responseBody?.error,
  });
  return error;
}
