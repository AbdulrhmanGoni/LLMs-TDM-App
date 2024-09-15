import { useQueryClient } from "@tanstack/react-query";

export default function useDatasetsGridState() {
  const QueryClient = useQueryClient();

  function addToDatasetsGrid(dataset: Dataset) {
    QueryClient.setQueryData<Dataset[]>(["datasets"], (preData) => {
      if (preData) {
        return [dataset, ...preData];
      }
    });
  }

  function deleteFromDatasetsGrid(datasetId: Dataset["_id"]) {
    QueryClient.setQueryData<Dataset[]>(["datasets"], (preData) => {
      if (preData) {
        return preData.filter((dataset) => dataset._id !== datasetId);
      }
    });
  }

  function updateInDatasetsGrid(
    updatedData:
      | Dataset
      | (() => { updatefn: (pre: Dataset) => Dataset; id: Dataset["_id"] })
  ) {
    QueryClient.setQueryData<Dataset[]>(["datasets"], (preData) => {
      if (preData) {
        if (typeof updatedData === "function") {
          const { id, updatefn } = updatedData();
          return preData.map((dataset) =>
            dataset._id === id ? updatefn(dataset) : dataset
          );
        } else {
          return preData.map((dataset) =>
            dataset._id === updatedData._id ? updatedData : dataset
          );
        }
      }
    });
  }

  return {
    addToDatasetsGrid,
    updateInDatasetsGrid,
    deleteFromDatasetsGrid,
  };
}
