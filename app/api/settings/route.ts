import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(req: Request, res: Response) {
    try {

        const body = await req.json();
        const currentUser = await getCurrentUser();
        const { name, image, phoneNumber } = body;

        if (!currentUser?.id || !currentUser?.email) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        // update current user image and name
        const updateUser = await prisma.user.update({
            where: {
                id: currentUser.id
            },
            data: {
                image: image,
                name: name,
                phoneNumber: parseInt(phoneNumber)
            }
        });

        return NextResponse.json(updateUser);
    } catch (error) {
        console.log(error, 'Settings error');
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}