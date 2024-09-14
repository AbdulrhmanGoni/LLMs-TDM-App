import { WithErrorAndRefetch } from "@/lib/FetchError";
import { OctagonXIcon, RotateCcwIcon } from "lucide-react";
import { Button } from "../ui/button";

export default function DatasetsGridError({ error, refetch }: WithErrorAndRefetch) {
    return (
        <div className="flex flex-col gap-3 items-center justify-center col-span-full">
            <OctagonXIcon size={55} className="text-destructive" />
            <h2 className="text-2xl">Error !</h2>
            <p className="text-muted-foreground">
                Error while fetching datasets: {error?.message}
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
