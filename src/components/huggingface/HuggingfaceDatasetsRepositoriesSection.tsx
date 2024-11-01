"use Clinet"
import HuggingfaceDatasetsRepositoriesList from "./HuggingfaceDatasetsRepositoriesList"
import { useState } from "react"
import LinkedDatasetRepository from "./LinkedDatasetRepository"
import openHuggingfaceOAuth from "@/lib/openHuggingfaceOAuth"
import useUserHuggingfaceAccount from "@/hook/huggingface/useUserHuggingfaceAccount"
import Alert from "../Alert"
import { Skeleton } from "../ui/skeleton"
import PushDatasetToRepositoryButton from "./PushDatasetToRepositoryButton"

export default function HuggingfaceDatasetsRepositoriesSection({ dataset }: { dataset: Dataset }) {

    const { data: huggingfaceAccount, isLoading, isSuccess } = useUserHuggingfaceAccount();

    const [openDatasetsRepositories, setOpenDatasetsRepositories] = useState(false);

    if (isLoading) return <Skeleton className="h-20 w-full" />

    if (isSuccess && !huggingfaceAccount) {
        return (
            <PushDatasetToRepositoryButton
                onClick={() => { openHuggingfaceOAuth(dataset._id) }}
            />
        )
    }

    if (dataset.repository) {
        return <LinkedDatasetRepository dataset={dataset as Required<Dataset>} />
    }

    return (
        <div>
            {
                openDatasetsRepositories ? (
                    <HuggingfaceDatasetsRepositoriesList
                        dataset={dataset}
                        closeRepositoriesList={() => setOpenDatasetsRepositories(false)}
                    />
                ) :
                    <>
                        {
                            huggingfaceAccount?.emailVerified ?
                                <PushDatasetToRepositoryButton
                                    onClick={() => { setOpenDatasetsRepositories(true) }}
                                /> : huggingfaceAccount && <Alert
                                    variant="warning"
                                    title="Not verified email"
                                    message="Your email of your Huggingface account is not verified. Please verify your email first to be able to push your datasets to Huggingface."
                                    className="mt-3"
                                />
                        }
                    </>
            }
        </div>
    )

}
