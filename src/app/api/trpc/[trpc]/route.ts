import { appRouter } from "@/server/api/root";
import { createTRPCContext } from "@/server/api/trpc";
import { NextRequest } from "next/server";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

const createContext = async (req: NextRequest) => {
  return createTRPCContext({
    headers: req.headers,
  });
};

const handler = (req: NextRequest) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: () => createContext(req),
    onError: ({ path, error }) => {
      console.error(
        `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`
      );
    },
  });

export { handler as GET, handler as POST };
