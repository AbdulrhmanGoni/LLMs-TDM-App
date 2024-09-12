import { WithErrorAndRefetch } from '@/lib/FetchError'
import { OctagonXIcon, RotateCcwIcon } from 'lucide-react'
import { Button } from '../ui/button'

export default function RecentActivitiesError({ refetch, error }: WithErrorAndRefetch) {
    return (
        <div className="flex flex-col gap-3 flex-1 items-center justify-center col-span-full">
            <OctagonXIcon size={55} className="text-destructive" />
            <h2 className="text-xl">Recent Activities Error</h2>
            <p className="text-muted-foreground">
                An Error occurred while fetching the recent activities: <br />
                {error?.message}
            </p>
            <Button
                size="sm"
                onClick={() => refetch()}
                className="gap-1"
            >
                <RotateCcwIcon size={17} />
                Refetch
            </Button>
        </div>
    )
}
