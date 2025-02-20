import { env } from "@/env";
import { enhance } from "@/lib/zenstack/enhance";
import { PrismaClient } from "@prisma/client";

const createPrismaClient = () => {
  return new PrismaClient({
    log:
      env.NODE_ENV === "development"
        ? [/*"query", */ "error", "warn"]
        : ["error"],
  });
};

export const enhancePrismaClient = (prisma: PrismaClient) => {
  const db = enhance(prisma);
  return db;
};

const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createPrismaClient> | undefined;
  db: ReturnType<typeof enhancePrismaClient> | undefined;
};
export type EnhancedPrismaClient = NonNullable<typeof globalForPrisma.db>;

export const prisma = globalForPrisma.prisma ?? createPrismaClient();
export const db = globalForPrisma.db ?? enhancePrismaClient(prisma);

if (env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
if (env.NODE_ENV !== "production") globalForPrisma.db = db;
