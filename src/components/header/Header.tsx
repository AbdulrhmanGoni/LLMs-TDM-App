import { TriangleIcon } from "lucide-react";
import { Button } from "../ui/button";

const titleColors = ["text-green-600", "text-orange-600", "text-yellow-600", "text-blue-600"]

export default function Header() {
    return (
        <header className="sticky top-0 z-10 flex h-[60px] items-center gap-1 border-b bg-background px-2">
            <div className="mr-2">
                <Button variant="outline" size="icon" aria-label="Home">
                    <TriangleIcon className="size-5 fill-red-600 stroke-red-600 rotate-180" />
                </Button>
            </div>
            <h1 className="text-xl font-semibold">
                {"LTDM".split("").map((letter, i) => (
                    <p className={`${titleColors[i]} inline-block`}>{letter}</p>
                ))}
            </h1>
        </header>
    )
}
