"use client"
import { Separator } from "@/components/ui/separator"
import {
  EditIcon,
  MessageCircleCodeIcon,
  MessageCircleQuestionIcon,
  MessageCircleReplyIcon,
} from "lucide-react"
import { Button } from "../ui/button"
import { cn } from "@/utils/tw-cn"
import timeAgo from "@/utils/timeAgo"
import UpdateInstructionForm from "./UpdateInstructionsForm"
import useDatasetPage from "@/hook/datasets/useDatasetPage"
import DeleteInstructionButton from "./DeleteInstructionButton"

export default function InstructionFullCard() {

  const {
    dataset,
    selectedInstruction,
    editInstructionMode,
    setEditInstructionMode
  } = useDatasetPage();

  if (selectedInstruction && dataset) {
    if (editInstructionMode) {
      return (
        <UpdateInstructionForm
          selectedInstruction={selectedInstruction}
          dataset={dataset}
          closeEditMode={() => setEditInstructionMode(false)}
        />
      )
    } else {
      return (
        <div className="flex flex-1 flex-col h-[500px] overflow-auto pe-1">
          <div className="flex items-center p-3 px-4 gap-3">
            <Button size="icon" className="size-8">
              <EditIcon size={17} onClick={() => setEditInstructionMode(true)} />
            </Button>
            <DeleteInstructionButton
              datasetId={dataset._id}
              instructionId={selectedInstruction._id}
            />
            <div className="ml-auto text-end text-sm text-muted-foreground">
              <p>Created: {timeAgo(selectedInstruction.createdAt)}</p>
              <p>Last modified: {timeAgo(selectedInstruction.updatedAt)}</p>
            </div>
          </div>
          <Separator />
          <div className="whitespace-pre-wrap p-4 text-sm">
            <p className={
              cn(
                "font-semibold text-sm flex gap-1 text-muted-foreground",
                selectedInstruction.systemMessage ? "" : "line-through"
              )
            }>
              <MessageCircleCodeIcon className="size-4 sm:size-5" />
              {
                selectedInstruction.systemMessage ?
                  selectedInstruction.systemMessage : "No System Message"
              }
            </p>
          </div>
          <Separator />
          <div className="whitespace-pre-wrap p-4 text-sm">
            <p className="font-medium flex gap-1">
              <MessageCircleQuestionIcon className="size-4 sm:size-5" />
              {selectedInstruction.question}
            </p>
          </div>
          <Separator />
          <div className="whitespace-pre-wrap p-4 text-sm">
            <p className="font-medium flex gap-1">
              <MessageCircleReplyIcon className="size-4 sm:size-5" />
              {selectedInstruction.answer}
            </p>
          </div>
        </div>
      )
    }
  } else {
    return (
      <div className="p-8 text-center text-muted-foreground">
        No selected instruction
      </div>
    )
  }
}
