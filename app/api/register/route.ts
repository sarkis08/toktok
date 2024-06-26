import bcrypt from 'bcrypt'

import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import { log } from 'console';

export async function POST(request: Request) {
  try {
    const body = await request.json();
  const { email, name, password } = body;

  if (!email || !name || !password) {
    return new NextResponse('Missing info', { status: 400 })
  }

  const hashPassword = await bcrypt.hash(password, 12)

  const user = await prisma.user.create({
    data: {
        email,
        name,
        hashPassword
    }
  })

  return NextResponse.json(user)
  } catch (error: any) {
    log(error, 'REGISTRATION ERROR')
    return new NextResponse('Internal Error', { status: 500 })
  }
}
