"use client";
import fetchAPI from "@/lib/fetchAPI";
import datasetFormSchemaRules from "@/validation/datasetFormSchemaRules";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import useSonnerToast from "../useSonnerToast";
import { useMutation } from "@tanstack/react-query";
import useDatasetsStatesManagement from "./useDatasetsStatesManagement";
import FetchError from "@/lib/FetchError";

const datasetFormSchema = z.object({
  name: datasetFormSchemaRules.name.optional(),
  description: datasetFormSchemaRules.description.optional(),
});

export type UpdateDatasetInput = z.infer<typeof datasetFormSchema>;

type ResponseType = {
  data: Dataset;
  message: string;
};

export default function useUpdateDatasetForm(dataset: Dataset) {
  const form = useForm<UpdateDatasetInput>({
    resolver: zodResolver(datasetFormSchema),
    defaultValues: {
      name: dataset.name,
      description: dataset.description,
    },
  });

  const { updateDatasetState } = useDatasetsStatesManagement();

  const toast = useSonnerToast();

  const { mutateAsync, isPending, isSuccess, error } = useMutation<
    ResponseType,
    FetchError,
    UpdateDatasetInput
  >({
    mutationKey: ["update-dataset"],
    onSuccess(res) {
      updateDatasetState(res.data);
      toast({
        title: "Successful dataset update",
        description: `The dataset "${dataset.name}" has been updated successfully`,
        variant: "success",
      });
    },
    async mutationFn(updateDataset: UpdateDatasetInput) {
      const { body } = await fetchAPI<ResponseType>(`datasets/${dataset._id}`, {
        method: "PATCH",
        body: updateDataset,
      });

      return body;
    },
  });

  async function onSubmit(updateDataset: UpdateDatasetInput) {
    if (Object.values(updateDataset).some((data) => !!data)) {
      await mutateAsync(updateDataset);
    } else {
      //
    }
  }

  return {
    onSubmit,
    isPending,
    isSuccess,
    error,
    form,
  };
}
