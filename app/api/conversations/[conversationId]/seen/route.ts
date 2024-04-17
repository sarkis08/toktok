import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

interface IParams {
  conversationId?: string;
}

export async function POST(req: Request, { params }: { params: IParams }) {
  try {
    const currentUser = await getCurrentUser()
    const { conversationId } = params

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Find the existing conversation
    const conversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        messages: {
            include: {
                seen: true
            }
        },
        users: true,
      },
    })

    // Check if fetch the conversation
    if (!conversation) {
      return new NextResponse("Conversation not found", { status: 404 });
    }

    // Find the last message from the conversation
    const lastMessage = conversation.messages[conversation.messages.length - 1]

    if(!lastMessage) {
        return NextResponse.json(conversation)
    }

    // Update seen of last message
    const updatedMessage = await prisma.message.update({
      where: {
        id: lastMessage.id,
      },
      data: {
        seen: {
          connect: {
            id: currentUser.id,
          },
        },
      },
      include: {
        seen: true,
        sender: true,
      },
    })

    return NextResponse.json(updatedMessage)

  } catch (error: any) {
    console.log(error, "ERROR_MESSAGES_SEEN");
    return new NextResponse('Internal Server Error', { status: 500 });
    
  }
}
