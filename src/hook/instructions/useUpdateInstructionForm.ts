"use client";
import instructionFormSchemaRules from "@/validation/instructionFormSchemaRules";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import useSonnerToast from "../useSonnerToast";
import fetchAPI from "@/lib/fetchAPI";
import useInstructionsStatesManagement from "./useInstructionsStatesManagement";
import FetchError from "@/lib/FetchError";

type UpdateInstructionsInput = Partial<Omit<InstructionBase, "_id">>;

const instructionFormSchema = z.object({
  systemMessage: instructionFormSchemaRules.systemMessage,
  question: instructionFormSchemaRules.question.optional(),
  answer: instructionFormSchemaRules.answer.optional(),
});

type MutationResponseType = {
  data: Instruction;
  message?: string;
};

export type UseUpdateInstructionForm = {
  selectedInstruction: Instruction;
  dataset: Dataset;
  closeEditMode: () => void;
};

export default function UseUpdateInstructionForm({
  selectedInstruction,
  dataset,
  closeEditMode,
}: UseUpdateInstructionForm) {
  const form = useForm<UpdateInstructionsInput>({
    resolver: zodResolver(instructionFormSchema),
    defaultValues: selectedInstruction,
  });

  const { updateInstructionState } = useInstructionsStatesManagement();

  const toast = useSonnerToast();

  const { mutateAsync, isPending, isSuccess, error } = useMutation<
    MutationResponseType,
    FetchError,
    UpdateInstructionsInput
  >({
    mutationKey: ["update-instructions"],
    onSuccess(res) {
      updateInstructionState(dataset, res.data);
      closeEditMode();
      form.clearErrors();
      toast({
        title: "The instruction was updated successfully",
        variant: "success",
      });
    },
    async mutationFn(updatedInstruction: UpdateInstructionsInput) {
      const { body } = await fetchAPI<MutationResponseType>(`instructions`, {
        method: "PATCH",
        search: {
          datasetId: selectedInstruction.datasetId,
          instructionId: selectedInstruction._id,
        },
        body: updatedInstruction,
      });
      return body;
    },
  });

  async function onSubmit(instructionForm: UpdateInstructionsInput) {
    const thereAreChanges = Object.keys(form.formState.dirtyFields)
      .values()
      .some((value) => value);

    if (thereAreChanges) {
      await mutateAsync(instructionForm);
    } else {
      toast({
        title: "No Changes",
        description: "You did not make any changes on the instruction.",
        variant: "warning",
      });
    }
  }

  return {
    onSubmit,
    form,
    isPending,
    isSuccess,
    error,
  };
}
