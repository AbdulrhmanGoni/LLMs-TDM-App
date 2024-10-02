"use client"
import { TrashIcon } from 'lucide-react'
import { Button, ButtonProps } from '../ui/button'
import useDeleteDataset from '@/hook/datasets/useDeleteDataset'
import ActionWithAlert from '../ActionWithAlert'
import LoadingOverlay from '../LoadingOverlay'
import React from 'react'

type DeleteDatasetButton = {
    dataset: Dataset;
    alertTitle: string;
    alertDescription?: string;
    ButtonProps?: ButtonProps;
    onDelete?: () => void;
}

export default function DeleteDatasetButton({
    dataset,
    alertTitle,
    alertDescription,
    onDelete,
    ButtonProps
}: DeleteDatasetButton) {

    const { deleteDataset, isPending } = useDeleteDataset()

    return (
        <>
            <ActionWithAlert
                alertTitle={alertTitle}
                alertDescription={alertDescription}
                onAgree={() => {
                    deleteDataset(dataset)
                    onDelete?.()
                }}
                trigger={
                    <Button
                        size="icon"
                        variant="destructive"
                        className="size-7 sm:size-8"
                        {...ButtonProps}
                    >
                        <TrashIcon size={17} />
                    </Button>
                }
            />
            {isPending && <LoadingOverlay />}
        </>
    )
}
