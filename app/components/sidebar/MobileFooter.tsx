"use client";

import useConversation from "@/app/hooks/useConversation";
import useRoutes from "@/app/hooks/useRoutes";
import MobileItem from "./MobileItem";
import { User } from "@prisma/client";
import Avatar from "../Avatar";
import SettingsModal from "./SettingsModal";
import { useState } from "react";

interface MobileFooterProps {
    currentUser: User
}
const MobileFooter: React.FC<MobileFooterProps> = ({ currentUser }) => {
    const routes = useRoutes();
    const { isOpen } = useConversation();
    const [isModalOpen, setIsModalOpen] = useState(false)

    if (isOpen) {
        return null;
    }

    return (
        <div className="fixed justify-between w-full h-12 bottom-0 z-40 flex items-center bg-white border-t-[1px] lg:hidden">
            <SettingsModal currentUser={currentUser} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            <div onClick={() => setIsModalOpen(true)} className="cursor-pointer flex items-center gap-x-2  w-full justify-center p-4 hover:bg-gray-100 max-h-full">
                <Avatar user={currentUser} />
            </div>
            {routes.map(route => (
                <MobileItem
                    key={route.label}
                    href={route.href}
                    active={route.active}
                    icon={route.icon}
                    label={route.label}
                    onClick={route.onClick}
                />
            ))}
        </div>
    );
}

export default MobileFooter;