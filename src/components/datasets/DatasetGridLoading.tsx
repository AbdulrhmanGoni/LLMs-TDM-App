import { Card } from '../ui/card'
import { Skeleton } from '../ui/skeleton'

export default function DatasetGridLoading() {
    return (
        Array.from(new Array(6)).map((n, i) => (
            <Card className="p-4 space-y-3" key={i}>
                <Skeleton className='w-[70%] h-4' />
                <Skeleton className='w-full h-4' />
                <div className='flex gap-2 items-center'>
                    <Skeleton className='w-28 h-4' />
                    <Skeleton className='w-7 h-6 rounded-full' />
                </div>
                <div className='flex gap-3 justify-between'>
                    <Skeleton className='w-32 h-4' />
                    <Skeleton className='w-32 h-4' />
                </div>
            </Card>
        ))
    )
}
