import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"
import { ReactNode, useRef } from "react"

type DialogWrapperProps = {
    content: ((params: { closeDialog: () => void }) => ReactNode) | ReactNode;
    trigger: ReactNode;
}

export default function DialogWrapper({ content, trigger }: DialogWrapperProps) {

    const closeButtonRef = useRef<HTMLButtonElement>(null)

    function closeDialog() {
        closeButtonRef.current?.click()
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                {trigger}
            </DialogTrigger>
            <DialogContent
                aria-describedby={undefined}
                closeButtonRef={closeButtonRef}
            >
                {typeof content === "function" ? content({ closeDialog }) : content}
            </DialogContent>
        </Dialog>
    )
}
