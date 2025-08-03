import {NextApiRequest} from "next";
// File: lib/serverAuth.ts (Assuming it's in a 'lib' folder, common for utility functions)

import { NextApiRequest } from "next"; // Next.js API request type import kiya
import { getSession } from "next-auth/react"; // NextAuth.js se getSession function import kiya (server-side session lene ke liye)
import prisma from "./prismadb"

// Ye function server-side authentication ke liye use hoga
const serverAuth = async (req: NextApiRequest) => { // Ye request object ko argument mein leta hai
  // 1. NextAuth.js se current session ko fetch karein
  // getSession function request object ko use karke session details nikalta hai
  const session = await getSession({ req });

  // 2. Check karein ki session exist karta hai aur user ka email hai ya nahi
  if (!session?.user?.email) {
    throw new Error("Not signed in"); // Agar session nahi hai ya email nahi hai, toh error throw karein
  }

  // 3. Session email ka use karke database mein user ko dhoondein
  const currentUser = await prisma.user.findUnique({
    where: {
      email: session.user.email, // Session se mile email se user ko find karein
    },
  });

  // 4. Check karein ki user database mein mila ya nahi
  if (!currentUser) {
    throw new Error("Not signed in"); // Agar user database mein nahi mila, toh error throw karein
  }

  // 5. Agar user mil gaya, toh us user object ko return karein
  return currentUser;
};

export default serverAuth; // serverAuth function ko default export karein