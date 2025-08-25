import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { connectDB } from "../lib/mongoose";
import User from "../models/User";

const JWT_SECRET = process.env.JWT_SECRET as string;

// New user create
function generateSecureRandomString(length: number) {
    const chars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    const randomBytes = crypto.randomBytes(length);
    for (let i = 0; i < length; i++) {
        result += chars[randomBytes[i] % chars.length];
    }
    return result;
}

export async function POST(req: Request) {
    try {
        await connectDB();

        const { UserEmail, UserName, UserPhoto } = await req.json();

        // Check user exists
        let user = await User.findOne({ email: UserEmail });

        if (user) {
            // Existing user -> send token
            const token = jwt.sign(
                { id: user._id, email: user.email },
                JWT_SECRET,
                { expiresIn: "15d" }
            );

            return NextResponse.json({
                message: true,
                token,
                user: {
                    name: user.name,
                    email: user.email,
                    photoURL: user.photo,
                },
            });
        } else {
            const password = generateSecureRandomString(10);
            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = await User.create({
                name: UserName,
                email: UserEmail,
                photo: UserPhoto,
                password: hashedPassword,
            });

            const token = jwt.sign(
                { id: newUser._id, email: newUser.email },
                JWT_SECRET,
                { expiresIn: "15d" }
            );

            return NextResponse.json({
                message: false,
                token,
                user: {
                    name: newUser.name,
                    email: newUser.email,
                    photoURL: newUser.photo,
                },
            });
        }
    } catch (error: any) {
        return NextResponse.json(
            { error: "❌ Login Error: " + error.message },
            { status: 500 }
        );
    }
}
