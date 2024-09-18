import { WithErrorAndRefetch } from '@/lib/FetchError'
import { OctagonAlert, RotateCcwIcon } from 'lucide-react'
import { Card } from '../ui/card'
import { Button } from '../ui/button'

export default function DatasetFullCardError({ error, refetch }: WithErrorAndRefetch) {
    return (
        <Card className="flex flex-col w-full gap-3 px-3 py-4">
            <div className='flex gap-2 items-center text-xl sm:text-2xl'>
                <OctagonAlert className='text-destructive' />
                <h1 className='flex-1'>Failed to fetch the dataset</h1>
                <Button
                    variant="ghost"
                    size="icon"
                    className='size-8'
                    onClick={refetch}
                >
                    <RotateCcwIcon className='size-5' />
                </Button>
            </div>
            <p className='text-muted-foreground'>{error?.message}</p>
        </Card>
    )
}
