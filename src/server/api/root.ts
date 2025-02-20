import { createCallerFactory } from "@/server/api/trpc";
import { createRouter } from "./routers/generated/routers";
import { mergeRouters } from "@trpc/server/unstable-core-do-not-import";
import createFixedRouter from "./routers/fixed/userFolder.router";

export const appRouter = mergeRouters(createRouter(), createFixedRouter());
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
