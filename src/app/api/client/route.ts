import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "../lib/mongoose";
import Visitor from "../models/Visitor";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();
    const { message } = body;

    // ✅ ইউজারের IP বের করা
    const ip =
      req.headers.get("x-forwarded-for") ||
      req.ip ||
      "unknown";

    // ✅ MongoDB তে সেভ করা
    const visitor = await Visitor.create({
      ip,
      message,
      timestamp: new Date(),
    });

    return NextResponse.json({ success: true, visitor });
  } catch (error) {
    console.error("❌ Visitor Tracking Failed:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
