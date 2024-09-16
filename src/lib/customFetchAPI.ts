"use server";
import { cookies } from "next/headers";

export default async function customFetchAPI<DataT = unknown>(
  path: string,
  options: {
    method?: string;
    body?: Record<string, any>;
    search?: Record<string, string>;
  } = {}
) {
  const Cookies = cookies();

  const authentication = Cookies.get("LMMs_TDM_Authentication_Token")?.value;
  const headers: HeadersInit = new Headers();
  if (authentication) {
    headers.set("Authentication", authentication);
  }

  const baseUrl = process.env.NEXT_PUBLIC_SERVER_BASE_URL || "";
  const { body, method, search } = options;
  const searchParams = search ? new URLSearchParams(search).toString() : "";

  const response = await fetch(`${baseUrl}/${path}?${searchParams}`, {
    headers,
    method,
    body: body && JSON.stringify(body),
  });

  const responseBody = await response.json();

  response.headers.getSetCookie().forEach((cookie) => {
    const [key, value] = cookie.split("=");
    Cookies.set(key, value);
  });

  return {
    body: responseBody as DataT,
    status: response.status,
    success: response.status > 199 && response.status < 300,
  };
}
