import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import { pusherServer } from "@/app/libs/pusher";

interface IParams {
    conversationId: string;
}

export async function DELETE(request: Request, { params }: { params : IParams}) {
    try {
        const { conversationId } = params;
        const currentUser = await getCurrentUser();
        if (!currentUser?.id || !currentUser?.email) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const existingConversations = await prisma.conversation.findUnique({
            where: {
                id: conversationId
            },
            include: {
                users: true
            }
        });

        if(!existingConversations) {
            return new NextResponse('Conversation not found', { status: 404 });
        }

        const deletedConversation = await prisma.conversation.deleteMany({
            where: {
                id: conversationId,
                userIds: {
                    hasSome: [currentUser.id]
                }
            }
        });

        existingConversations.users.forEach((user) => {
            if (user.email) {
                pusherServer.trigger(user.email, 'conversation:remove', existingConversations);
            }
        });

        return NextResponse.json(deletedConversation);
        
    } catch (error:any) {
        console.log(error, 'ERROR_DELETE_CONVERSATION');
        return new NextResponse(error.message, { status: 500 });
    }
}