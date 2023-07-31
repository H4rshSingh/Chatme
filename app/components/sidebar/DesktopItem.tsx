"use client";

import clsx from "clsx";
import Link from "next/link";

interface DesktopItemProps {
    icon: any;
    label: string;
    href: string;
    active?: boolean;
    onClick?: () => void;
}


const DesktopItem : React.FC<DesktopItemProps> = ({icon:Icon, label, href, onClick, active}) => {
    const handleClick = () => {
        if(onClick){
            onClick();
        }
    }

    return (
        <li onClick={handleClick} key={label}>
            <Link href={href} className={clsx(`group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-semibold text-gray-500 hover:text-black hover:bg-gray-100`, active && 'bg-gray-100 text-gray-950')}>
                <Icon className="w-6 h-6 shrink-0" />
                <span className="sr-only">{label}</span>
            </Link>
        </li>
    );
}

export default DesktopItem;