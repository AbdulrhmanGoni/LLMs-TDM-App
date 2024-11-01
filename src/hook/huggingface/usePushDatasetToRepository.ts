import fetchAPI from "@/lib/fetchAPI";
import useSonnerToast from "../useSonnerToast";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import pushDatasetToRepositoryOptionsSchemaRules from "@/validation/pushDatasetToRepositoryOptionsSchemaRules";
import useDatasetsStatesManagement from "../datasets/useDatasetsStatesManagement";

const pushDatasetToRepositoryOptionsSchema = z.object(
  pushDatasetToRepositoryOptionsSchemaRules
);

export type PushDatasetToRepositoryOptionsType = z.infer<
  typeof pushDatasetToRepositoryOptionsSchema
>;

type UsePushDatasetToRepository = {
  HFDatasetRepository: HuggingfaceDatasetRepositoryData;
  dataset: Dataset;
  closeForm?: () => void;
};

export default function usePushDatasetToRepository({
  dataset,
  HFDatasetRepository,
  closeForm,
}: UsePushDatasetToRepository) {
  const toast = useSonnerToast();

  const form = useForm<PushDatasetToRepositoryOptionsType>({
    resolver: zodResolver(pushDatasetToRepositoryOptionsSchema),
    defaultValues: {
      filePath: dataset.name.replaceAll(/\s+/g, "-"),
      commitTitle: `Upload a file from "LLMs TDM" App`,
    },
  });

  const { updateDatasetState } = useDatasetsStatesManagement();

  const { mutateAsync, isPending, isSuccess, error } = useMutation<
    { repository: DatasetRepository },
    any,
    PushDatasetToRepositoryOptionsType
  >({
    mutationKey: ["push-dataset-to-repository"],
    onSuccess(res) {
      dataset.repository = res.repository;
      updateDatasetState(dataset);
      closeForm?.();
      toast({
        title: "The Dataset has been pushed to the repository successfully",
        variant: "success",
      });
    },
    onError(error) {
      toast({
        title: "Error while pushing the dataset to the repository !",
        description: error.message,
        variant: "error",
      });
    },
    async mutationFn(options: PushDatasetToRepositoryOptionsType) {
      await fetchAPI(`huggingface/datasets/${dataset._id}/push`, {
        method: "POST",
        body: {
          repository: {
            name: HFDatasetRepository.name,
            fileFormat: options.fileFormat,
            filePath: options.filePath + "." + options.fileFormat.toLowerCase(),
          },
          commitTitle: options.commitTitle,
          commitDescription: options.commitDescription,
        },
      });

      return {
        repository: {
          fileFormat: options.fileFormat,
          filePath: options.filePath + "." + options.fileFormat.toLowerCase(),
          isUpToDate: true,
          name: HFDatasetRepository.name,
          syncedAt: new Date().toISOString(),
        },
      };
    },
  });

  function onSubmit(options: PushDatasetToRepositoryOptionsType) {
    mutateAsync(options);
  }

  return {
    form,
    onSubmit,
    isLoading: isPending,
    isSuccess,
    error,
  };
}
