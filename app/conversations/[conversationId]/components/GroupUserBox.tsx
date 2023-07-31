"use client"

import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import axios from "axios";
import Avatar from "@/app/components/Avatar";
import { BsChatDots } from "react-icons/bs";
import { useSession } from "next-auth/react";

interface GroupUserProps {
    user: User;
    isCurrent: boolean;
}

const GroupUserBox: React.FC<GroupUserProps> = ({ user, isCurrent }) => {
    const router = useRouter();
    const session = useSession();
    const currentUserEmail = session.data?.user?.email;

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
        <div key={user.id} onClick={handleClick} className="w-full relative flex items-center space-x-2 bg-white p-3 hover:bg-neutral-100 rounded-lg transition cursor-pointer gap-2">
            <Avatar user={user} />
            <div className="min-w-0 flex-1">
                <div className="focus:outline-none">
                    <div className="flex flex-col mb-1">
                        <p className="text-sm font-medium text-gray-900">{user.name}{
                            isCurrent && <span className='text-xs p-2 font-semibold text-gray-500'>(You)
                            </span>}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                </div>
            </div>

            {/* {
                !isCurrent ? (
                    <div className="p-2  hover:text-sky-600">
                        <BsChatDots onCLick={handleClick} size={20} />
                    </div>
                ) :
                    <span className='text-xs p-2 font-semibold text-gray-500'>You</span>
            } */}
        </div>
    );
}

export default GroupUserBox;