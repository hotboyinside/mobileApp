"use client";
import { ThemeProvider } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { DialogProvider } from "./dialog/DialogProvider";
import { SessionProvider } from "./session/SessionContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { GlobalSheetProvider } from "./sheetModal/GlobalSheetProvider";
import { config } from "@/config/vars";
import EventSource, { EventType } from "react-native-sse";
import { SSE_NEWS } from "@/constants/apiSse";
export interface NavigateOptions {
  history?: "auto" | "push" | "replace";
}

export interface Navigate {
  (url: string | URL, options?: NavigateOptions): void;
}

/**
 * Abstract router used by Toolpad components.
 */

export interface Session {
  user?: {
    id?: string | null;
    name?: string | null;
    image?: string | null;
    email?: string | null;
  };
}

export const SseEvents = {
  Error: "error",
  News: "news",
  Symbols: "symbols",
} as const;

export interface AppProviderProps {
  /**
   * The content of the app provider.
   */
  children: React.ReactNode;
  /**
   * [Theme or themes](https://mui.com/toolpad/core/react-app-provider/#theming) to be used by the app in light/dark mode. A [CSS variables theme](https://mui.com/material-ui/customization/css-theme-variables/overview/) is recommended.
   * @default createDefaultTheme()
   */
  theme?: ReactNavigation.Theme;
  /**
   * Session info about the current user.
   * @default ruLocaleText
   */
  session?: Session | null;
}

function AppProvider(props: AppProviderProps) {
  const { children, theme } = props;
  const queryClient = new QueryClient();

  React.useEffect(() => {
    const eventSource = new EventSource(config.apiUrl + SSE_NEWS, {
      withCredentials: true,
    });

    eventSource.addEventListener("open", event => {
      console.log("Open SSE connection.", event);
    });

    eventSource.addEventListener(SseEvents.News as EventType<never>, event => {
      console.log(event);
      console.log("📰 News:", event.data);
    });

    eventSource.addEventListener("error", event => {
      if (event.type === "error") {
        console.error("Connection error:", event.message);
      } else if (event.type === "exception") {
        console.error("Error:", event.message, event.error);
      }
    });

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <SessionProvider>
            <ThemeProvider value={theme}>
              <GlobalSheetProvider>
                <DialogProvider>{children}</DialogProvider>
              </GlobalSheetProvider>
            </ThemeProvider>
          </SessionProvider>
        </QueryClientProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

export { AppProvider };
