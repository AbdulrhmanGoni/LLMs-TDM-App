"use client"
import RecentDatasetsActivitiesLoading from './RecentDatasetsActivitiesLoading';
import RecentActivitiesList from './RecentActivitiesList';

export default function RecentDatasetsActivities() {
    return (
        <RecentActivitiesList
            LoadingListComponent={<RecentDatasetsActivitiesLoading />}
            resource='datasetsActivities'
        />
    )
}
