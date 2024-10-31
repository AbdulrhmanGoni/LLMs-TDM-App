import fetchAPI from "@/lib/fetchAPI";
import useSonnerToast from "../useSonnerToast";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import commitOptionsSchemaRules from "@/validation/commitOptionsSchemaRules";
import useOpenedDatasetState from "../datasets/useOpenedDatasetState";

const syncDatasetWithRepositoryOptionsSchema = z.object({
  commitTitle: commitOptionsSchemaRules.commitTitle,
  commitDescription: commitOptionsSchemaRules.commitDescription,
});

export type SyncDatasetWithRepositoryOptions = z.infer<
  typeof syncDatasetWithRepositoryOptionsSchema
>;

type SyncDatasetWithRepositoryPayload = {
  datasetId: Dataset["_id"];
  options?: SyncDatasetWithRepositoryOptions;
};

type UseSyncDatasetWithRepository = {
  dataset: Required<Dataset>;
  closeForm: () => void;
};

export default function useSyncDatasetWithRepository({
  dataset,
  closeForm,
}: UseSyncDatasetWithRepository) {
  const toast = useSonnerToast();

  const form = useForm<SyncDatasetWithRepositoryOptions>({
    resolver: zodResolver(syncDatasetWithRepositoryOptionsSchema),
    defaultValues: {
      commitTitle: `Upload a file from "LLMs TDM" App`,
    },
  });

  const { updateDataset } = useOpenedDatasetState();

  const { mutateAsync, isPending, isSuccess, error } = useMutation({
    mutationKey: ["sync-dataset-with-repository"],
    onSuccess(_res) {
      const updatedDataset = {
        ...dataset,
        repository: {
          ...dataset.repository,
          isUpToDate: true,
          syncedAt: new Date().toISOString(),
        },
      };
      updateDataset(updatedDataset._id, updatedDataset);
      closeForm();
      toast({
        title: "The Dataset has been synced with the repository successfully",
        variant: "success",
      });
    },
    onError(error) {
      toast({
        title: "Error while syncing the dataset with the repository !",
        description: error.message,
        variant: "error",
      });
    },
    async mutationFn({ datasetId, options }: SyncDatasetWithRepositoryPayload) {
      const { body } = await fetchAPI(
        `huggingface/datasets/${datasetId}/sync`,
        {
          method: "POST",
          body: {
            commitTitle: options?.commitTitle,
            commitDescription: options?.commitDescription,
          },
        }
      );
      return body;
    },
  });

  function onSubmit(options: SyncDatasetWithRepositoryOptions) {
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
