"use client"
import { Card } from '../ui/card'
import { CalendarDaysIcon, DatabaseIcon, EyeIcon, MessageCircleMoreIcon, SquarePlusIcon } from 'lucide-react'
import EditDatasetButton from './EditDatasetButton'
import timeAgo from '@/utils/timeAgo'
import { Separator } from '../ui/separator'
import { Badge } from '../ui/badge'
import { useRouter } from 'next/navigation'
import { Button } from '../ui/button'
import useDatasetPage from '@/hook/datasets/useDatasetPage'
import DatasetFullCardLoading from './DatasetFullCardLoading'
import DatasetFullCardError from './DatasetFullCardError'

export default function DatasetFullCard() {

    const { back } = useRouter();
    const {
        dataset,
        datasetLoading,
        datasetError,
        refetchDataset,
        setAddInstructionMode,
        addInstructionMode
    } = useDatasetPage()

    if (datasetLoading) {
        return <DatasetFullCardLoading />
    }

    if (datasetError) {
        return <DatasetFullCardError error={datasetError} refetch={refetchDataset} />
    }

    return (
        dataset &&
        <Card className="flex flex-col w-full flex-wrap lg:flex-nowrap gap-3 px-3 py-4">
            <div className="flex flex-wrap gap-3 justify-between">
                <div className='space-y-2'>
                    <div className="flex gap-2 items-center">
                        <DatabaseIcon size={25} />
                        <h1 className="text-xl sm:text-2xl text-primary">
                            {dataset.name}
                        </h1>
                    </div>
                    <p className="text-muted-foreground">
                        {dataset.description}
                    </p>
                </div>
                <div className="flex gap-2 ml-auto">
                    <EditDatasetButton dataset={dataset} />
                </div>
            </div>
            <Separator />
            <div className="flex gap-3 items-center font-medium">
                <MessageCircleMoreIcon />
                <p>Instructions:</p>
                <Badge>{dataset.instructionsCount}</Badge>
                <Button
                    size='sm'
                    className="ms-auto gap-1.5 px-2 h-7 sm:h-8 sm:px-3"
                    onClick={() => { setAddInstructionMode(state => !state) }}
                >
                    {addInstructionMode ? <EyeIcon size={16} /> : <SquarePlusIcon size={16} />}
                    <p className='hidden sm:inline'>
                        {addInstructionMode ? "Show Instructions" : "Add Instructions"}
                    </p>
                </Button>
            </div>
            <Separator />
            <div className="flex gap-3">
                <CalendarDaysIcon />
                <p className="text-sm sm:text-base text-muted-foreground">
                    Created: {new Date(dataset.createdAt).toDateString()}
                </p>
                -
                <p className="text-sm sm:text-base text-muted-foreground">
                    Last modified: {timeAgo(dataset.updatedAt)}
                </p>
            </div>
        </Card>
    )
}
