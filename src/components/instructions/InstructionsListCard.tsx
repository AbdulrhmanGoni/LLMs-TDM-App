"use client"
import { MessageCircleCodeIcon, MessageCircleQuestionIcon, MessageCircleReplyIcon } from "lucide-react";
import { Card } from "../ui/card";
import timeAgo from "@/utils/timeAgo";
import { cn } from "@/utils/tw-cn";
import useDatasetPageContext from "@/hook/datasets/useDatasetPageContext";

export default function InstructionsListCard({ instruction }: { instruction: Instruction }) {

  const {
    selectedInstruction,
    setSelectedInstruction,
    setEditInstructionMode,
    editInstructionMode
  } = useDatasetPageContext()

  return (
    <Card
      className={
        cn(
          "flex flex-col gap-2 p-3 transition-all hover:bg-accent",
          selectedInstruction?._id === instruction._id && "bg-muted"
        )
      }
      onClick={() => {
        setSelectedInstruction(instruction);
        editInstructionMode && setEditInstructionMode(false);
      }}
    >
      <div className="flex gap-1 text-muted-foreground">
        <MessageCircleCodeIcon className="size-4 sm:size-5" />
        <p className={
          cn(
            "font-semibold text-sm line-clamp-1",
            instruction.systemMessage ? "" : "line-through"
          )
        }>
          {
            instruction.systemMessage ?
              instruction.systemMessage : "No System Message"
          }
        </p>
        <span className="ml-auto text-xs sm:text-sm text-nowrap">
          {timeAgo(instruction.createdAt)}
        </span>
      </div>
      <div className="flex gap-1">
        <MessageCircleQuestionIcon className="size-4 sm:size-5" />
        <p className="text-xs sm:text-sm font-medium line-clamp-2">
          {instruction.question}
        </p>
      </div>
      <div className="flex gap-1">
        <MessageCircleReplyIcon className="size-4 sm:size-5" />
        <p className="text-xs sm:text-sm text-muted-foreground line-clamp-3">
          {instruction.answer}
        </p>
      </div>
    </Card>
  )
}
