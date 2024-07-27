"use client"
import Link from "next/link";
import Tooltip from "../Tooltip";
import { LucideIcon } from "lucide-react";
import { usePathname } from "next/navigation";

export type SidebarItemProps = {
    title: string;
    link: string;
    Icon: LucideIcon;
};

export default function SidebarItem({ link, title, Icon }: SidebarItemProps) {

    const path = usePathname();
    const itemBg = path === link ? "bg-muted" : "bg-transparent";
    const linkStyles = `flex gap-2 items-center hover:bg-muted p-2 px-3 sm:px-2 rounded-sm ${itemBg}`

    return (
        <li>
            <Tooltip
                className={`block sm:hidden ${linkStyles}`}
                tooltipContent={title}
            >
                <Link href={link}>
                    <Icon className="size-5" />
                </Link>
            </Tooltip>
            <Link
                href={link}
                className={`hidden sm:flex text-sm gap-2 flex-1 ${linkStyles}`}
            >
                <Icon className='size-5' />
                <p>{title}</p>
            </Link>
        </li>
    )
}
