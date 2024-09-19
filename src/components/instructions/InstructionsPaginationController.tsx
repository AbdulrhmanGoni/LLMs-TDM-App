"use client"
import useDatasetPage from "@/hook/datasets/useDatasetPage"
import { Button } from "../ui/button"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"

export default function InstructionsPaginationController() {

    const {
        dataset,
        datasetLoading,
        datasetError,
        instructionsLoading,
        instructionsError,
        nextPage,
        previousPage,
        paginationModel,
    } = useDatasetPage()

    const disable = !!(datasetLoading || datasetError || instructionsLoading || instructionsError)
    const totalDatasets = dataset?.instructionsCount || 0
    const totalPages = Math.ceil((totalDatasets / paginationModel.pageSize))

    return (
        <div className="flex items-center gap-1 flex-1 justify-end">
            <Button
                size="sm"
                className="gap-1"
                disabled={disable || paginationModel.page === 1}
                onClick={() => previousPage()}
            >
                <ChevronLeftIcon className="h-4 w-4" />
                Previous
            </Button>
            <span className="px-1">
                {totalPages && paginationModel.page} of {totalPages}
            </span>
            <Button
                size="sm"
                className="gap-1"
                disabled={disable || totalPages <= paginationModel.page}
                onClick={() => nextPage()}
            >
                Next
                <ChevronRightIcon className="h-4 w-4" />
            </Button>
        </div>
    )
}
