"use client"
import RecentInstructionsActivitiesLoading from './RecentInstructionsActivitiesLoading'
import RecentActivitiesList from './RecentActivitiesList'

export default function RecentInstructionsActivities() {

    return (
        <RecentActivitiesList
            LoadingListComponent={<RecentInstructionsActivitiesLoading />}
            resource='instructionsActivities'
        />
    )
}
