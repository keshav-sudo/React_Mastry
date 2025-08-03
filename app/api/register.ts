// File: pages/api/register.ts

import bcrypt from "bcrypt"; // Password hashing के लिए bcrypt library import की है
import { NextApiRequest, NextApiResponse } from "next"; // Next.js API route types import किए हैं
import prisma from "../../libs/prismadb"

// ये आपका API route handler function है
export default async function handler(
  req: NextApiRequest, // Incoming request object
  res: NextApiResponse // Outgoing response object
) {
  // Check karein ki request method POST hai ya nahi
  // Registration ke liye hum sirf POST requests expect karte hain
  if (req.method !== "POST") {
    return res.status(405).end(); // Agar method POST nahi hai, toh 405 Method Not Allowed response bhej do aur function stop kar do
  }

  try {
    // Request body se email, username, name, aur password extract karein
    const { email, username, name, password } = req.body;

    // Password ko hash karein
    // bcrypt.hash() asynchronous function hai, isliye 'await' use kiya hai
    // 12 'salt rounds' ki value hai, higher value zyada secure (but slower) hash banati hai
    const hashedPassword = await bcrypt.hash(password, 12);

    // Prisma ka use karke database mein naya user create karein
    const user = await prisma.user.create({
      data: {
        email,          // User ka email
        username,       // User ka username
        name,           // User ka naam
        hashedPassword, // Hash kiya hua password store karein
      },
    });

    // Successfully user create hone par 200 OK response aur user data JSON format mein bhejein
    return res.status(200).json(user);
  } catch (error) {
    // Agar koi error aata hai (jaise duplicate email/username, database connection issue)
    console.log(error); // Error ko console mein log karein debugging ke liye
    return res.status(400).end(); // Client ko 400 Bad Request response bhejein
  }
}