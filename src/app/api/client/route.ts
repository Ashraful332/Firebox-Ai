import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "../lib/mongoose";
import Visitor from "../models/Visitor";

export async function POST(req: NextRequest) {
    try {
        await connectDB(); // MongoDB কানেক্ট

        const add_Visitor = await req.json();
        console.log("The data is:", add_Visitor);

        const result = await Visitor.create(add_Visitor); // MongoDB তে সেভ
        console.log("Inserted ID:", result._id);

        return NextResponse.json({ success: true, result });
    } catch (error) {
        console.error("The Visitor is not sent to database", error);
        return NextResponse.json(
            { message: "Error occurred while inserting data" },
            { status: 500 }
        );
    }
}
