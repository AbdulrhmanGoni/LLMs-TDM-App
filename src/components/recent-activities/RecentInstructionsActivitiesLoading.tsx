import { Card } from '../ui/card'
import { Separator } from '../ui/separator'
import { Skeleton } from '../ui/skeleton'

export default function RecentInstructionsActivitiesLoading() {
    return (
        Array.from(new Array(5)).map((n, i) => (
            <Card className="p-3 space-y-2" key={i}>
                <div className='flex gap-1 w-full items-center'>
                    <Skeleton className='w-5 h-5' />
                    <Skeleton className='w-[70%] h-4' />
                </div>
                <div className='flex gap-1 w-full items-center'>
                    <Skeleton className='w-5 h-5' />
                    <Skeleton className='w-full h-4' />
                </div>
                <div className='flex gap-1 w-full items-center'>
                    <Skeleton className='w-5 h-5' />
                    <Skeleton className='w-full h-4' />
                </div>
                <Separator />
                <div className='flex gap-2 items-center justify-between mt-3'>
                    <div className='flex gap-1 w-full items-center'>
                        <Skeleton className='w-5 h-5' />
                        <Skeleton className='w-48 h-5' />
                    </div>
                    <Skeleton className='w-40 h-6 rounded-full' />
                </div>
            </Card>
        ))
    )
}
