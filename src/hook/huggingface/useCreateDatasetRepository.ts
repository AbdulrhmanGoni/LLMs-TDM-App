import { useForm } from "react-hook-form";
import useSonnerToast from "../useSonnerToast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import fetchAPI from "@/lib/fetchAPI";
import createDatasetRepositoryFormSchemaRules from "@/validation/createDatasetRepositoryFormSchemaRules";
import { z } from "zod";
import useHuggingfaceDatasetsRepositoriesState from "./useHuggingfaceDatasetsRepositoriesState";

const createDatasetRepositoryFormSchema = z.object(
  createDatasetRepositoryFormSchemaRules
);

type CreateDatasetRepositoryInput = z.infer<
  typeof createDatasetRepositoryFormSchema
>;

export default function useCreateDatasetRepository({
  closeForm,
}: {
  closeForm?: () => void;
}) {
  const toast = useSonnerToast();

  const form = useForm<CreateDatasetRepositoryInput>({
    resolver: zodResolver(createDatasetRepositoryFormSchema),
    defaultValues: {
      name: "",
    },
  });

  const { refetchDatasetsRepositories } =
    useHuggingfaceDatasetsRepositoriesState();

  const { mutateAsync, isPending, isSuccess, error } = useMutation({
    mutationKey: ["create-dataset-repository"],
    onSuccess() {
      refetchDatasetsRepositories();
      closeForm?.();
      toast({
        title: "The dataset repository has been created successfully",
        variant: "success",
      });
    },
    onError(error) {
      toast({
        title: "Error while creating the dataset repository !",
        description: error.message,
        variant: "error",
      });
    },
    async mutationFn(input: CreateDatasetRepositoryInput) {
      const { body } = await fetchAPI(`huggingface/datasets`, {
        method: "POST",
        body: input,
      });
      return body;
    },
  });

  function onSubmit(options: CreateDatasetRepositoryInput) {
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
