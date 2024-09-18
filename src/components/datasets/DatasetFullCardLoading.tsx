import { Card } from '../ui/card'
import { Separator } from '../ui/separator'
import { Skeleton } from '../ui/skeleton'

export default function DatasetFullCardLoading() {
    return (
        <Card className="flex flex-col w-full flex-wrap lg:flex-nowrap gap-3 px-3 py-4">
            <div className="flex flex-wrap gap-3 justify-between">
                <div className='space-y-2 flex-1'>
                    <div className="flex gap-2 items-center">
                        <Skeleton className='size-8' />
                        <Skeleton className='w-[75%] h-8' />
                    </div>
                    <Skeleton className='w-full h-5' />
                </div>
                <div className="flex gap-2">
                    <Skeleton className='size-7 sm:size-8' />
                    <Skeleton className='size-7 sm:size-8' />
                    <Skeleton className='size-7 sm:size-8' />
                </div>
            </div>
            <Separator />
            <div className="flex gap-3 items-center font-medium">
                <Skeleton className='size-7' />
                <Skeleton className='w-28 h-5' />
                <Skeleton className='w-8 h-6 rounded-full' />
                <Skeleton className='ms-auto size-7 sm:w-36 sm:h-8' />
            </div>
            <Separator />
            <div className="flex gap-3 items-center">
                <Skeleton className='size-7' />
                <Skeleton className='w-28 h-5' />
                <Skeleton className='w-28 h-5' />
            </div>
        </Card>
        // <Card className="flex w-full flex-wrap lg:flex-nowrap gap-3 px-3 py-4 justify-between">
        //     <div className="space-y-2 w-full">

        //         
        //         <Skeleton className='w-40 h-5' />
        //     </div>
        //     <div className="flex lg:flex-col items-end gap-2 justify-between">
        //         <div className="flex gap-2">
        //             <Skeleton className='w-9 h-9' />
        //             <Skeleton className='w-9 h-9' />
        //         </div>
        //         <Skeleton className='w-40 h-5' />
        //     </div>
        // </Card>
    )
}
