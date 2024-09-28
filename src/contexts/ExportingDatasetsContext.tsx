"use client"
import useDatasetsExportingStatesRegistery from "@/hook/datasets/useDatasetsExportingStatesRegistery";
import { DatasetExportingState } from "@/lib/DatasetExportingState";
import { createContext, PropsWithChildren } from "react";

type DatasetPageContextType = {
    exportDataset: (dataset: Dataset, options: ExportDatasetOptions) => void;
    getDatasetExportingState: (dataset: Dataset) => DatasetExportingState | undefined;
    removeDatasetExportingState: (dataset: Dataset) => void;
}

export const exportingDatasetsContext = createContext<DatasetPageContextType>({
    exportDataset() { },
    getDatasetExportingState: () => undefined,
    removeDatasetExportingState: () => { },
});

export default function ExportingDatasetsContext({ children }: PropsWithChildren) {

    const [
        datasetsExportingStates,
        datasetsExportingStatesActions
    ] = useDatasetsExportingStatesRegistery<string, DatasetExportingState>()

    async function exportDataset(dataset: Dataset, options: ExportDatasetOptions) {
        const datasetExportingState = new DatasetExportingState(
            dataset,
            options,
            datasetsExportingStatesActions.update
        );
        await datasetExportingState.startExporting();
        datasetsExportingStatesActions.set(dataset._id, datasetExportingState);
    }

    function getDatasetExportingState(dataset: Dataset) {
        return datasetsExportingStates.get(dataset._id);
    }

    function removeDatasetExportingState(dataset: Dataset) {
        return datasetsExportingStatesActions.remove(dataset._id);
    }

    return (
        <exportingDatasetsContext.Provider
            value={{
                exportDataset,
                getDatasetExportingState,
                removeDatasetExportingState
            }}
        >
            {children}
        </exportingDatasetsContext.Provider>
    )
};
