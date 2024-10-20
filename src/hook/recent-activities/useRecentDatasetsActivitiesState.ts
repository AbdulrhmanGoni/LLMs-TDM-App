import { useQueryClient } from "@tanstack/react-query";

export default function useRecentDatasetsActivitiesState() {
  const QueryClient = useQueryClient();

  function addToRecentDatasetsActivities(datasetActivity: DatasetActivity) {
    QueryClient.setQueryData<Activities | undefined>(
      ["recent-activities"],
      (preData) => {
        if (preData) {
          return {
            ...preData,
            datasetsActivities: [
              datasetActivity,
              ...preData.datasetsActivities.slice(0, 4),
            ],
          };
        }
        return undefined;
      }
    );
  }

  return {
    addToRecentDatasetsActivities,
  };
}
