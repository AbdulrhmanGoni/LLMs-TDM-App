import { FolderPlusIcon } from "lucide-react"
import { Button } from "../ui/button"
import DialogWrapper from "../DialogWrapper"
import CreateDatasetRepositoryForm from "./CreateDatasetRepositoryForm"

export default function CreateDatasetRepositoryButton() {
    return (
        <DialogWrapper
            content={({ closeDialog }) => (
                <CreateDatasetRepositoryForm
                    closeForm={() => {
                        closeDialog()
                    }}
                />
            )}
            trigger={
                <Button
                    variant="default"
                    size="sm"
                    className="gap-2"
                >
                    <FolderPlusIcon size={17} />
                    Create Repository
                </Button>
            }
        />
    )
}
