import useDatasetPageContext from "../datasets/useDatasetPageContext";
import useDatasetsGridState from "../datasets/useDatasetsGridState";
import useOpenedDatasetState from "../datasets/useOpenedDatasetState";
import useDatasetInstructionsState from "./useDatasetInstructionsState";
import useRecentInstructionsActivitiesState from "../recent-activities/useRecentInstructionsActivitiesState";

export default function useInstructionsStatesManagement() {
  const { setSelectedInstruction } = useDatasetPageContext();

  const {
    addInstructionsToDataset,
    updateInstructionOfDataset,
    removeInstructionFromDataset,
  } = useDatasetInstructionsState();

  const { updateDatasetInstructionsCount } = useOpenedDatasetState();

  const { updateInDatasetsGrid } = useDatasetsGridState();

  const {
    addToRecentInstructionsActivities,
    updateRecentInstructionsActivities,
    removeRecentInstructionsActivities,
  } = useRecentInstructionsActivitiesState();

  function addNewInstructionState(dataset: Dataset, instruction: Instruction) {
    const newActivity: InstructionActivity = {
      dataset,
      instruction,
      activity: "New Resource",
      activityDate: instruction.createdAt,
    };
    const updatedDataset: Dataset = {
      ...dataset,
      instructionsCount: dataset.instructionsCount + 1,
    };
    updateDatasetInstructionsCount(dataset._id, 1);
    updateInDatasetsGrid(updatedDataset);
    addToRecentInstructionsActivities(newActivity);
    addInstructionsToDataset(dataset._id, instruction);
  }

  function updateInstructionState(
    dataset: Dataset,
    updatedInstruction: Instruction
  ) {
    const newActivity: InstructionActivity = {
      dataset,
      instruction: updatedInstruction,
      activity: "Modification",
      activityDate: new Date().toISOString(),
    };
    updateInstructionOfDataset(
      dataset._id,
      updatedInstruction._id,
      updatedInstruction
    );
    setSelectedInstruction((selected) => {
      if (selected?._id === updatedInstruction._id) {
        return updatedInstruction;
      }
      return selected;
    });
    updateRecentInstructionsActivities(
      updatedInstruction._id,
      updatedInstruction
    );
    addToRecentInstructionsActivities(newActivity);
  }

  function deleteInstructionState(
    datasetId: Dataset["_id"],
    instructionId: Instruction["_id"]
  ) {
    removeInstructionFromDataset(datasetId, instructionId);
    updateDatasetInstructionsCount(datasetId, -1);
    setSelectedInstruction((selected) => {
      if (selected?._id === instructionId) {
        return null;
      }
      return selected;
    });
    updateInDatasetsGrid(() => ({
      id: datasetId,
      updatefn: (pre) => ({
        ...pre,
        instructionsCount: pre.instructionsCount + 1,
      }),
    }));
    removeRecentInstructionsActivities(instructionId);
  }

  return {
    addNewInstructionState,
    updateInstructionState,
    deleteInstructionState,
  };
}
