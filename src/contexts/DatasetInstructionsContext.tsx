"use client"
import useDatasetInstructions from "@/hook/instructions/useDatasetInstructions";
import FetchError from "@/lib/FetchError";
import { createContext, Dispatch, PropsWithChildren, SetStateAction } from "react";

type DatasetPageContextType = {
    data?: DatasetInstructionsPage,
    nextPage: () => void,
    previousPage: () => void,
    goToPage: (pageNumber: number) => void,
    isFetching: boolean,
    error: FetchError | null,
    paginationModel: PaginationModel,
    setPaginationModel: Dispatch<SetStateAction<PaginationModel>>
}

export const datasetInstructionsContext = createContext<DatasetPageContextType>({
    nextPage() { },
    previousPage() { },
    goToPage() { },
    paginationModel: { page: 1, pageSize: 1 },
    isFetching: false,
    error: null,
    setPaginationModel() { }
});

export default function DatasetInstructionsContext({ children }: PropsWithChildren) {

    const {
        data: datasetInstructions,
        nextPage,
        previousPage,
        goToPage,
        isFetching: instructionsLoading,
        error: instructionsError,
        paginationModel,
        setPaginationModel
    } = useDatasetInstructions();

    return (
        <datasetInstructionsContext.Provider
            value={{
                data: datasetInstructions,
                nextPage,
                previousPage,
                goToPage,
                isFetching: instructionsLoading,
                error: instructionsError,
                paginationModel,
                setPaginationModel
            }}
        >
            {children}
        </datasetInstructionsContext.Provider>
    )
};
