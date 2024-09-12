"use client"
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { CalendarClockIcon } from 'lucide-react'
import useRecentActivities from '@/hook/recent-activities/useRecentActivities'
import RecentInstructionsActivityCard from './RecentInstructionsActivityCard'
import RecentInstructionsActivitiesLoading from './RecentInstructionsActivitiesLoading'
import RecentActivitiesError from './RecentActivitiesError'
import { Separator } from '../ui/separator'

export default function RecentInstructionsActivities() {

    const { data, isFetching, error, refetch } = useRecentActivities();

    return (
        <Card className='w-full p-3'>
            <CardHeader className='flex-row gap-2 justify-between items-center space-y-0 pt-3 pb-6 px-0'>
                <CardTitle className='flex gap-2 items-center'>
                    <CalendarClockIcon />
                    Recent Instructions Activities
                </CardTitle>
            </CardHeader>
            <Separator className='mb-2' />
            <CardContent className="flex flex-col gap-3 p-0 pe-1 h-[425px] sm:h-[550px] overflow-auto">
                {
                    isFetching ? <RecentInstructionsActivitiesLoading /> :
                        error ? <RecentActivitiesError error={error} refetch={refetch} /> :
                            data?.instructionsActivities.length ?
                                data?.instructionsActivities.map((act) =>
                                    <RecentInstructionsActivityCard key={crypto.randomUUID()} activity={act} />
                                ) : (
                                    <p className='p-4 text-muted-foreground h-full flex items-center justify-center'>
                                        No recent instructions activities
                                    </p>
                                )
                }
            </CardContent>
        </Card>
    )
}
