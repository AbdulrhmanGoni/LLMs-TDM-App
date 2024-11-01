import { FolderGit2Icon } from "lucide-react";
import DialogWrapper from "../DialogWrapper";
import PushDatasetToRepositoryForm from "./PushDatasetToRepositoryForm";

type HuggingfaceDatasetsRepositoriesListItemProps = {
    HFDatasetRepository: HuggingfaceDatasetRepositoryData;
    dataset: Dataset;
    closeRepositoriesList: () => void;
}

export default function HuggingfaceDatasetsRepositoriesListItem(
    props: HuggingfaceDatasetsRepositoriesListItemProps
) {
    return (
        <DialogWrapper
            content={({ closeDialog }) => {
                return (
                    <PushDatasetToRepositoryForm
                        {...props}
                        closeForm={() => {
                            props.closeRepositoriesList()
                            closeDialog()
                        }}
                    />
                )
            }}
            trigger={
                <div
                    key={props.HFDatasetRepository.id}
                    className="flex items-center gap-2 px-2 py-1 rounded-md border hover:bg-muted transition-colors cursor-pointer"
                >
                    <FolderGit2Icon size={20} />
                    {props.HFDatasetRepository.name}
                </div>
            }
        />
    )
}
