import prisma from '@/app/libs/prismadb';
import bycrpt from 'bcrypt';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, password } = body;

        if (!email || !password) {
            return NextResponse.json({ message: "Missing fields" }, { status: 400 });
        }

        const user = await prisma.user.findUnique({
            where: {
                email,
            }
        });

        if (!user) {
            return NextResponse.json({ message: "User does not exist" }, { status: 400 });
        }

        if(!user.hashedPassword){
            return NextResponse.json({ message: "You registed with other method" }, { status: 400 });
        }

        const newHashedPassword = await bycrpt.hash(password, 12);

        await prisma.user.update({
            where: {
                email,
            },
            data: {
                hashedPassword: newHashedPassword,
            }
        });

        return NextResponse.json({ message: "Password changed successfully" });
        
    } catch (error: any) {
        console.log(error, "Change Password Error");
        return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
    }

}