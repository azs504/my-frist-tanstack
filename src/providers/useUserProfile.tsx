import { postLogin } from "#/lib/users";
import type { UserProfile } from "#/types/user";
import { useMutation } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useState } from "react";

type UserProfileContextType = {
  userProfile: UserProfile | null;
  logout: () => void;
  login: ReturnType<
    typeof useMutation<
      { success: boolean; user: UserProfile },
      Error,
      { email: string; password: string }
    >
  >;
  isLogin: boolean;
};

const UserProfileContext = createContext<UserProfileContextType | null>(null);

export function UserProfileProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  const login = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      postLogin({
        data: { email, password },
      }),
    onSuccess: (data: { success: boolean; user: UserProfile }) => {
      setUserProfile(data.user);

      localStorage.setItem("userProfile", JSON.stringify(data.user));
    },
    onError: (error) => {
      console.error("Login error:", error);
    },
  });

  const logout = () => {
    setUserProfile(null);

    localStorage.removeItem("userProfile");
  };

  const isLogin = !!userProfile;

  useEffect(() => {
    const userProfile = localStorage.getItem("userProfile");

    if (userProfile) setUserProfile(JSON.parse(userProfile));
  }, []);

  return (
    <UserProfileContext.Provider
      value={{ userProfile, logout, login, isLogin }}
    >
      {children}
    </UserProfileContext.Provider>
  );
}

export function useUserProfile() {
  const ctx = useContext(UserProfileContext);
  if (!ctx)
    throw new Error("useUserProfile must be used within UserProfileProvider");
  return ctx;
}
