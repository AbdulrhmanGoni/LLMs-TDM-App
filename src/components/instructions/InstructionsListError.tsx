import { WithErrorAndRefetch } from "@/lib/FetchError";
import { OctagonXIcon, RotateCcwIcon } from "lucide-react";
import { Button } from "../ui/button";

type InstructionsListError = WithErrorAndRefetch<{
  page: number
}>

export default function InstructionsListError({ error, refetch, page }: InstructionsListError) {
  return (
    <div className="flex flex-col gap-3 items-center justify-center col-span-full h-full text-center">
      <OctagonXIcon size={55} className="text-destructive" />
      <h2 className="text-2xl">Error !</h2>
      <p className="text-muted-foreground">
        An Error while fetching the page ({page}) of instructions: {error?.message}
      </p>
      <Button
        size="sm"
        onClick={() => refetch()}
        className="gap-1"
      >
        <RotateCcwIcon size={17} />
        Refetch
      </Button>
    </div>
  )
}