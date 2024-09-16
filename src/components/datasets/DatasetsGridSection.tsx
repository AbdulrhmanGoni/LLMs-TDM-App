"use client"
import DatasetsGrid from "@/components/datasets/DatasetsGrid";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import useDatasetsOverview from "@/hook/datasets/useDatasetsOverview";
import { DatabaseIcon, RotateCcwIcon } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import { Separator } from "../ui/separator";

export default function DatasetsGridSection() {

    const { data, isFetching, error, refetch } = useDatasetsOverview()

    return (
        <Card className='w-full h-fit p-3 space-y-3'>
            <div className='flex gap-2 justify-between items-center space-y-0'>
                <CardTitle className='flex gap-2 items-center'>
                    <DatabaseIcon />
                    Datasets
                    <span className="flex items-center gap-1">
                        ( {
                            isFetching ? <Skeleton className="w-4 h-6 translate-y-0.5" /> :
                                error ? (
                                    <>
                                        <p className="text-base text-destructive">Failed to fetch datasets overview</p>
                                        <Button
                                            size="icon"
                                            variant="ghost"
                                            className="gap-1 size-7 text-destructive hover:text-destructive"
                                        >
                                            <RotateCcwIcon onClick={() => refetch()} size={17} />
                                        </Button>
                                    </>
                                ) : data?.totalDatasets
                        } )
                    </span>
                </CardTitle>
            </div>
            <Separator />
            <DatasetsGrid />
        </Card>
    )
}