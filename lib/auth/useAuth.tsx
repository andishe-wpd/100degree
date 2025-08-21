"use client";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ls } from "@/lib/storage/local";

export type User = {
  id: string;
  name: string;
  email?: string;
  avatar?: string;
};

type AuthContextValue = {
  user: User | null;
  login: (u: User) => void;
  logout: () => void;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  // Initialize with localStorage value to prevent flash of loading state
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window !== "undefined") {
      return ls.get<User>("auth:user");
    }
    return null;
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Double-check localStorage on mount for consistency
    const cached = ls.get<User>("auth:user");
    if (cached && !user) {
      setUser(cached);
    }
    setIsLoading(false);
  }, [user]);

  const value = useMemo(
    () => ({
      user,
      isLoading,
      login: (u: User) => {
        setUser(u);
        ls.set("auth:user", u);
      },
      logout: () => {
        setUser(null);
        ls.remove("auth:user");
      },
    }),
    [user, isLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
