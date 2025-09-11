// import '@/i18n';
import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import "react-native-reanimated";

import { AppProvider } from "@/components/appProvider/AppProvider";
import { useColorScheme } from "@/hooks/useColorScheme";
import { SplashScreenController } from "@/components/splash/SplashScreenController";
import { useSession } from "@/components/appProvider/session/SessionContext";
import {
  subscribeToSseEventNews,
  addListener,
  SseEvents,
  closeToSseEventNews,
} from "@/stores/sse/model";
import { useEffect } from "react";
import { addNewsFromSseEvent } from "@/stores/allNews/news/model";
import { tick } from "@/stores/allNews/globalTick/model";
import { connectSocketEvent } from "@/stores/socket/model";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    MontserratRegular: require("../assets/fonts/Montserrat-Regular.ttf"),
    MontserratMedium: require("../assets/fonts/Montserrat-Medium.ttf"),
    MontserratSemiBold: require("../assets/fonts/Montserrat-SemiBold.ttf"),
    MontserratBold: require("../assets/fonts/Montserrat-Bold.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <AppProvider theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <SplashScreenController />
      <RootNavigator />
    </AppProvider>
  );
}

function RootNavigator() {
  const { session } = useSession();
  const isEmptySession = Object.keys(session ?? {}).length === 0;

  useEffect(() => {
    if (!session) return;
    subscribeToSseEventNews();
    connectSocketEvent();

    return () => {
      closeToSseEventNews();
    };
  }, [session]);

  useEffect(() => {
    const interval = setInterval(() => tick(), 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Protected guard={!isEmptySession}>
        <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
      </Stack.Protected>

      <Stack.Protected guard={isEmptySession}>
        <Stack.Screen name='sign-in' options={{ headerShown: false }} />
      </Stack.Protected>

      {/* <Stack.Protected guard={true}>
        <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
      </Stack.Protected> */}
    </Stack>
  );
}
