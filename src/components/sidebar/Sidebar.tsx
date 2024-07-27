import SidebarItems from "./SidebarItems";

export default function Sidebar() {
    return (
        <aside className="w-fit sm:w-64 flex h-full flex-col border-r">
            <nav className="p-1 sm:p-2">
                <SidebarItems />
            </nav>
        </aside>
    )
}
