"use client"
import { useRouter } from 'next/navigation'
import { Badge } from '../ui/badge'
import { Card } from '../ui/card'
import timeAgo from '@/utils/timeAgo'
import useDatasetPageContext from '@/hook/datasets/useDatasetPageContext'

export default function RecentDatasetsActivityCard({ activity }: { activity: DatasetActivity }) {

    const { push } = useRouter()
    const { setDataset } = useDatasetPageContext();
    const isNew = activity.activity === "New Resource"

    return (
        <Card
            className="p-3 hover:bg-muted transition-colors cursor-pointer"
            onClick={() => {
                setDataset(activity.dataset)
                push(`/datasets/${activity.dataset._id}`)
            }}
        >
            <p className='text-primary text-ellipsis text-nowrap overflow-hidden'>
                {activity.dataset.name}
            </p>
            <p className='text-muted-foreground text-sm text-ellipsis text-nowrap overflow-hidden'>
                {activity.dataset.description}
            </p>
            <div className='flex gap-2 items-center mt-3'>
                <Badge variant={isNew ? "success" : "default"} className='py-1'>
                    {isNew ? "New" : "Modified"}
                </Badge>
                <span className='text-sm text-muted-foreground ms-auto'>
                    {timeAgo(activity.activityDate)}
                </span>
            </div>
        </Card>
    )
}
