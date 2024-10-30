import fetchAPI from "@/lib/fetchAPI";
import { useQuery } from "@tanstack/react-query";

export default function useUserHuggingfaceAccount() {
  return useQuery<HuggingfaceAccount | null>({
    queryKey: ["huggingface-account"],
    queryFn: async () => {
      const { body } = await fetchAPI<{ data: HuggingfaceAccount }>(
        "huggingface/account"
      );
      return body.data || null;
    },
  });
}
