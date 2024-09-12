import { Card } from '../ui/card'
import { Skeleton } from '../ui/skeleton'

export default function RecentDatasetsActivitiesLoading() {
    return (
        Array.from(new Array(5)).map((n, i) => (
            <Card className="p-3" key={i}>
                <Skeleton className='w-[80%] h-4 mb-2' />
                <Skeleton className='w-full h-4' />
                <div className='flex gap-2 items-center justify-between mt-3'>
                    <Skeleton className='rounded-full w-20 h-6' />
                    <Skeleton className='w-20 h-4' />
                </div>
            </Card>
        ))
    )
}
