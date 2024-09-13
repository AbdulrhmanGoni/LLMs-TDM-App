import fetchAPI from "@/lib/fetchAPI";
import FetchError from "@/lib/FetchError";
import { useQuery } from "@tanstack/react-query";

export default function useDatasetsOverview() {
  return useQuery<DatasetsOverview, FetchError>({
    queryKey: ["datasets-overview"],
    async queryFn() {
      const { body } = await fetchAPI<{ data: DatasetsOverview }>(
        "datasets/overview"
      );
      return body.data;
    },
  });
}
