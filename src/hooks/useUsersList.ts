"use client";

import { UserModel } from "@/models/user";
import { UserService } from "@/Services/user";
import { useMemo, useState } from "react";

export default function useUsersList() {
  const [searchText, setSearchText] = useState("");
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

  const filterUsersNamesBySearchText = useMemo(() => {
    if (!searchText) return users;

    return users?.filter((user) =>
      user.name?.toLocaleLowerCase().includes(searchText?.toLocaleLowerCase())
    );
  }, [searchText, users]);

  return {
    isLoading,
    isInError: !!error,
    error,
    list: filterUsersNamesBySearchText,

    searchText,
    setSearchText,

    isFetchStated,
    handleStartFetch,
  };
}
