import { enhance } from "@zenstackhq/runtime";
import { prisma } from "./client";

/**
 * Get an authorization-enabled database client
 * @param ctx
 */
export async function getEnhancedPrisma() {
  return enhance(prisma);
}
