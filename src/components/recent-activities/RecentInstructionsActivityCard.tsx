"use client"
import {
    DatabaseIcon,
    MessageCircleCodeIcon,
    MessageCircleQuestionIcon,
    MessageCircleReplyIcon
} from "lucide-react";
import { Badge } from "../ui/badge";
import { Card } from "../ui/card";
import timeAgo from "@/utils/timeAgo";
import { useRouter } from "next/navigation";
import { cn } from "@/utils/tw-cn";

export default function RecentInstructionsActivityCard({ activity }: { activity: InstructionActivity }) {

    const { push } = useRouter()

    const textClasses = "line-clamp-1"

    const isNew = activity.activity === "New Resource"
    const isDeleted = activity.activity === "Deletion"

    return (
        <Card
            className="flex flex-col gap-2 p-3 text-nowrap transition-all group hover:bg-accent cursor-pointer"
            onClick={() => {
                push(`/datasets/${activity.dataset._id}`)
            }}
        >
            <p className={
                cn(
                    textClasses,
                    "font-semibold text-sm flex items-center gap-1 text-muted-foreground",
                    !activity.instruction.systemMessage && "line-through"
                )
            }>
                <MessageCircleCodeIcon className="size-4 sm:size-5" />
                {
                    activity.instruction.systemMessage ?
                        activity.instruction.systemMessage.substring(0, 60) : "No System Message"
                }
            </p>
            <p className={`text-xs sm:text-sm font-medium ${textClasses} flex items-center gap-1`}>
                <MessageCircleQuestionIcon className="size-4 sm:size-5" />
                {activity.instruction.question.substring(0, 100)}
            </p>
            <p className={`text-xs sm:text-sm ${textClasses} flex items-center gap-1`}>
                <MessageCircleReplyIcon className="size-4 sm:size-5" />
                {activity.instruction.answer.substring(0, 300)}
            </p>
            <hr className="group-hover:border-white/10 transition-colors" />
            <div className="flex justify-end">
                <div className="flex items-center me-auto gap-2">
                    <DatabaseIcon size={18} />
                    <p className={`${textClasses}`}>
                        {activity.dataset.name}
                    </p>
                </div>
                <Badge
                    variant={isNew ? "success" : isDeleted ? "destructive" : "default"}
                    className='py-1 text-sm'
                >
                    {isNew ? "Added" : isDeleted ? "Deleted" : "Modified"}: {timeAgo(activity.activityDate)}
                </Badge>
            </div>
        </Card>
    )
}
