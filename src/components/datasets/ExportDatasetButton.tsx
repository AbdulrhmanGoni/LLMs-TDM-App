import { FileUpIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import ExportDatasetOptionsForm from "./ExportDatasetOptionsForm";
import { useRef } from "react";

export default function ExportDatasetButton({ dataset }: { dataset: Dataset }) {

    const popoverTriggerRef = useRef<HTMLButtonElement>(null)

    function closeForm() {
        if (popoverTriggerRef) {
            popoverTriggerRef.current?.click()
        }
    }

    return (
        <Popover>
            <PopoverTrigger asChild ref={popoverTriggerRef}>
                <Button
                    size="icon"
                    variant='secondary'
                    className="size-7 sm:size-8"
                >
                    <FileUpIcon size={20} />
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <ExportDatasetOptionsForm
                    dataset={dataset}
                    closeForm={closeForm}
                />
            </PopoverContent>
        </Popover>
    )
}
