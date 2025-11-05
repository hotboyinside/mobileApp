// import '@/i18n';
import { AppProvider } from '@/components/appProvider/AppProvider';
import { useSession } from '@/components/appProvider/session/SessionContext';
import { SplashScreenController } from '@/components/splash/SplashScreenController';
import {
	closeToSseEventNews,
	subscribeToSseEventNews,
} from '@/stores/sse/model';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect, useRef } from 'react';
import 'react-native-reanimated';
// import { tick } from "@/stores/allNews/globalTick/model";
import { useNotificationObserver } from '@/hooks/useNotifications';
import { $appState, appStateChanged } from '@/stores/appState/model';
import { connectSocketEvent, disconnectSocketEvent } from '@/stores/socket';
import { loadAppThemeFx } from '@/stores/userSettings/theme';
import { useUnit } from 'effector-react';
import { AppState } from 'react-native';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const { session, isLoading } = useSession();
	const appStateRef = useRef(AppState.currentState);
	const appState = useUnit($appState);
	const onAppStateChanged = useUnit(appStateChanged);
	const onSubscribeToSseEventNews = useUnit(subscribeToSseEventNews);
	const onConnectSocketEvent = useUnit(connectSocketEvent);
	const onDisconnectSocketEvent = useUnit(disconnectSocketEvent);
	const onCloseToSseEventNews = useUnit(closeToSseEventNews);

	const [loaded] = useFonts({
		MontserratRegular: require('../assets/fonts/Montserrat-Regular.ttf'),
		MontserratMedium: require('../assets/fonts/Montserrat-Medium.ttf'),
		MontserratSemiBold: require('../assets/fonts/Montserrat-SemiBold.ttf'),
		MontserratBold: require('../assets/fonts/Montserrat-Bold.ttf'),
	});

	useEffect(() => {
		onSubscribeToSseEventNews();
		onConnectSocketEvent();

		return () => {
			onCloseToSseEventNews();
			onDisconnectSocketEvent();
		};
	}, [appState, session, isLoading]);

	// useEffect(() => {
	//   const interval = setInterval(() => tick(), 60000);
	//   return () => clearInterval(interval);
	// }, []);

	useEffect(() => {
		const subscription = AppState.addEventListener('change', nextState => {
			onAppStateChanged(nextState);
			appStateRef.current = nextState;
		});

		return () => subscription.remove();
	}, []);

	useEffect(() => {
		loadAppThemeFx();
	}, []);

	if (!loaded) return null;

	return (
		<AppProvider>
			<SplashScreenController />
			<RootNavigator />
		</AppProvider>
	);
}

function RootNavigator() {
	const { session, isLoading } = useSession();
	const isEmptySession = Object.keys(session ?? {}).length === 0;

	useNotificationObserver();

	if (isLoading) {
		return null;
	}

	return (
		<Stack
			screenOptions={{
				headerShown: false,
				animation: 'none',
			}}
		>
			<Stack.Protected guard={!isEmptySession}>
				<Stack.Screen name='(tabs)' options={{ headerShown: false }} />
			</Stack.Protected>

			<Stack.Protected guard={isEmptySession}>
				<Stack.Screen name='sign-in' options={{ headerShown: false }} />
			</Stack.Protected>
		</Stack>
	);
}
