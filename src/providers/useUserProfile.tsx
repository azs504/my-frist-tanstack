import type { UserProfile } from "#/types/user";
import { createContext, useContext, useState } from "react";

type UserProfileContextType = {
  userProfile: UserProfile | null;
  setUserProfile: (userProfile: UserProfile | null) => void;
  logout: () => void;
};

const UserProfileContext = createContext<UserProfileContextType | null>(null);

export function UserProfileProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  const logout = () => {
    setUserProfile(null);
  };

  return (
    <UserProfileContext.Provider
      value={{ userProfile, setUserProfile, logout }}
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
