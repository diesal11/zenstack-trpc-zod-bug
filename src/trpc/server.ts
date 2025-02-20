import { createHydrationHelpers } from "@trpc/react-query/rsc";
import { headers } from "next/headers";
import { cache } from "react";

// import { createCaller, type AppRouter } from "@/server/routers/_app";
import { createTRPCContext } from "@/server/api/trpc";
import { createQueryClient } from "./query-client";
import { AppRouter, createCaller } from "@/server/api/root";

const createContext = cache(async () => {
  const heads = new Headers(await headers());
  heads.set("x-trpc-source", "rsc");

  return createTRPCContext({
    headers: heads,
  });
});

export const getQueryClient = cache(createQueryClient);
const caller = createCaller(createContext);

export const { trpc: api, HydrateClient } = createHydrationHelpers<AppRouter>(
  caller,
  getQueryClient
);
