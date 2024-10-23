"use client";

import { UserModel } from "@/models/user";
import { UserService } from "@/Services/user";
import { useState } from "react";

export default function useUsersList() {
  const [isLoading, setIsLoading] = useState(true);
  const [isFetchStated, setIsFetchStated] = useState(false);
  const [error, setError] = useState("");
  const [users, setUsers] = useState<UserModel[]>([]);

  function handleStartFetch() {
    setIsFetchStated(true);
    setIsLoading(true);
    setError("");

    UserService.getAll()
      .then((users) => setUsers(users))
      .catch((err) => {
        setUsers([]);
        if (err instanceof Error) setError(err?.message || "Unauthorized");
        else setError("Unauthorized");
      })
      .finally(() => setIsLoading(false));
  }

  return {
    isLoading,
    isInError: !!error,
    error,
    list: users,

    isFetchStated,
    handleStartFetch,
  };
}
