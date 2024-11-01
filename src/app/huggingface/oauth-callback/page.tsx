"use client"
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import useHuggingfaceOAuth from "@/hook/huggingface/useHuggingfaceOAuth";
import { DatabaseIcon, HomeIcon, Link2Icon, TriangleIcon } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

export default function page() {

    const { push } = useRouter();
    const searchParams = useSearchParams();
    const { isFetching, error, isSuccess } = useHuggingfaceOAuth(searchParams);

    const errorType = searchParams.get("error") || error?.error?.errorTitle || "Something went wrong";
    const errorDescription = searchParams.get("error_description") || error?.error?.message;
    const datasetId = searchParams.get("state");

    return (
        <div className="flex-1">
            <div className='flex flex-col gap-4 text-center items-center w-full h-full justify-center'>
                <div className="flex items-center gap-3">
                    <Image
                        src="/huggingface-icon.svg"
                        height={180} width={180}
                        alt="Huggingface Logo"
                        className="size-20 sm:size-44 select-none"
                    />
                    <Link2Icon className="size-5 sm:size-10" />
                    <TriangleIcon className="size-20 sm:size-44 fill-red-600 stroke-red-600 rotate-180" />
                </div>
                {
                    isFetching ? <Skeleton className="w-full sm:max-w-[500px] max-w-[300px] h-8" /> :
                        <h2 className='text-2xl sm:text-3xl'>
                            {isSuccess ? "Your Huggingface Account Linked Successfuly" : errorType}
                        </h2>
                }
                {
                    isFetching ? (
                        <div className="flex flex-col items-center gap-2 w-full">
                            <Skeleton className="w-full sm:max-w-[500px] max-w-[300px] h-4" />
                            <Skeleton className="w-full sm:max-w-[400px] max-w-[200px] h-4" />
                            <Skeleton className="w-full sm:max-w-[300px] max-w-[100px] h-4" />
                        </div>
                    ) : (
                        <p className='text-muted-foreground max-w-96 sm:max-w-[500px] sm:text-lg'>
                            {
                                isSuccess ? "You can go to dataset page and link the dataset with your repositories on Huggingface hub"
                                    : errorDescription
                            }
                        </p>
                    )
                }
                <div className="flex gap-3 items-center">
                    {
                        isFetching ? <Skeleton className="w-40 h-7 sm:h-9" /> :
                            <Button
                                onClick={() => {
                                    push(datasetId ? `/datasets/${datasetId}`: "/")
                                }}
                                size="sm"
                                className="gap-1 h-7 sm:h-9"
                            >
                                {datasetId ? <DatabaseIcon size={17} /> : <HomeIcon size={17} />}
                                {datasetId ? "Go to dataset page" : "Back to home page"}
                            </Button>
                    }
                </div>
            </div>
        </div>
    );
}