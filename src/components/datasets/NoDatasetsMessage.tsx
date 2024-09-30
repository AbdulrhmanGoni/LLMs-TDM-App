import { PackageOpenIcon } from "lucide-react";

export default function NoDatasetsMessage() {
    return (
        <div className="flex flex-col gap-3 items-center justify-center col-span-full h-[500px]">
            <PackageOpenIcon size={55} />
            <h2 className="text-2xl">No Datasets</h2>
            <p className="text-muted-foreground text-center">
                Your don't have any datasets now<br />
                click on the button upove on the right to create a new dataset
            </p>
        </div>
    )
}
