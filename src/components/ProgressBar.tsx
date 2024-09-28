import { cn } from "@/utils/tw-cn";
import { CircleCheckBigIcon } from "lucide-react";

type ProgressBarProps = {
    progress: number,
    className?: string
}

export default function ProgressBar({ progress, className }: ProgressBarProps) {
    return (
        <div className={cn("flex gap-2 items-center", className)}>
            <div
                className="flex w-full h-2 bg-muted rounded-full overflow-hidden"
                role="progressbar"
            >
                <div
                    className={
                        cn(
                            progress === 100 ? "bg-green-500" : "bg-primary",
                            "flex flex-col justify-center rounded-full overflow-hidden text-xs text-white text-center whitespace-nowrap transition-all duration-500",
                        )
                    }
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
            {progress === 100 ? <CircleCheckBigIcon className="text-green-500" size={15} /> : `${progress}%`}
        </div>
    )
}
