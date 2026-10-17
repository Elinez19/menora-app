import React, { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { authClient, useSession } from "@/lib/auth-client";
import { UserRole } from "@/types/handyman";

interface AuthContextType {
  isGuest: boolean;
  role: UserRole;
  user: any | null;
  isPending: boolean;
  continueAsGuest: () => Promise<void>;
  setRole: (role: "customer" | "artisan") => Promise<void>;
  signOut: () => Promise<void>;
  exitGuestMode: () => Promise<void>;
}

const GUEST_STORAGE_KEY = "homa_guest_mode";
const ROLE_STORAGE_KEY = "homa_user_role";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: session, isPending: isSessionPending } = useSession();
  const [isGuest, setIsGuest] = useState<boolean>(false);
  const [role, setRoleState] = useState<UserRole>("customer");
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function loadStorage() {
      try {
        const guestVal = await SecureStore.getItemAsync(GUEST_STORAGE_KEY);
        const roleVal = await SecureStore.getItemAsync(ROLE_STORAGE_KEY);
        if (guestVal === "true") {
          setIsGuest(true);
        }
        if (roleVal === "artisan" || roleVal === "customer") {
          setRoleState(roleVal);
        }
      } catch {
        // Fallback for web or storage error
      } finally {
        setIsReady(true);
      }
    }
    loadStorage();
  }, []);

  const continueAsGuest = async () => {
    setIsGuest(true);
    setRoleState("guest");
    try {
      await SecureStore.setItemAsync(GUEST_STORAGE_KEY, "true");
      await SecureStore.setItemAsync(ROLE_STORAGE_KEY, "guest");
    } catch {}
  };

  const exitGuestMode = async () => {
    setIsGuest(false);
    try {
      await SecureStore.deleteItemAsync(GUEST_STORAGE_KEY);
    } catch {}
  };

  const setRole = async (newRole: "customer" | "artisan") => {
    setRoleState(newRole);
    try {
      await SecureStore.setItemAsync(ROLE_STORAGE_KEY, newRole);
    } catch {}
  };

  const handleSignOut = async () => {
    try {
      await authClient.signOut();
      await exitGuestMode();
    } catch (e) {
      console.error("Sign out error", e);
    }
  };

  const activeUser = session?.user || null;
  const computedRole: UserRole = isGuest ? "guest" : role;

  return (
    <AuthContext.Provider
      value={{
        isGuest,
        role: computedRole,
        user: activeUser,
        isPending: isSessionPending || !isReady,
        continueAsGuest,
        setRole,
        signOut: handleSignOut,
        exitGuestMode,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthUser() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthUser must be used within an AuthProvider");
  }
  return context;
}
