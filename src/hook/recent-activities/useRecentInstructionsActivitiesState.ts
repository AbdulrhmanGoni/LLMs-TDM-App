import { useQueryClient } from "@tanstack/react-query";

export default function useRecentInstructionsActivitiesState() {
  const QueryClient = useQueryClient();

  function addToRecentInstructionsActivities(
    instructionsActivity: InstructionActivity
  ) {
    QueryClient.setQueryData<Activities | undefined>(
      ["recent-activities"],
      (preData) => {
        if (preData) {
          return {
            ...preData,
            instructionsActivities: [
              instructionsActivity,
              ...preData.instructionsActivities.slice(0, 4),
            ],
          };
        }
        return undefined;
      }
    );
  }

  function updateRecentInstructionsActivities(
    instructionId: Instruction["_id"],
    updateData: Instruction | ((pre?: Instruction) => Instruction)
  ) {
    QueryClient.setQueryData<Activities | undefined>(
      ["recent-activities"],
      (preData) => {
        if (preData) {
          return {
            ...preData,
            instructionsActivities: preData.instructionsActivities.map(
              (activity) => {
                if (activity.instruction._id === instructionId) {
                  activity.instruction =
                    typeof updateData === "function"
                      ? updateData(activity.instruction)
                      : updateData;
                }
                return activity;
              }
            ),
          };
        }
        return preData;
      }
    );
  }

  function removeRecentInstructionsActivities(
    instructionId: Instruction["_id"]
  ) {
    QueryClient.setQueryData<Activities | undefined>(
      ["recent-activities"],
      (preData) => {
        if (preData) {
          return {
            ...preData,
            instructionsActivities: preData.instructionsActivities.filter(
              (activity) => activity.instruction._id !== instructionId
            ),
          };
        }
        return preData;
      }
    );
  }

  return {
    addToRecentInstructionsActivities,
    updateRecentInstructionsActivities,
    removeRecentInstructionsActivities,
  };
}
