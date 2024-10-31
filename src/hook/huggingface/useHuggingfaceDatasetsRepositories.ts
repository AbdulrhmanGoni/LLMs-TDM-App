import fetchAPI from "@/lib/fetchAPI";
import { useQuery } from "@tanstack/react-query";

export default function useHuggingfaceDatasetsRepositories(dataset: Dataset) {
  return useQuery({
    queryKey: ["huggingface-datasets-repositories"],
    queryFn: async () => {
      const { body } = await fetchAPI<{
        data: HuggingfaceDatasetRepositoryData[];
      }>("huggingface/datasets");
      return body.data;
    },
    enabled: !dataset.repository,
  });
}
