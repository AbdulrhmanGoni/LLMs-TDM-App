"use client"
import { useRouter } from 'next/navigation'
import { Badge } from '../ui/badge'
import { Card } from '../ui/card'
import timeAgo from '@/utils/timeAgo'

export default function RecentDatasetsActivityCard({ activity }: { activity: DatasetActivity }) {

    const { push } = useRouter()
    const isNew = activity.activity === "New Resource"
    const isDeleted = activity.activity === "Deletion"

    return (
        <Card
            className={`p-3 hover:bg-muted transition-colors ${isDeleted ? "cursor-default" : "cursor-pointer"}`}
            onClick={() => {
                if (!isDeleted) {
                    push(`/datasets/${activity.dataset?._id}`)
                }
            }}
        >
            <p className='text-primary text-ellipsis text-nowrap overflow-hidden'>
                {activity.dataset.name}
            </p>
            <p className='text-muted-foreground text-sm text-ellipsis text-nowrap overflow-hidden'>
                {activity.dataset.description}
            </p>
            <div className='flex gap-2 items-center mt-3'>
                <Badge variant={isNew ? "success" : isDeleted ? "destructive" : "default"} className='py-1'>
                    {isNew ? "New" : isDeleted ? "Deleted" : "Modified"}
                </Badge>
                <span className='text-sm text-muted-foreground ms-auto'>
                    {timeAgo(activity.activityDate)}
                </span>
            </div>
        </Card>
    )
}
