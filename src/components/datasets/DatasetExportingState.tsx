"use client"
import useExportingDatasetsContext from "@/hook/useExportingDatasetsContext";
import ProgressBar from "../ProgressBar";
import { Button } from "../ui/button";
import { XIcon } from "lucide-react";
import { Separator } from "../ui/separator";

export default function DatasetExportingState({ dataset }: { dataset: Dataset }) {

    const {
        getDatasetExportingState,
        removeDatasetExportingState
    } = useExportingDatasetsContext();

    const datasetExportingState = getDatasetExportingState(dataset);

    return (
        datasetExportingState &&
        <>
            <Separator />
            <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                    <p className="font-semibold flex-1">
                        {
                            datasetExportingState.isExporting ?
                                "Exporting..." : datasetExportingState.isDone ?
                                    "Exporting done" : datasetExportingState.isCanceled ? "Canceled"
                                        : datasetExportingState.errorMessage
                        }
                    </p>
                    {
                        !datasetExportingState.isExporting &&
                        <XIcon
                            size={17}
                            className="cursor-pointer self-start"
                            onClick={() => removeDatasetExportingState(dataset)}
                        />
                    }
                </div>
                <div className="flex items-center gap-1">
                    {
                        datasetExportingState.isExporting &&
                        <Button
                            size="icon"
                            variant='ghost'
                            className="size-7 rounded-full"
                            onClick={() => datasetExportingState.cancelExporting()}
                        >
                            <XIcon size={20} />
                        </Button>
                    }
                    <ProgressBar
                        progress={datasetExportingState.exportingProgress}
                        className="flex-1"
                    />
                </div>
            </div>
        </>
    )
}
