import { initTRPC } from "@trpc/server";
import { enhance } from "@/lib/zenstack/enhance";
import transformer from "trpc-transformer";

import { prisma } from "@/server/db/client";
import { ZodError } from "zod";

export const createTRPCContext = async (opts: { headers: Headers }) => {
  return {
    prisma: enhance(prisma),
    ...opts,
  };
};

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

export const mergeRouters = t.mergeRouters;
export const createCallerFactory = t.createCallerFactory;
export const createTRPCRouter = t.router;
export const procedure = t.procedure;
