import useDatasetsGridState from "./useDatasetsGridState";
import useDatasetsOverviewState from "./useDatasetsOverviewState";
import useOpenedDatasetState from "./useOpenedDatasetState";
import useRecentDatasetsActivitiesState from "../recent-activities/useRecentDatasetsActivitiesState";

export default function useDatasetsStatesManagement() {
  const { updateDataset } = useOpenedDatasetState();

  const { addToDatasetsGrid, deleteFromDatasetsGrid, updateInDatasetsGrid } =
    useDatasetsGridState();

  const { addToRecentDatasetsActivities } = useRecentDatasetsActivitiesState();

  const { increaseDatasetsCount, decreaseDatasetsCount } =
    useDatasetsOverviewState();

  function addNewDatasetState(newDataset: Dataset) {
    const newActivity: DatasetActivity = {
      dataset: newDataset,
      activity: "New Resource",
      activityDate: newDataset.createdAt,
    };
    addToDatasetsGrid(newDataset);
    addToRecentDatasetsActivities(newActivity);
    increaseDatasetsCount();
  }

  function updateDatasetState(updatedDataset: Dataset) {
    updateDataset(updatedDataset._id, updatedDataset);
    updateInDatasetsGrid(updatedDataset);
    addToRecentDatasetsActivities({
      dataset: updatedDataset,
      activity: "Modification",
      activityDate: new Date().toISOString(),
    });
  }

  function deleteDatasetState(dataset: Dataset) {
    updateDataset(dataset._id, null);
    deleteFromDatasetsGrid(dataset._id);
    addToRecentDatasetsActivities({
      activity: "Deletion",
      activityDate: new Date().toISOString(),
      dataset,
    });
    decreaseDatasetsCount(dataset.createdAt);
  }

  return {
    addNewDatasetState,
    updateDatasetState,
    deleteDatasetState,
  };
}
