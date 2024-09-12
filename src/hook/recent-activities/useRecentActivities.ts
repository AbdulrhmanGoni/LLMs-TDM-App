import fetchAPI from "@/lib/fetchAPI";
import FetchError from "@/lib/FetchError";
import { useQuery } from "@tanstack/react-query";

export default function useRecentActivities() {
  return useQuery<Activities, FetchError>({
    queryKey: ["recent-activities"],
    async queryFn() {
      const { body } = await fetchAPI<{ data: Activities }>(
        "recent-activities"
      );
      return body.data;
    },
  });
}
