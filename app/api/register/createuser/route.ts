import prisma from '@/app/libs/prismadb';
import { NextResponse } from 'next/server';
import bycrypt from 'bcrypt';

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
            console.log("User already exists");
            return NextResponse.json({ message: 'User already exists' }, { status: 400 });
        }

        const hashedPassword = await bycrypt.hash(password, 12);

        const user = await prisma.user.create({
            data: {
                email,
                name,
                hashedPassword,
            }
        });

        return NextResponse.json(user);
        
    } catch (error: any) {
        console.log(error, "Create User Error");
        return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
    }

}