import fetchAPI from "@/lib/fetchAPI";
import useSonnerToast from "../useSonnerToast";
import { useMutation } from "@tanstack/react-query";
import useDatasetsStatesManagement from "./useDatasetsStatesManagement";

export default function useDeleteDataset() {
  const toast = useSonnerToast();
  const { deleteDatasetState } = useDatasetsStatesManagement();

  const { mutateAsync, isPending, isSuccess, error } = useMutation({
    mutationKey: ["delete-dataset"],
    onSuccess(_res) {
      toast({
        title: "The Dataset has been deleted successfully",
        variant: "success",
      });
    },
    onError(error) {
      toast({
        title: "Error while deleting the dataset !",
        description: error.message,
        variant: "error",
      });
    },
    async mutationFn(dataset: Dataset) {
      const { body } = await fetchAPI(`datasets/${dataset._id}`, {
        method: "DELETE",
        search: { datasetId: dataset._id },
      });
      deleteDatasetState(dataset);
      return body;
    },
  });

  async function deleteDataset(dataset: Dataset) {
    await mutateAsync(dataset);
  }

  return {
    deleteDataset,
    isPending,
    isSuccess,
    error,
  };
}
