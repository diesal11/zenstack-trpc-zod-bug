"use client";

import { type UserFolder } from "@/lib/zenstack/models";
import { api } from "@/trpc/react";
import { useState, useCallback } from "react";

export default function Home() {
  const createUserLocalMutation = api.userLocal.create.useMutation();
  const createUserFolderMutation = api.userFolder.create.useMutation();
  const createUserFolderFixedMutation =
    api.userFolderFixed.create.useMutation();

  const [folder, setFolder] = useState<UserFolder | undefined>();

  const onCreate = useCallback(async () => {
    const localUser = await createUserLocalMutation.mutateAsync({
      data: {
        email: "test@example.com",
        password: "password",
      },
    });

    // Fails with zod error `invalid_union`, createUserFolderFixedMutation works
    const folder = await createUserFolderMutation.mutateAsync({
      data: {
        path: "/",
        userId: localUser.id,
      },
    });

    setFolder(folder);
  }, [createUserLocalMutation, setFolder]);

  return (
    <>
      <div
        style={{
          height: "100%",
          display: "flex",
          gap: "1rem",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        {folder ? JSON.stringify(folder) : "Click Run Example"}
        <button style={{ padding: "1em" }} onClick={onCreate}>
          Run Example
        </button>
      </div>
    </>
  );
}
