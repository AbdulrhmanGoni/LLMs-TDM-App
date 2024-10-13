import { LoaderIcon, TrashIcon } from 'lucide-react'
import ActionWithAlert from '../ActionWithAlert'
import { Button } from '../ui/button'
import useDeleteInstruction from '@/hook/instructions/useDeleteInstruction'

export type DeleteInstructionButtonProps = {
    dataset: Dataset,
    instruction: Instruction
}

export default function DeleteInstructionButton(props: DeleteInstructionButtonProps) {

    const { deleteTheInstruction, isPending } = useDeleteInstruction(props)

    return (
        <ActionWithAlert
            alertTitle='Deleting an instruction'
            alertDescription='Are you sure you want to delete this instruction?'
            onAgree={() => {
                deleteTheInstruction();
            }}
            trigger={
                <Button
                    size="icon"
                    variant="destructive"
                    className="size-8"
                    disabled={isPending}
                >
                    {
                        isPending ? <LoaderIcon size={17} className="animate-spin" />
                            : <TrashIcon size={17} />
                    }
                </Button>
            }
        />
    )
}
