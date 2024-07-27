"use client"
import {
    Database,
    HomeIcon,
    SquarePlusIcon,
} from "lucide-react"
import SidebarItem, { SidebarItemProps } from "./SidebarItem"

export const SidebarItemsData: SidebarItemProps[] = [
    {
        title: "Home",
        link: "/",
        Icon: HomeIcon
    },
    {
        title: "My Datasets",
        link: "/my-datasets",
        Icon: Database
    },
    {
        title: "Create Dataset",
        link: "/create-dataset",
        Icon: SquarePlusIcon
    },
]

export default function SidebarItems() {
    return (
        <ul className="flex flex-col gap-1 sm:gap-2">
            {SidebarItemsData.map((item) => (<SidebarItem key={item.link} {...item} />))}
        </ul>
    )
}