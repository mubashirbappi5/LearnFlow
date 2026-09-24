import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    const body = await request.json();
    const { message, sessionId } = body;

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    // Delay slightly to simulate AI thinking
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    const mockAiResponse = `I'm an AI Tutor. You said: "${message}". I'm here to help you understand your learning material better!`;

    // If user is not logged in, just return a mock response without saving to DB
    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({
        sessionId: sessionId || "guest-session",
        message: {
          id: Date.now().toString(),
          role: "ASSISTANT",
          content: mockAiResponse + " (You are currently a guest. Log in to save your chat history!)",
        }
      });
    }

    const userId = session.user.id;
    let activeSessionId = sessionId;

    // Create a new session if none exists or if it's a guest transitioning to logged in
    if (!activeSessionId || activeSessionId === "guest-session") {
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
