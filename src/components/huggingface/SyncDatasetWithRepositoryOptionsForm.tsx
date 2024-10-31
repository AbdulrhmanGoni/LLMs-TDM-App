import { FolderSyncIcon, LoaderIcon, RefreshCcwDotIcon } from "lucide-react"
import { Button } from "../ui/button"
import { Form } from "../ui/form"
import useSyncDatasetWithRepository from "@/hook/huggingface/useSyncDatasetWithRepository"
import { DialogTitle } from "../ui/dialog"
import CommitMessageInputs from "./CommitMessageInputs"

type SyncDatasetWithRepositoryOptionsFormProps = {
    dataset: Required<Dataset>;
    closeForm: () => void;
}

export default function SyncDatasetWithRepositoryOptionsForm(
    { dataset, closeForm }: SyncDatasetWithRepositoryOptionsFormProps
) {

    const { form, onSubmit, isLoading } = useSyncDatasetWithRepository({ dataset, closeForm });

    return (
        <Form {...form}>
            <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
                <div className="space-y-2">
                    <DialogTitle className="flex gap-2 items-center text-2xl font-bold">
                        <FolderSyncIcon />
                        Sync the dataset with its repository
                    </DialogTitle>
                    <p className="text-sm text-muted-foreground">
                        Sync the latest updates on
                        <span className="text-primary">{` "${dataset.name}" `}</span>
                        dataset with
                        <span className="text-primary">{` "${dataset.repository.name}" `}</span>
                        remote repository on Huggingface
                    </p>
                </div>
                <div className="grid gap-3">
                    <CommitMessageInputs
                        form={form}
                        isLoading={isLoading}
                        commitTitle="The title of the commit that will be made when syncing the dataset to the repository"
                        commitDescription="The description of the commit that will be made when syncing the dataset to the repository"
                    />
                </div>
                <Button
                    size="sm"
                    type="submit"
                    className="gap-1 w-fit justify-self-end"
                >
                    {isLoading ? "Syncing..." : "Sync"}
                    {
                        isLoading ?
                            <LoaderIcon size={16} className="animate-spin" />
                            : <RefreshCcwDotIcon size={16} />
                    }
                </Button>
            </form>
        </Form>
    )
}
