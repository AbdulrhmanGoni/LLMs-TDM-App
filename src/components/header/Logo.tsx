"use client"
import { useRouter } from "next/navigation";
import { TriangleIcon } from "lucide-react";
import { Button } from "../ui/button";

export default function Logo() {

    const { push } = useRouter()

    return (
        <Button
            variant="outline"
            className="mr-2"
            size="icon"
            aria-label="Home"
            onClick={() => push("/")}
        >
            <TriangleIcon className="size-5 fill-red-600 stroke-red-600 rotate-180" />
        </Button>
    )
}
