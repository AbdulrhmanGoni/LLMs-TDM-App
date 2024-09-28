import { FileUpIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import ExportDatasetOptionsForm from "./ExportDatasetOptionsForm";

export default function ExportDatasetButton({ dataset }: { dataset: Dataset }) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    size="icon"
                    variant='secondary'
                    className="size-7 sm:size-8"
                >
                    <FileUpIcon size={20} />
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <ExportDatasetOptionsForm dataset={dataset} />
            </PopoverContent>
        </Popover>
    )
}
