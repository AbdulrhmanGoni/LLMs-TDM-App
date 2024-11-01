import { useQueryClient } from "@tanstack/react-query";
import useDatasetPageContext from "./useDatasetPageContext";

export default function useOpenedDatasetState() {
  const QueryClient = useQueryClient();

  const { setDataset, dataset } = useDatasetPageContext();

  function updateDataset(
    datasetId: Dataset["_id"],
    updateData: Dataset | ((pre?: Dataset | null) => Dataset) | null
  ) {
    QueryClient.setQueryData<Dataset | null>(
      ["dataset", datasetId],
      updateData
    );
    if (dataset?._id === datasetId) {
      setDataset(updateData);
    }
    !updateData &&
      QueryClient.resetQueries({ queryKey: ["dataset", datasetId] });
  }

  function updateDatasetInstructionsCount(
    datasetId: Dataset["_id"],
    amount: number
  ) {
    QueryClient.setQueryData<Dataset | undefined>(
      ["dataset", datasetId],
      (dataset) => {
        return dataset && updateDatasetInstructionsCountFn(dataset, amount);
      }
    );
    if (dataset?._id === datasetId) {
      setDataset((dataset) => {
        return dataset && updateDatasetInstructionsCountFn(dataset, amount);
      });
    }
  }

  return {
    updateDataset,
    updateDatasetInstructionsCount,
  };
}

function updateDatasetInstructionsCountFn(dataset: Dataset, amount: number) {
  if (dataset) {
    return {
      ...dataset,
      instructionsCount: dataset.instructionsCount + amount,
      repository: dataset.repository && {
        ...dataset.repository,
        isUpToDate: false,
      },
    };
  } else return dataset;
}
