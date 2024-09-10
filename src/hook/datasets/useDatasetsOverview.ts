import fetchAPI from "@/lib/fetchAPI";
import { useQuery } from "@tanstack/react-query";

type QueryResponse = { data: DatasetsOverview };

export default function useDatasetsOverview() {
  const { data, isFetching, error } = useQuery<QueryResponse>({
    queryKey: ["datasets-overview"],
    async queryFn() {
      const { body } = await fetchAPI<QueryResponse>("datasets/overview");
      return body;
    },
  });

  return { data: data?.data, isFetching, error };
}
