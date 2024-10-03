"use client";
import fetchAPI from "@/lib/fetchAPI";
import useSonnerToast from "../useSonnerToast";
import { useMutation } from "@tanstack/react-query";
import { DeleteInstructionButtonProps } from "@/components/instructions/DeleteInstructionButton";
import useInstructionsStatesManagement from "./useInstructionsStatesManagement";

export default function useDeleteInstruction({
  dataset,
  instruction,
}: DeleteInstructionButtonProps) {
  const { deleteInstructionState } = useInstructionsStatesManagement();

  const toast = useSonnerToast();

  const { mutateAsync, isPending, isSuccess, error } = useMutation({
    mutationKey: ["delete-instructions"],
    onSuccess(_res) {
      deleteInstructionState(dataset, instruction);
      toast({
        title: "The instruction has been deleted successfully",
        variant: "success",
      });
    },
    onError(error) {
      toast({
        title: "Error while deleting the instruction !",
        description: error.message,
        variant: "error",
      });
    },
    async mutationFn() {
      const { body } = await fetchAPI(`instructions`, {
        method: "DELETE",
        search: {
          datasetId: dataset._id,
          instructionId: instruction._id,
        },
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
