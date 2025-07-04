import { SplashScreen } from 'expo-router';
import { useSession } from '../appProvider/session/SessionContext';

export function SplashScreenController() {
	const { isLoading } = useSession();

	if (!isLoading) {
		SplashScreen.hideAsync();
	}

	return null;
}
