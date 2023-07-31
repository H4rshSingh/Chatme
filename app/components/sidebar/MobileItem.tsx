"use client";

import Link from "next/link";
import clsx from "clsx";

interface MobileItemProps {
    href : string;
    icon : any;
    label : string;
    active ?: boolean;
    onClick ?: () => void;
}

const MobileItem: React.FC<MobileItemProps> = ({href, active, icon : Icon, label, onClick}) => {
    const handleClick = () => {
        if (onClick) {
            onClick();
        }
    }

    return (
        <Link onClick={handleClick} href={href} className={clsx(`group flex items-center gap-x-2 text-sm leading-6 font-semibold w-full justify-center max-h-full p-4 text-gray-500 hover:text-black hover:bg-gray-100`, active && 'bg-gray-100 text-gray-950')}>
            <Icon className="h-6 w-6" />
            <span className="sr-only">{label}</span>
            
        </Link>
    );
}

export default MobileItem;