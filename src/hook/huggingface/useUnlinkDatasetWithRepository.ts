import fetchAPI from "@/lib/fetchAPI";
import useSonnerToast from "../useSonnerToast";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import useOpenedDatasetState from "../datasets/useOpenedDatasetState";
import unlinkDatasetWithRepositoryOptionsSchema from "@/validation/unlinkDatasetWithRepositoryOptionsSchemaRules";

export type UnlinkDatasetWithRepositoryOptions = z.infer<
  typeof unlinkDatasetWithRepositoryOptionsSchema
>;

type UnlinkDatasetWithRepositoryPayload = {
  datasetId: Dataset["_id"];
  options?: UnlinkDatasetWithRepositoryOptions;
};

type UseUnlinkDatasetWithRepository = {
  dataset: Required<Dataset>;
  closeForm: () => void;
};

export default function useUnlinkDatasetWithRepository({
  dataset,
  closeForm,
}: UseUnlinkDatasetWithRepository) {
  const toast = useSonnerToast();

  const form = useForm<UnlinkDatasetWithRepositoryOptions>({
    resolver: zodResolver(unlinkDatasetWithRepositoryOptionsSchema),
    defaultValues: {
      commitTitle: `Delete a file from "LLMs TDM" App`,
    },
  });

  const { updateDataset } = useOpenedDatasetState();

  const { mutateAsync, isPending, isSuccess, error } = useMutation({
    mutationKey: ["unlink-dataset-with-repository"],
    onSuccess(_res) {
      const { repository, ...updatedDataset } = dataset;
      updateDataset(updatedDataset._id, updatedDataset);
      closeForm();
      toast({
        title: "The Dataset has been unlinked with the repository successfully",
        variant: "success",
      });
    },
    onError(error) {
      toast({
        title: "Error while unlinking the dataset with the repository !",
        description: error.message,
        variant: "error",
      });
    },
    async mutationFn({
      datasetId,
      options,
    }: UnlinkDatasetWithRepositoryPayload) {
      const { body } = await fetchAPI(
        `huggingface/datasets/${datasetId}/unlink`,
        {
          method: "POST",
          body: {
            deleteRepository: options?.deleteRepository,
            deleteDatasetFile: options?.deleteDatasetFile,
            commitTitle: options?.commitTitle,
            commitDescription: options?.commitDescription,
          },
        }
      );
      return body;
    },
  });

  function onSubmit(options: UnlinkDatasetWithRepositoryOptions) {
    mutateAsync({
      datasetId: dataset._id,
      options,
    });
  }

  return {
    form,
    onSubmit,
    isLoading: isPending,
    isSuccess,
    error,
  };
}
