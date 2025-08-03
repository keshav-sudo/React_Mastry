import { PrismaClient } from "@prisma/client";

declare global {
    // This allows us to attach the PrismaClient instance to the global object.
    // This is good practice for environments with hot-reloading (like Next.js development)
    // to prevent multiple instances of PrismaClient from being created.
    var prisma: PrismaClient | undefined;
}

// Check if a PrismaClient instance already exists on the global object.
// If not, create a new one. This ensures we reuse the same instance.
const client = globalThis.prisma || new PrismaClient();

// In development mode (not production), attach the client to the global object.
// This preserves the client across hot-reloads, preventing new instances.
// The operator should be '!==' for "not strictly equal to".
if (process.env.NODE_ENV !== "production") {
    globalThis.prisma = client;
}

// Export the client for use throughout your application.
export default client;