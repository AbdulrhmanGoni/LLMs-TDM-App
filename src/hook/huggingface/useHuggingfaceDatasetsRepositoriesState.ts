import { useQueryClient } from "@tanstack/react-query";

export default function useHuggingfaceDatasetsRepositoriesState() {
  const QueryClient = useQueryClient();

  function refetchDatasetsRepositories() {
    QueryClient.refetchQueries({
      queryKey: ["huggingface-datasets-repositories"],
    });
  }

  return {
    refetchDatasetsRepositories,
  };
}
