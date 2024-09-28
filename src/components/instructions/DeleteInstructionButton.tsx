import { TrashIcon } from 'lucide-react'
import ActionWithAlert from '../ActionWithAlert'
import { Button } from '../ui/button'
import useDeleteInstruction from '@/hook/instructions/useDeleteInstruction'

export type DeleteInstructionButtonProps = {
    dataset: Dataset,
    instruction: Instruction
}

export default function DeleteInstructionButton(props: DeleteInstructionButtonProps) {

    const { deleteTheInstruction } = useDeleteInstruction(props)

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
                >
                    <TrashIcon size={17} />
                </Button>
            }
        />
    )
}
