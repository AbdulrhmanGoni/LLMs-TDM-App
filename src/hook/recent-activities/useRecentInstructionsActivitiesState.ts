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

  return {
    addToRecentInstructionsActivities,
  };
}
