import { use, createContext, type PropsWithChildren, useEffect } from "react";
import { useStorageState } from "../authentication/useStorageState";
import { User } from "@/types/user";
import { deleteNotificationsTokenRequest } from "@/config/api/notifications/sendNotificationsToken";
import { registerForPushNotificationsAsync } from "@/helpers/pushNotifications/registerForPushNotificationsAsync";
import { postNotificationsSettingsFx } from "@/stores/userSettings/handlers";

const AuthContext = createContext<{
  signIn: (user: User) => void;
  signOut: () => void;
  session?: User | null;
  isLoading: boolean;
}>({
  signIn: () => null,
  signOut: () => null,
  session: null,
  isLoading: false,
});

export function useSession() {
  const value = use(AuthContext);
  if (!value) {
    throw new Error("useSession must be wrapped in a <SessionProvider />");
  }

  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoading, sessionString], setSession] = useStorageState("session");

  const session: User | null = sessionString ? JSON.parse(sessionString) : null;

  useEffect(() => {
    if (!session) return;

    postNotificationsSettingsFx();
    registerForPushNotificationsAsync();
  }, [session]);

  return (
    <AuthContext
      value={{
        signIn: (user: User) => {
          setSession(JSON.stringify(user));
        },
        signOut: async () => {
          try {
            await deleteNotificationsTokenRequest();
          } catch {
          } finally {
            setSession(null);
          }
        },
        session,
        isLoading,
      }}
    >
      {children}
    </AuthContext>
  );
}
