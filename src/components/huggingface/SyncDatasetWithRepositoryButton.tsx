import { RefreshCcwDotIcon } from "lucide-react"
import { Button } from "../ui/button"
import SyncDatasetWithRepositoryOptionsForm from "./SyncDatasetWithRepositoryOptionsForm"
import DialogWrapper from "../DialogWrapper"

export default function SyncDatasetWithRepositoryButton({ dataset }: { dataset: Required<Dataset> }) {
    return (
        <DialogWrapper
            content={({ closeDialog }) => (
                <SyncDatasetWithRepositoryOptionsForm
                    dataset={dataset}
                    closeForm={closeDialog}
                />
            )}
            trigger={
                <Button
                    size="sm"
                    variant="default"
                    className="h-7 gap-2"
                    disabled={dataset.repository.isUpToDate}
                >
                    Sync
                    <RefreshCcwDotIcon size={17} />
                </Button>
            }
        />
    )
}
