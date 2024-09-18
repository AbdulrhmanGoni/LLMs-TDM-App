"use client"
import DialogWrapper from './DialogWrapper'
import { Button, ButtonProps } from './ui/button'
import { DialogClose, DialogDescription, DialogTitle } from './ui/dialog'
import { ReactNode, useRef } from 'react'

type ActionWithAlertProps = {
    alertTitle: string;
    alertDescription?: string;
    onAgree: () => void;
    onCancel?: () => void;
    trigger: ReactNode;
    agreeButtonProps?: ButtonProps
    cancelButtonProps?: ButtonProps
}

export default function ActionWithAlert({
    onAgree,
    onCancel,
    alertTitle,
    alertDescription,
    trigger,
    agreeButtonProps,
    cancelButtonProps
}: ActionWithAlertProps) {

    const closeButtonRef = useRef<HTMLButtonElement>(null)

    return (
        <DialogWrapper
            trigger={trigger}
            content={
                <>
                    <DialogTitle>{alertTitle}</DialogTitle>
                    <DialogDescription>{alertDescription}</DialogDescription>
                    <div className='flex justify-end gap-3'>
                        <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                                closeButtonRef.current?.click()
                                onCancel?.()
                            }}
                            {...cancelButtonProps}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={() => {
                                closeButtonRef.current?.click()
                                onAgree?.()
                            }}
                            size="sm"
                            variant="default"
                            {...agreeButtonProps}
                        >
                            Continue
                        </Button>
                        <DialogClose ref={closeButtonRef} />
                    </div>
                </>
            }
        />
    )
}
