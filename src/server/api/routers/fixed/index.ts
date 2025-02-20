import type { EnhancedPrismaClient } from "@/server/db";
import type { PrismaClient } from "@prisma/client";

export function db(ctx: {
  prisma?: EnhancedPrismaClient | PrismaClient;
}): EnhancedPrismaClient {
  if (!ctx.prisma) {
    throw new Error('Missing "prisma" field in trpc context');
  }

  return ctx.prisma as EnhancedPrismaClient;
}
