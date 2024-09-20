"use client"
import useRecentActivities from '@/hook/recent-activities/useRecentActivities';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import RecentDatasetsActivityCard from './RecentDatasetsActivityCard'
import { DatabaseZapIcon } from 'lucide-react'
import RecentDatasetsActivitiesError from './RecentActivitiesError';
import { Separator } from '../ui/separator';
import { JSX } from 'react';

type RecentActivitiesListProps = {
    resource: keyof Activities
    LoadingListComponent: JSX.Element
}

export default function RecentActivitiesList({ resource, LoadingListComponent }: RecentActivitiesListProps) {

    const { data, isFetching, error, refetch } = useRecentActivities();

    const activitiesList = data?.[resource];
    const resourceName = resource === "datasetsActivities" ? "Datasets" : "Instructions";

    return (
        <Card className='w-full h-full p-3'>
            <CardHeader className='flex-row gap-2 justify-between items-center space-y-0 pt-3 pb-6 px-0'>
                <CardTitle className='flex gap-2 items-center'>
                    <DatabaseZapIcon />
                    Recent {resourceName} Activities
                </CardTitle>
            </CardHeader>
            <Separator className='mb-2' />
            <CardContent className="flex flex-col gap-3 p-0 pe-1 h-[425px] sm:h-[550px] overflow-auto">
                {
                    isFetching ? LoadingListComponent
                        : error ? <RecentDatasetsActivitiesError error={error} refetch={refetch} /> :
                            activitiesList?.length ?
                                activitiesList.map((act) =>
                                    <RecentDatasetsActivityCard key={crypto.randomUUID()} activity={act} />
                                ) : (
                                    <p className='text-center p-4 text-muted-foreground h-full'>
                                        No Recent {resourceName} Activities
                                    </p>
                                )
                }
            </CardContent>
        </Card>
    )
}
