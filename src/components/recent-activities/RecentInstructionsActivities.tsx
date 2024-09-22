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
                (list) => (list.map((act) => {
                    const activity = act as InstructionActivity;
                    return (
                        <RecentInstructionsActivityCard
                            key={
                                activity.activityDate +
                                activity.instruction._id +
                                activity.dataset._id +
                                activity.activity
                            }
                            activity={activity}
                        />
                    )
                }))
            }
        />
    )
}
