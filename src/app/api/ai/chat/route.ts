import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;
    const body = await request.json();
    const { message, sessionId } = body;

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    let activeSessionId = sessionId;

    // Create a new session if none exists
    if (!activeSessionId) {
      const newSession = await prisma.aiChatSession.create({
        data: {
          userId,
          title: message.substring(0, 30) + (message.length > 30 ? "..." : ""),
        },
      });
      activeSessionId = newSession.id;
    }

    // Save user's message
    await prisma.aiChatMessage.create({
      data: {
        sessionId: activeSessionId,
        role: "USER",
        content: message,
      },
    });

    // Mock AI response (Normally you would call OpenAI, Anthropic, etc. here)
    // Delay slightly to simulate AI thinking
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    const mockAiResponse = `I'm an AI Tutor (mock version). You said: "${message}". I'm here to help you understand your learning material better!`;

    // Save AI's response
    const aiMessage = await prisma.aiChatMessage.create({
      data: {
        sessionId: activeSessionId,
        role: "ASSISTANT",
        content: mockAiResponse,
      },
    });

    return NextResponse.json({
      sessionId: activeSessionId,
      message: aiMessage,
    });
  } catch (error) {
    console.error("AI Chat error:", error);
    return NextResponse.json(
      { error: "An error occurred while processing your request" },
      { status: 500 }
    );
  }
}
