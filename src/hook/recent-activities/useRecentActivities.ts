import fetchAPI from "@/lib/fetchAPI";
import { useQuery } from "@tanstack/react-query";

export default function useRecentActivities() {
  return useQuery<Activities>({
    queryKey: ["recent-activities"],
    async queryFn() {
      const { body } = await fetchAPI<{ data: Activities }>(
        "recent-activities"
      );
      return body.data;
    },
  });
}
