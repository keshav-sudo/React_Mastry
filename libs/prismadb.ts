import { PrismaClient } from "../app/generated/prisma"

// This is a special declaration to add 'prisma' to the global scope.
// This is done to prevent multiple instances of PrismaClient in development,
// which can happen due to hot-reloads and cause memory leaks.
declare global {
  var prisma: PrismaClient | undefined;
}

// Create a single, global instance of PrismaClient.
// We use 'globalThis' to ensure the client is preserved across hot-reloads.
const client = globalThis.prisma || new PrismaClient();

// If we are not in production, we attach the client to the global object.
if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = client;
}

// Export the single instance for use throughout the application.
export default client;
