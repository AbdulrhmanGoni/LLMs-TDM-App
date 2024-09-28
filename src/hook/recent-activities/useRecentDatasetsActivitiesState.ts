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

  function updateRecentDatasetsActivities(
    datasetId: Dataset["_id"],
    updateData: Dataset | ((pre?: Dataset) => Dataset)
  ) {
    QueryClient.setQueryData<Activities | undefined>(
      ["recent-activities"],
      (preData) => {
        if (preData) {
          return {
            datasetsActivities: preData.datasetsActivities.map((activity) => {
              if (activity.dataset._id === datasetId) {
                activity.dataset =
                  typeof updateData === "function"
                    ? updateData(activity.dataset)
                    : updateData;
              }
              return activity;
            }),
            instructionsActivities: preData.instructionsActivities.map(
              (activity) => {
                if (activity.dataset._id === datasetId) {
                  activity.dataset =
                    typeof updateData === "function"
                      ? updateData(activity.dataset)
                      : updateData;
                }
                return activity;
              }
            ),
          };
        }
        return undefined;
      }
    );
  }

  return {
    addToRecentDatasetsActivities,
    updateRecentDatasetsActivities,
  };
}
