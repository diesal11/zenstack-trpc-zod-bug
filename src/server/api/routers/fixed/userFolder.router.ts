import { createTRPCRouter, procedure } from "../../trpc";
import { db as getDb } from ".";
import { UserFolderCreateSchema } from "@/lib/zenstack/zod/models";
import { z } from "zod";

export default function createFixedRouter() {
  return createTRPCRouter({
    userFolderFixed: createTRPCRouter({
      create: procedure
        .input(z.object({ data: UserFolderCreateSchema }))
        .mutation(({ ctx, input }) => getDb(ctx).userFolder.create(input)),
    }),
  });
}
