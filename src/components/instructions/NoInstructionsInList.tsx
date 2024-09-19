"use client"
import { PackageOpenIcon, PlusSquareIcon } from "lucide-react";
import { Button } from "../ui/button";
import useDatasetPageContext from "@/hook/datasets/useDatasetPageContext";

export default function NoInstructionsInList() {

  const { setAddInstructionMode } = useDatasetPageContext()

  return (
    <div className="flex flex-col gap-3 items-center justify-center col-span-full h-full">
      <PackageOpenIcon size={55} />
      <h2 className="text-2xl">No Instructions</h2>
      <p className="text-muted-foreground">
        There is no instructions in this dataset
      </p>
      <Button
        size="sm"
        onClick={() => setAddInstructionMode(true)}
        className="gap-1"
      >
        <PlusSquareIcon size={17} />
        Add Instructions
      </Button>
    </div>
  )
}