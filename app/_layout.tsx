// import '@/i18n';
import { DarkTheme, DefaultTheme } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import 'react-native-reanimated';

import { AppProvider } from '@/components/appProvider/AppProvider';
import { useColorScheme } from '@/hooks/useColorScheme';
import { SplashScreenController } from '@/components/splash/SplashScreenController';
import { useSession } from '@/components/appProvider/session/SessionContext';
import {
	subscribeToSseEventNews,
	closeToSseEventNews,
} from '@/stores/sse/model';
import { useEffect, useRef } from 'react';
import { tick } from '@/stores/allNews/globalTick/model';
import { connectSocketEvent } from '@/stores/socket/model';
import { AppState } from 'react-native';
import { useUnit } from 'effector-react';
import { $appState, appStateChanged } from '@/stores/appState/model';

export default function RootLayout() {
	const colorScheme = useColorScheme();
	const [loaded] = useFonts({
		MontserratRegular: require('../assets/fonts/Montserrat-Regular.ttf'),
		MontserratMedium: require('../assets/fonts/Montserrat-Medium.ttf'),
		MontserratSemiBold: require('../assets/fonts/Montserrat-SemiBold.ttf'),
		MontserratBold: require('../assets/fonts/Montserrat-Bold.ttf'),
	});
	const appStateRef = useRef(AppState.currentState);
	const appState = useUnit($appState)
	const onAppStateChanged = useUnit(appStateChanged);

	useEffect(() => {
		if (appState === "active") {
    	subscribeToSseEventNews();
    	connectSocketEvent();
  	}

		return () => {
			closeToSseEventNews();
		};
	}, [appState]);

	useEffect(() => {
		const interval = setInterval(() => tick(), 60000);
		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
		const subscription = AppState.addEventListener("change", nextState => {
			onAppStateChanged(nextState);
			appStateRef.current = nextState;
    });

		return () => subscription.remove()
	}, [])

	if (!loaded) return null;

	return (
		<AppProvider theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
			<SplashScreenController />
			<RootNavigator />
		</AppProvider>
	);
}

function RootNavigator() {
	const { session } = useSession();
	const isEmptySession = Object.keys(session ?? {}).length === 0;

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
