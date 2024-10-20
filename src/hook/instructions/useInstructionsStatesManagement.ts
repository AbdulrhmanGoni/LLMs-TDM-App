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

  const { addToRecentInstructionsActivities } =
    useRecentInstructionsActivitiesState();

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
    addToRecentInstructionsActivities(newActivity);
  }

  function deleteInstructionState(dataset: Dataset, instruction: Instruction) {
    removeInstructionFromDataset(dataset._id, instruction._id);
    updateDatasetInstructionsCount(dataset._id, -1);
    setSelectedInstruction((selected) => {
      if (selected?._id === instruction._id) {
        return null;
      }
      return selected;
    });
    updateInDatasetsGrid(() => ({
      id: dataset._id,
      updatefn: (pre) => ({
        ...pre,
        instructionsCount: pre.instructionsCount + 1,
      }),
    }));
    addToRecentInstructionsActivities({
      activity: "Deletion",
      activityDate: new Date().toISOString(),
      dataset,
      instruction,
    });
  }

  return {
    addNewInstructionState,
    updateInstructionState,
    deleteInstructionState,
  };
}
