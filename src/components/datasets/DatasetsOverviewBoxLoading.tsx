import { Card } from '../ui/card'
import { Skeleton } from '../ui/skeleton'

export default function DatasetOverviewBoxLoading() {
    return (
        <Card className='flex flex-col justify-center flex-1 h-full p-6 cursor-pointer'>
            <div className="flex flex-row items-center justify-between space-y-0 pb-3">
                <Skeleton className="w-36 h-6" />
                <Skeleton className="h-6 w-6" />
            </div>
            <Skeleton className="h-6 w-5 mb-3" />
            <Skeleton className="h-4 w-48 rounded-sm" />
        </Card>
    )
}
