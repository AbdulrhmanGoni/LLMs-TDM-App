"use client"
import useDatasetPage from "@/hook/datasets/useDatasetPage";
import AddInstructionsForm from "./AddInstructionsForm";
import InstructionFullCard from "@/components/instructions/InstructionFullCard";
import InstructionsList from "@/components/instructions/InstructionsList";
import { Separator } from "@/components/ui/separator";
import { NotepadTextIcon, ScrollTextIcon } from "lucide-react";

export default function InstructionsSection() {

    const { dataset, addInstructionMode } = useDatasetPage();

    if (dataset) {
        if (addInstructionMode) {
            return <AddInstructionsForm dataset={dataset} />
        }
        return (
            <div className="grid sm:grid-cols-2 gap-2 border p-2 pt-0 rounded-md">
                <div>
                    <h3 className="flex items-center gap-2 text-xl py-4">
                        <ScrollTextIcon />
                        Instructions
                    </h3>
                    <Separator />
                    <InstructionsList />
                </div>
                <div>
                    <h3 className="flex items-center gap-2 text-xl py-4">
                        <NotepadTextIcon />
                        Selected Instruction
                    </h3>
                    <Separator />
                    <InstructionFullCard />
                </div>
            </div>
        )
    }
}
