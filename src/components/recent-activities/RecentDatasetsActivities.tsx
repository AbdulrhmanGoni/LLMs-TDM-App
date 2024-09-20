"use client"
import RecentDatasetsActivitiesLoading from './RecentDatasetsActivitiesLoading';
import RecentDatasetsActivityCard from './RecentDatasetsActivityCard'
import RecentActivitiesList from './RecentActivitiesList';

export default function RecentDatasetsActivities() {
    return (
        <RecentActivitiesList
            LoadingListComponent={<RecentDatasetsActivitiesLoading />}
            resource='datasetsActivities'
            ActivityCard={
                (list) => (list.map((act) => (
                    <RecentDatasetsActivityCard activity={act as DatasetActivity} />
                )))
            }
        />
    )
}
