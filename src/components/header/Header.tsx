import APP_NAME from "@/constants/APP_NAME";
import Logo from "./Logo";

export default function Header() {
    return (
        <header className="sticky top-0 z-10 flex h-[60px] items-center gap-1 border-b bg-background">
            <Logo />
            <h1 className="text-xl font-semibold">
                {APP_NAME}
            </h1>
        </header>
    )
}
