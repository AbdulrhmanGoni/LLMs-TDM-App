import { useParams } from "next/navigation";
import useDatasetPageContext from "./useDatasetPageContext";
import useDataset from "./useDataset";
import useDatasetInstructionsContext from "../instructions/useDatasetInstructionsContext";

export default function useDatasetPage() {
  const { datasetId } = useParams();

  const datasetPageContext = useDatasetPageContext();

  const {
    data: datasetInstructions,
    nextPage,
    previousPage,
    goToPage,
    isFetching: instructionsLoading,
    error: instructionsError,
    paginationModel,
    setPaginationModel,
  } = useDatasetInstructionsContext();

  const {
    data: dataset,
    isFetching: datasetLoading,
    error: datasetError,
  } = useDataset(datasetId as string, !!datasetPageContext.dataset);

  return {
    ...datasetPageContext,
    dataset: dataset || datasetPageContext.dataset,
    datasetLoading,
    datasetError,
    datasetInstructions,
    instructionsLoading,
    instructionsError,
    nextPage,
    previousPage,
    goToPage,
    paginationModel,
    setPaginationModel,
  };
}
