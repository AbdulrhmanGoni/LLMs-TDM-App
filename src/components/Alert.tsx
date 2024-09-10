import { cn } from '@/utils/tw-cn';
import {
    AlertOctagonIcon,
    CircleCheckBigIcon,
    InfoIcon,
    LucideIcon,
    TriangleAlertIcon
} from 'lucide-react'

const alertVarians = {
    error: {
        title: "Error",
        borderColor: "border-red-800",
        textColor: "text-red-800",
        Icon: AlertOctagonIcon
    },
    success: {
        title: "Success",
        borderColor: "border-green-600",
        textColor: "text-green-600",
        Icon: CircleCheckBigIcon
    },
    warning: {
        title: "Warning",
        borderColor: "border-yellow-800",
        textColor: "text-yellow-800",
        Icon: TriangleAlertIcon
    },
    info: {
        title: "Info",
        borderColor: "border-blue-500",
        textColor: "text-blue-500",
        Icon: InfoIcon
    },
}

type AlertProps = {
    message: string;
    title?: string;
    className?: string;
    action?: () => void;
    ActionIcon?: LucideIcon;
    variant: keyof typeof alertVarians
}

export default function Alert({ title, message, action, ActionIcon, className, variant }: AlertProps) {

    const chosenVariant = alertVarians[variant]
    const ChosenIcon = alertVarians[variant].Icon

    return (
        <div className={cn('p-3 col-span-full border rounded-md', chosenVariant.borderColor, className)}>
            {
                action && ActionIcon &&
                <ActionIcon
                    size={18}
                    className={`float-end cursor-pointer ${chosenVariant.textColor}`}
                    onClick={action}
                />
            }
            <ChosenIcon className={`inline size-4 me-2 mb-1 tex ${chosenVariant.textColor}`} strokeWidth={3} />
            <h5 className={`${chosenVariant.textColor} text-md inline-block`}>
                {title ? title : chosenVariant.title}
            </h5>
            <p className={`${chosenVariant.textColor} text-sm py-1`}>{message}</p>
        </div>
    )
}
