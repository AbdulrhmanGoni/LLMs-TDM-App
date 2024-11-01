import fetchAPI from "@/lib/fetchAPI";
import { useQuery } from "@tanstack/react-query";
import { ReadonlyURLSearchParams } from "next/navigation";

type errorType = {
  error: {
    errorTitle: string;
    message: string;
  };
};

export default function useHuggingfaceOAuth(
  searchParams: ReadonlyURLSearchParams
) {
  return useQuery<any, errorType>({
    queryKey: ["huggingface-oauth"],
    queryFn: async () => {
      const { body } = await fetchAPI<{ data: any }>(
        "huggingface/oauth-callback?" + searchParams.toString()
      );
      return body.data;
    },
    retry: false,
    enabled: !!searchParams.has("code"),
  });
}
