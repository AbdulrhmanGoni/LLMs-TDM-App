"use client"
import RecentInstructionsActivitiesLoading from './RecentInstructionsActivitiesLoading'
import RecentInstructionsActivityCard from './RecentInstructionsActivityCard'
import RecentActivitiesList from './RecentActivitiesList'

export default function RecentInstructionsActivities() {
    return (
        <RecentActivitiesList
            LoadingListComponent={<RecentInstructionsActivitiesLoading />}
            resource='instructionsActivities'
            ActivityCard={
                (list) => (list.map((act) => (
                    <RecentInstructionsActivityCard activity={act as InstructionActivity} />
                )))
            }
        />
    )
}
