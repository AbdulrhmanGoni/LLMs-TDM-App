"use client"
import { EditIcon } from 'lucide-react'
import { Button } from '../ui/button'
import DialogWrapper from '../DialogWrapper'
import UpdateDatasetForm from './UpdateDatasetForm'

type EditDatasetButton = {
    dataset: Dataset;
}

export default function EditDatasetButton({ dataset }: EditDatasetButton) {
    return (
        <DialogWrapper
            content={<UpdateDatasetForm dataset={dataset} />}
            trigger={
                <Button size="icon" className="size-7 sm:size-8">
                    <EditIcon size={17} />
                </Button>
            } />
    )
}
