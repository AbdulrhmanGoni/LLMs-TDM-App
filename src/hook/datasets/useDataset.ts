import fetchAPI from "@/lib/fetchAPI";
import FetchError from "@/lib/FetchError";
import { useQuery } from "@tanstack/react-query";

export default function useDataset(
  datasetId: Dataset["_id"],
  alreadyFetched?: boolean
) {
  return useQuery<Dataset | null, FetchError>({
    queryKey: ["dataset", datasetId],
    async queryFn() {
      const { body } = await fetchAPI<{ data: Dataset }>(
        `datasets/${datasetId}`
      );

      return body.data;
    },
    enabled: !alreadyFetched,
  });
}
