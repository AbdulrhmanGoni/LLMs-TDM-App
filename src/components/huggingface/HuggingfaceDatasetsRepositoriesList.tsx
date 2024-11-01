"use Clinet"
import useHuggingfaceDatasetsRepositories from "@/hook/huggingface/useHuggingfaceDatasetsRepositories"
import HuggingfaceDatasetsRepositoriesLoading from "./HuggingfaceDatasetsRepositoriesLoading"
import HuggingfaceDatasetsRepositoriesListItem from "./HuggingfaceDatasetsRepositoriesListItem"
import Image from "next/image"
import { Button } from "../ui/button"
import { FolderXIcon, XIcon } from "lucide-react"
import CreateDatasetRepositoryButton from "./CreateDatasetRepositoryButton"

type HuggingfaceDatasetsRepositoriesListProps = {
    dataset: Dataset;
    closeRepositoriesList: () => void;
}

export default function HuggingfaceDatasetsRepositoriesList(
    { dataset, closeRepositoriesList }: HuggingfaceDatasetsRepositoriesListProps
) {

    const { data, isFetching } = useHuggingfaceDatasetsRepositories(dataset)

    return (
        <div className="space-y-2">
            <div className="flex gap-2">
                <Image
                    src="/huggingface-icon.svg"
                    alt="Hugging Face Icon"
                    width={25}
                    height={25}
                    className="h-[25px] mt-1"
                />
                <div>
                    <p className="text-lg font-medium">
                        Your Huggingface datasets repositories {data?.length ? `( ${data.length} )` : undefined} <br />
                    </p>
                    <p className="text-sm text-muted-foreground mb-3">
                        Choose one of these repositories to push your dataset into it.
                    </p>
                </div>
            </div>
            <div className="space-y-2">
                {
                    isFetching ? <HuggingfaceDatasetsRepositoriesLoading />
                        : data?.length ?
                            data.map((repo) =>
                                <HuggingfaceDatasetsRepositoriesListItem
                                    key={repo.id}
                                    HFDatasetRepository={repo}
                                    dataset={dataset}
                                    closeRepositoriesList={closeRepositoriesList}
                                />
                            )
                            :
                            <div className="text-muted-foreground flex gap-2 items-center border p-2 rounded">
                                <FolderXIcon size={20} />
                                <p>There are no repositories in your huggingface account</p>
                            </div>
                }
            </div>
            <div className="flex gap-2 justify-end">
                <Button
                    variant="outline"
                    size="sm"
                    className="gap-2"
                    onClick={closeRepositoriesList}
                >
                    <XIcon size={17} />
                    Close
                </Button>
                <CreateDatasetRepositoryButton />
            </div>
        </div>
    )
}
