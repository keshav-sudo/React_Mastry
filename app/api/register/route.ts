import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/libs/prismadb";

// This is the API route handler for POST requests in the App Router.
export async function POST(request: Request) {
  try {
    // Request body ko JSON mein parse karein.
    const body = await request.json();
    const { email, username, name, password } = body;

    // TODO: Yahan aap additional server-side validation add kar sakte hain.
    // Jaise ki, password ki length check karna, etc.
    if (!email || !username || !name || !password) {
      return new NextResponse("Missing fields", { status: 400 });
    }

    // Password ko hash karein.
    const hashedPassword = await bcrypt.hash(password, 12);

    // Prisma ka use karke database mein naya user create karein.
    const user = await prisma.user.create({
      data: {
        email,
        username,
        name,
        hashedPassword,
      },
    });

    // Successfully user create hone par user data JSON format mein bhejein.
    return NextResponse.json(user);
  } catch (error) {
    // Agar koi error aata hai, toh usko console mein log karein.
    console.error("Registration error:", error);
    // Client ko 500 Internal Server Error response bhejein.
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}