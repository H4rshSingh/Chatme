"use client"

import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import axios from "axios";
import Avatar from "@/app/components/Avatar";
import { BsChatDots } from "react-icons/bs";
interface GroupUserProps {
    user: User;
    isCurrent: boolean;
}

const GroupUserBox: React.FC<GroupUserProps> = ({ user, isCurrent }) => {
    const router = useRouter();

    const handleClick = useCallback(() => {
        if (!isCurrent) {
            axios.post('/api/conversations', {
                userId: user.id,
            })
                .then((data) => {
                    router.push(`/conversations/${data.data.id}`);
                })
        }
    }, [user, router, isCurrent])

    return (
        <div key={user.id} onClick={handleClick} className="w-full relative flex items-center space-x-2 bg-white md:p-3 py-3 hover:bg-neutral-100 rounded-lg transition cursor-pointer mg:gap-2 gap-1">
            <Avatar user={user} />
            <div className="min-w-0 flex-1 items-center">
                <div className="focus:outline-none">
                    <div className="flex flex-col ">
                        <p className="text-xs md:text-sm font-medium text-gray-900">{user.name}{
                            isCurrent && <span className='text-xs p-2 font-semibold text-gray-500'>(You)
                            </span>}</p>
                        <p className="text-xs md:text-sm text-gray-500">{user.email}</p>
                    </div>
                </div>
            </div>
            <div className="hidden md:flex">
                {!isCurrent &&
                    <div className="p-2  hover:text-sky-600">
                        <BsChatDots onCLick={handleClick} size={20} />
                    </div>
                }
            </div>

        </div>
    );
}

export default GroupUserBox;