import sendMail from '@/app/actions/sendMail';
import prisma from '@/app/libs/prismadb';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email } = body;

        if (!email) {
            return NextResponse.json({ message: 'Missing Email' }, { status: 400 });
        }

        const user = await prisma.user.findUnique({
            where: {
                email,
            }, 
        });

        if (!user) {
            return NextResponse.json({ message: 'Email does not exist' }, { status: 400 });
        }

        if(!user.hashedPassword){
            return NextResponse.json({ message: "You registed with other method" }, { status: 400 });
        }

        const otp = Math.floor(100000 + Math.random() * 900000);
        console.log(otp);

        await sendMail({ email, name : user.name!, otp, emailType: 'CHANGE_PASSWORD' });

        return NextResponse.json(otp);
    } catch (error: any) {
        console.log(error, "Verify Email Error");
        return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
    }
}