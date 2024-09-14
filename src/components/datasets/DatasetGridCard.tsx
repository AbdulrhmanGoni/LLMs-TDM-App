"use client"
import { useRouter } from 'next/navigation'
import { Badge } from '../ui/badge'
import { Card } from '../ui/card'
import timeAgo from '@/utils/timeAgo'
import useDatasetPageContext from '@/hook/datasets/useDatasetPageContext'

export default function DatasetGridCard({ dataset }: { dataset: Dataset }) {

    const { push } = useRouter()
    const { setDataset } = useDatasetPageContext();

    return (
        <Card
            className="p-4 space-y-2 hover:bg-muted transition-colors cursor-pointer"
            onClick={() => {
                setDataset(dataset)
                push(`datasets/${dataset._id}`)
            }}
        >
            <p className='text-primary'>
                {dataset.name}
            </p>
            <p className='text-muted-foreground text-sm'>
                {dataset.description}
            </p>
            <span>Instructions</span>
            <Badge className='ms-2 py-1'>{dataset.instructionsCount}</Badge>
            <div className='flex gap-3 justify-between'>
                <span className='text-sm text-muted-foreground'>
                    Created: {timeAgo(dataset.createdAt)}
                </span>
                <span className='text-sm text-muted-foreground'>
                    Last modified: {timeAgo(dataset.updatedAt)}
                </span>
            </div>
        </Card>
    )
}
