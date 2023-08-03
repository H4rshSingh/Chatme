import bcrypt from 'bcrypt';
import prisma from '@/app/libs/prismadb';
import { NextResponse } from 'next/server';
import sendMail from '@/app/actions/sendMail';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, name, password } = body;

        if (!email || !name || !password) {
            
            console.log("Missing fields");
            return NextResponse.json({ message: 'Missing fields' }, { status: 400 });
        }

        const existingUser = await prisma.user.findUnique({
            where: {
                email,
            }
        });

        if (existingUser) {
            return NextResponse.json({ message: 'User already exists' }, { status: 400 });
        }

        const otp = Math.floor(100000 + Math.random() * 900000);
        console.log(otp);

        await sendMail({ email, name, otp, emailType: 'REGISTER' });


        // const hashedPassword = await bcrypt.hash(password, 12);

        // const user = await prisma.user.create({
        //     data: {
        //         email,
        //         name,
        //         hashedPassword,
        //     }
        // });
        // console.log(user);
        return NextResponse.json(otp);
    } catch (error) {
        return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
    }
}