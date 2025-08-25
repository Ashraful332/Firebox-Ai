import { NextResponse } from "next/server";
import { connectDB } from "../lib/mongoose";
import Chat from "../models/Chat";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    // ✅ MongoDB connect
    await connectDB();

    // এখানে তুমি চাইলে OpenAI বা অন্য লজিক দিয়ে reply তৈরি করতে পারো
    const reply = `You asked: "${message}". This is a sample reply.`; 

    // ✅ MongoDB তে সেভ করা
    const newChat = await Chat.create({ message, reply });

    return NextResponse.json({ reply: newChat.reply });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
