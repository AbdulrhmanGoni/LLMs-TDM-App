import { Card } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export default function InstructionsListLoading() {
  return (
    Array.from(new Array(5)).map((_n, i) => (
      <Card className="flex flex-col gap-2 p-3" key={i}>
        <div className="flex gap-1 items-center">
          <Skeleton className="size-5 flex-shrink-0" />
          <Skeleton className="w-full h-4 rounded-sm" />
          <Skeleton className="w-28 h-4 rounded-sm" />
        </div>
        <div className="flex gap-1">
          <Skeleton className="size-5 flex-shrink-0" />
          <Skeleton className="w-full h-10" />
        </div>
        <div className="flex gap-1">
          <Skeleton className="size-5 flex-shrink-0" />
          <Skeleton className="w-full h-14" />
        </div>
      </Card>
    ))
  )
}
