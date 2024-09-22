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
                (list) => (list.map((act) => {
                    const activity = act as DatasetActivity;
                    return (
                        <RecentDatasetsActivityCard
                            key={activity.activityDate + activity.dataset._id + activity.activity}
                            activity={act as DatasetActivity}
                        />
                    )
                }))
            }
        />
    )
}
