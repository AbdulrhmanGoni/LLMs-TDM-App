import { Card } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

export default function GreetingLoading() {
    return (
        <Card className='flex p-2 gap-2 items-center justify-between w-full relative'>
            <div className='p-1.5 space-y-2 flex-1'>
                <Skeleton className="sm:w-3/4 h-9" />
                <Skeleton className='flex- h-4' />
                <Skeleton className='flex- h-4' />
            </div>
            <Skeleton className="w-[200px] h-[165px]" />
        </Card>
    )
}
