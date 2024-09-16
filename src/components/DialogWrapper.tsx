import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"
import { ReactNode } from "react"

type DialogWrapperProps = {
    content: ReactNode;
    trigger: ReactNode;
}

export default function DialogWrapper({ content, trigger }: DialogWrapperProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                {trigger}
            </DialogTrigger>
            <DialogContent>
                {content}
            </DialogContent>
        </Dialog>
    )
}
