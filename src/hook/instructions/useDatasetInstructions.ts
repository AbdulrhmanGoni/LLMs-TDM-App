import fetchAPI from "@/lib/fetchAPI";
import FetchError from "@/lib/FetchError";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import useDatasetPageContext from "../datasets/useDatasetPageContext";

export type DatasetInstructionsQueryResponse = {
  data: DatasetInstructionsPage;
};

export default function useDatasetInstructions() {
  const { datasetId } = useParams();
  const initialPaginationModel = { page: 1, pageSize: 15 };
  const [paginationModel, setPaginationModel] = useState<PaginationModel>(
    initialPaginationModel
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<FetchError>();
  const [isFirstRender, setIsFirstRender] = useState(true);

  const { setSelectedInstruction, setDataset } = useDatasetPageContext();

  const QueryClient = useQueryClient();
  const queryKey = ["dataset-instructions", datasetId];

  const {
    data,
    error: queryError,
    isFetching,
  } = useQuery<DatasetInstructionsQueryResponse["data"], FetchError>({
    queryKey,
    queryFn: () => fetchPage(paginationModel),
  });

  async function fetchPage(paginationModel: PaginationModel) {
    const { body } = await fetchAPI<
      Omit<DatasetInstructionsQueryResponse, "page">
    >("instructions", {
      search: {
        page: String(paginationModel.page),
        pageSize: String(paginationModel.pageSize),
        datasetId: datasetId as string,
      },
    });
    return body.data;
  }

  async function stepToPage(steps: number, fromStart: boolean = false) {
    setIsLoading(true);
    const targetPage = {
      pageSize: paginationModel.pageSize,
      page: fromStart ? steps : paginationModel.page + steps,
    };
    setPaginationModel(targetPage);
    try {
      const pageData = await fetchPage(targetPage);
      QueryClient.setQueryData(queryKey, pageData);
      setIsLoading(false);
    } catch (error) {
      setError(error as FetchError);
    }
  }

  function nextPage() {
    stepToPage(1);
  }

  function previousPage() {
    stepToPage(-1);
  }

  function goToPage(pageNumber: number) {
    stepToPage(pageNumber, true);
  }

  useEffect(() => {
    return () => {
      if (!isFirstRender) {
        QueryClient.resetQueries({
          queryKey: ["dataset-instructions", datasetId],
        });
        setDataset(null);
        setSelectedInstruction(null);
      }
    };
  }, [isFirstRender]);

  useEffect(() => setIsFirstRender(false), []);

  return {
    data: data,
    isFetching: isLoading || isFetching,
    error: error || queryError,
    paginationModel,
    setPaginationModel,
    nextPage,
    previousPage,
    goToPage,
  };
}
