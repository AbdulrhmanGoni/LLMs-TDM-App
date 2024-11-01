import {
    CheckIcon,
    FileTextIcon,
    FileWarningIcon,
    FolderGit2Icon,
    FolderSyncIcon,
} from "lucide-react"
import SyncDatasetWithRepositoryButton from "./SyncDatasetWithRepositoryButton"
import Image from "next/image"
import timeAgo from "@/utils/timeAgo"
import UnlinkDatasetWithRepositoryButton from "./UnlinkDatasetWithRepositoryButton"

export default function LinkedDatasetRepository({ dataset }: { dataset: Required<Dataset> }) {
    return (
        <div className="space-y-1">
            <div className="flex items-center gap-2 pb-1">
                <Image
                    src="/huggingface-icon.svg"
                    alt="Hugging Face Icon"
                    width={25}
                    height={25}
                />
                <h3 className="text-lg font-medium">Linked Huggingface Dataset Repository:</h3>
            </div>
            <div className="flex items-center gap-2">
                <p className="flex items-center gap-2 font-medium">
                    <FolderGit2Icon size={20} />
                    Repository Name:
                </p>
                <a
                    href={`https://huggingface.co/datasets/${dataset.repository.name}`}
                    className="text-muted-foreground hover:underline"
                    target="_blank"
                    rel="noreferrer"
                >
                    {dataset.repository.name}
                </a>
            </div>
            <div className="flex items-center gap-2">
                <p className="flex items-center gap-2 font-medium">
                    <FileTextIcon size={20} />
                    Dataset File Path:
                </p>
                <p className="text-muted-foreground">{dataset.repository.filePath}</p>
            </div>
            <div className="flex items-center gap-2">
                <p className="flex items-center gap-2 font-medium">
                    <FolderSyncIcon size={20} />
                    Last Sync:
                </p>
                <p className="text-muted-foreground">{timeAgo(dataset.repository.syncedAt)}</p>
                <p className="flex items-center gap-1 text-muted-foreground italic">
                    {
                        dataset.repository.isUpToDate ?
                            <>
                                - Up to date
                                <CheckIcon size={16} className="text-green-500" />
                            </> : <>
                                - Has changed
                                <FileWarningIcon size={16} className="text-yellow-500" />
                            </>
                    }
                </p>
            </div>
            <div className="flex gap-2 items-center justify-end">
                <UnlinkDatasetWithRepositoryButton dataset={dataset} />
                <SyncDatasetWithRepositoryButton dataset={dataset} />
            </div>
        </div>
    )
}
