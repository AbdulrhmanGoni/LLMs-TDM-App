import { Link2OffIcon } from "lucide-react"
import { Button } from "../ui/button"
import DialogWrapper from "../DialogWrapper"
import UnlinkDatasetWithRepositoryOptionsForm from "./UnlinkDatasetWithRepositoryOptionsForm"

export default function UnlinkDatasetWithRepositoryButton({ dataset }: { dataset: Required<Dataset> }) {
    return (
        <DialogWrapper
            content={({ closeDialog }) => (
                <UnlinkDatasetWithRepositoryOptionsForm
                    dataset={dataset}
                    closeForm={closeDialog}
                />
            )}
            trigger={
                <Button
                    size="sm"
                    variant="destructive"
                    className="h-7 gap-2"
                >
                    Unlink
                    <Link2OffIcon size={17} />
                </Button>
            }
        />
    )
}
