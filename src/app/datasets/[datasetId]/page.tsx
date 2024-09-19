import DatasetFullCard from "@/components/datasets/DatasetFullCard";
import InstructionsSection from "@/components/instructions/InstructionsSection";
import DatasetInstructionsContext from "@/contexts/DatasetInstructionsContext";

export default function DatasetPage() {
    return (
        <DatasetInstructionsContext>
            <div className="flex w-full flex-col gap-2">
                <DatasetFullCard />
                <InstructionsSection />
            </div>
        </DatasetInstructionsContext>
    )
}
