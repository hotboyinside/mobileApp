import '@/i18n';
import { DarkTheme, DefaultTheme } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import 'react-native-reanimated';

import { AppProvider } from '@/components/appProvider/AppProvider';
import { useColorScheme } from '@/hooks/useColorScheme';
import { SplashScreenController } from '@/components/splash/SplashScreenController';
import { useSession } from '@/components/appProvider/session/SessionContext';

export default function RootLayout() {
	const colorScheme = useColorScheme();
	const [loaded] = useFonts({
		MontserratRegular: require('../assets/fonts/Montserrat-Regular.ttf'),
		MontserratMedium: require('../assets/fonts/Montserrat-Medium.ttf'),
		MontserratSemiBold: require('../assets/fonts/Montserrat-SemiBold.ttf'),
		MontserratBold: require('../assets/fonts/Montserrat-Bold.ttf'),
	});

	if (!loaded) {
		// Async font loading only occurs in development.
		return null;
	}

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
		<Stack>
			<Stack.Protected guard={!isEmptySession}>
				<Stack.Screen name='(tabs)' options={{ headerShown: false }} />
			</Stack.Protected>

			<Stack.Protected guard={isEmptySession}>
				<Stack.Screen name='sign-in' options={{ headerShown: false }} />
			</Stack.Protected>
		</Stack>
	);
}
