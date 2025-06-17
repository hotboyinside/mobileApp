import { DarkTheme, DefaultTheme } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import 'react-native-reanimated';

import { AppProvider } from '@/components/appProvider/AppProvider';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useState } from 'react';

export default function RootLayout() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const colorScheme = useColorScheme();
	const [loaded] = useFonts({
		SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
	});

	if (!loaded) {
		// Async font loading only occurs in development.
		return null;
	}

	console.log('isLoggedIn', isLoggedIn);

	return (
		<AppProvider theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
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
