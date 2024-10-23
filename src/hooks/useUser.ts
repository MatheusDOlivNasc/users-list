import { DefaultUserModel } from "@/models/user";
import { UserService } from "@/Services/user";
import { useEffect, useState } from "react";

export default function useUser(userId: string) {
  const [user, setUser] = useState<DefaultUserModel | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setIsLoading(true);
    setUser(null);
    setError("");

    UserService.getById(userId)
      .then((user) => {
        setUser(user);
        setError("");
      })
      .catch((err) => {
        if (err instanceof Error) setError(err?.message || "Unauthorized");
        else setError("Unauthorized");
        
        setUser(null);
      })
      .finally(() => setIsLoading(false));
  }, [userId]);

  return {
    user,
    isLoading,
    error,
  };
}
