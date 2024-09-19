import instructionFormSchemaRules from "@/validation/instructionFormSchemaRules";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import useSonnerToast from "../useSonnerToast";
import fetchAPI from "@/lib/fetchAPI";
import FetchError from "@/lib/FetchError";
import useInstructionsStatesManagement from "./useInstructionsStatesManagement";

type AddInstructionsInput = Omit<InstructionBase, "_id"> & {
  datasetId: Dataset["_id"];
};

type MutationResponseType = {
  data: Instruction;
  message: string;
};

const instructionFormSchema = z.object(instructionFormSchemaRules);

const defaultValues = {
  systemMessage: "",
  question: "",
  answer: "",
};

type UseAddInstructionFormProps = {
  dataset: Dataset;
};

export default function useAddInstructionForm({
  dataset,
}: UseAddInstructionFormProps) {
  const form = useForm<AddInstructionsInput>({
    resolver: zodResolver(instructionFormSchema),
    defaultValues: {
      ...defaultValues,
      datasetId: dataset._id,
    },
  });
  const { addNewInstructionState } = useInstructionsStatesManagement();
  const toast = useSonnerToast();

  const { mutateAsync, isPending, isSuccess, error } = useMutation<
    MutationResponseType,
    FetchError,
    AddInstructionsInput
  >({
    mutationKey: ["add-instructions"],
    onSuccess(res) {
      form.reset({
        ...defaultValues,
        datasetId: dataset._id,
      });
      addNewInstructionState(dataset, res.data);
      form.clearErrors();
      toast({
        title: "The instruction was added successfully",
        variant: "success",
      });
    },
    async mutationFn(instruction: AddInstructionsInput) {
      const { body } = await fetchAPI<MutationResponseType>(`instructions`, {
        method: "POST",
        body: instruction,
      });
      return body;
    },
  });

  async function onSubmit(instruction: AddInstructionsInput) {
    if (!instruction.systemMessage) {
      instruction.systemMessage = undefined;
    }
    mutateAsync(instruction);
  }

  return {
    onSubmit,
    form,
    isPending,
    isSuccess,
    error,
  };
}
