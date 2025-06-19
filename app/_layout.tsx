import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import "react-native-reanimated";

import { AppProvider } from "@/components/appProvider/AppProvider";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    MontserratRegular: require("../assets/fonts/Montserrat-Regular.ttf"),
    MontserratMedium: require("../assets/fonts/Montserrat-Medium.ttf"),
    MontserratSemiBold: require("../assets/fonts/Montserrat-SemiBold.ttf"),
    MontserratBold: require("../assets/fonts/Montserrat-Bold.ttf"),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <AppProvider theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        {/* {isLoggedIn ? (
					<>
						<Stack.Screen name='(tabs)' options={{ headerShown: false }} />
						<Stack.Screen name='+not-found' />
					</>
				) : ( */}
        <Stack.Screen
          name='login'
          options={{ headerShown: false }}
        ></Stack.Screen>
        {/* )} */}
      </Stack>
      {/* <StatusBar style='auto' /> */}
    </AppProvider>
  );
}
