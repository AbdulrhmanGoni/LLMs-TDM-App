"use client"
import InstructionsListCard from "./InstructionsListCard"
import InstructionsListLoading from "./InstructionsListLoading"
import useDatasetPage from "@/hook/datasets/useDatasetPage"
import InstructionsPaginationController from "./InstructionsPaginationController"
import NoInstructionsInList from "./NoInstructionsInList"
import InstructionsListError from "./InstructionsListError"

export default function InstructionsList() {

  const {
    datasetLoading,
    datasetError,
    datasetInstructions,
    instructionsLoading,
    instructionsError,
    paginationModel,
    goToPage
  } = useDatasetPage()

  const loading = instructionsLoading || datasetLoading;
  const error = datasetError || instructionsError;

  return (
    <>
      {
        <div className="h-[500px] pe-1 mt-2 overflow-auto">
          {
            loading ? <InstructionsListLoading />
              : error ? (
                <InstructionsListError
                  error={instructionsError}
                  refetch={() => goToPage(paginationModel.page)}
                  page={paginationModel.page}
                />
              ) :
                datasetInstructions?.instructions.length ?
                  <div className="flex flex-col gap-2">
                    {datasetInstructions?.instructions.map((instruction) => (
                      <InstructionsListCard key={instruction._id} instruction={instruction} />
                    ))}
                  </div>
                  : <NoInstructionsInList />
          }
        </div>
      }
      <div className="p-3">
        <InstructionsPaginationController />
      </div>
    </>
  )
}
