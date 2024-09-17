import { useQueryClient } from "@tanstack/react-query";
import { DatasetInstructionsQueryResponse } from "./useDatasetInstructions";
import useDatasetPage from "../datasets/useDatasetPage";

type StateType = DatasetInstructionsQueryResponse["data"];

export default function useDatasetInstructionsState() {
  const QueryClient = useQueryClient();

  const { paginationModel, previousPage, goToPage } = useDatasetPage();

  function addInstructionsToDataset(
    datasetId: Dataset["_id"],
    newInstruction: Instruction
  ) {
    QueryClient.setQueryData<StateType>(
      ["dataset-instructions", datasetId],
      (state) => {
        if (state) {
          if (state.instructions.length < paginationModel.pageSize) {
            state.instructions = [...state.instructions, newInstruction];
          }
        }
        return state;
      }
    );
  }

  function updateInstructionOfDataset(
    datasetId: Dataset["_id"],
    instructionId: Instruction["_id"],
    updatedInstruction: Instruction | ((pre?: Instruction) => Instruction)
  ) {
    QueryClient.setQueryData<StateType>(
      ["dataset-instructions", datasetId],
      (state) => {
        if (state) {
          state.instructions = state.instructions.map((instruction) => {
            if (instructionId === instruction._id) {
              return typeof updatedInstruction === "function"
                ? updatedInstruction(instruction)
                : updatedInstruction;
            }
            return instruction;
          });
        }
        return state;
      }
    );
  }

  function removeInstructionFromDataset(
    datasetId: Dataset["_id"],
    instructionId: Instruction["_id"]
  ) {
    QueryClient.setQueryData<StateType>(
      ["dataset-instructions", datasetId],
      (state) => {
        if (state) {
          state.instructions = state.instructions.filter(
            (instruction) => instruction._id !== instructionId
          );
          if (!state.instructions.length) {
            if (paginationModel.page === 1) {
              goToPage(1);
            } else {
              previousPage();
            }
          }
        }
        return state;
      }
    );
  }

  return {
    addInstructionsToDataset,
    updateInstructionOfDataset,
    removeInstructionFromDataset,
  };
}
