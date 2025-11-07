// import '@/i18n';
import { AppProvider } from '@/components/appProvider/AppProvider';
import { useSession } from '@/components/appProvider/session/SessionContext';
import { SplashScreenController } from '@/components/splash/SplashScreenController';
import { useNotificationObserver } from '@/hooks/useNotifications';
import { $appState, appStateChanged } from '@/stores/appState/model';
import { connectSocketEvent, disconnectSocketEvent } from '@/stores/socket';
import {
	closeToSseEventNews,
	subscribeToSseEventNews,
} from '@/stores/sse/model';
import { loadAppThemeFx } from '@/stores/userSettings/theme';
import { useUnit } from 'effector-react';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect, useRef } from 'react';
import { AppState } from 'react-native';
import 'react-native-reanimated';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const appStateRef = useRef(AppState.currentState);

	const appState = useUnit($appState);
	const onSubscribeToSseEventNews = useUnit(subscribeToSseEventNews);
	const onCloseToSseEventNews = useUnit(closeToSseEventNews);
	const onAppStateChanged = useUnit(appStateChanged);

	const [loaded] = useFonts({
		MontserratRegular: require('../assets/fonts/Montserrat-Regular.ttf'),
		MontserratMedium: require('../assets/fonts/Montserrat-Medium.ttf'),
		MontserratSemiBold: require('../assets/fonts/Montserrat-SemiBold.ttf'),
		MontserratBold: require('../assets/fonts/Montserrat-Bold.ttf'),
	});

	useEffect(() => {
		if (appState === 'active') {
			onSubscribeToSseEventNews();
		}

		return () => {
			onCloseToSseEventNews();
		};
	}, [appState]);

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

	const onConnectSocketEvent = useUnit(connectSocketEvent);
	const onDisconnectSocketEvent = useUnit(disconnectSocketEvent);

	useEffect(() => {
		if (isLoading) return;
		if (session && !isEmptySession) {
			onConnectSocketEvent();
			return () => {
				onDisconnectSocketEvent();
			};
		}
	}, [session, isEmptySession, isLoading]);

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
