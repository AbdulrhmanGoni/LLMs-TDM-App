"use client";
import fetchAPI from "@/lib/fetchAPI";
import useSonnerToast from "../useSonnerToast";
import { useMutation } from "@tanstack/react-query";
import { DeleteInstructionButtonProps } from "@/components/instructions/DeleteInstructionButton";
import useInstructionsStatesManagement from "./useInstructionsStatesManagement";

export default function useDeleteInstruction({
  datasetId,
  instructionId,
}: DeleteInstructionButtonProps) {
  const { deleteInstructionState } = useInstructionsStatesManagement();

  const toast = useSonnerToast();

  const { mutateAsync, isPending, isSuccess, error } = useMutation({
    mutationKey: ["delete-instructions"],
    onSuccess(res) {
      deleteInstructionState(datasetId, instructionId);
      toast({
        title: "The instruction has been deleted successfully",
        variant: "success",
      });
    },
    async mutationFn() {
      const { body } = await fetchAPI(`instructions`, {
        method: "DELETE",
        search: { datasetId, instructionId },
      });
      return body;
    },
  });

  async function deleteTheInstruction() {
    await mutateAsync();
  }

  return {
    deleteTheInstruction,
    isPending,
    isSuccess,
    error,
  };
}
