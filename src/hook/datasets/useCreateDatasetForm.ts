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

const datasetFormSchema = z.object(datasetFormSchemaRules);

type CreaetDatasetInput = z.infer<typeof datasetFormSchema>;

type ResponseType = {
  message?: string;
  data: Dataset;
};

const defaultValues = {
  name: "",
  description: "",
};

export default function useCreateDatasetForm({ closeForm }: { closeForm: () => void }) {
  const form = useForm<CreaetDatasetInput>({
    resolver: zodResolver(datasetFormSchema),
    defaultValues,
  });

  const toast = useSonnerToast();

  const { addNewDatasetState } = useDatasetsStatesManagement();

  const { mutateAsync, isPending, isSuccess, error } = useMutation<
    ResponseType,
    FetchError,
    CreaetDatasetInput
  >({
    mutationKey: ["create-dataset"],
    onSuccess(res) {
      addNewDatasetState(res.data);
      toast({
        title: "The Dataset has been created successfully",
        description: res.message,
        variant: "success",
      });
      form.reset(defaultValues);
      form.clearErrors();
      closeForm()
    },
    onError(error) {
      toast({
        title: error.message,
        variant: "error",
      });
    },
    async mutationFn(newDataset: CreaetDatasetInput) {
      const { body } = await fetchAPI<ResponseType>("datasets", {
        method: "POST",
        body: newDataset,
      });
      return body;
    },
  });

  async function onSubmit(newDataset: CreaetDatasetInput) {
    await mutateAsync(newDataset);
  }

  return {
    onSubmit,
    isPending,
    isSuccess,
    error,
    form,
  };
}
