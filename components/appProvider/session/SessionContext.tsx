import { use, createContext, type PropsWithChildren, useEffect } from 'react';
import { useStorageState } from '../authentication/useStorageState';
import { User } from '@/types/user';
import { getExpoPushTokenAsync } from 'expo-notifications';
import {
	sendNotificationsTokenRequest,
	Platform,
} from '@/config/api/sendNotificationsToken';
import { Platform as RNPlatform } from 'react-native';

const AuthContext = createContext<{
	signIn: (user: User) => void;
	signOut: () => void;
	session?: string | null;
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
		throw new Error('useSession must be wrapped in a <SessionProvider />');
	}

	return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
	const [[isLoading, session], setSession] = useStorageState('session');

	useEffect(() => {
		const syncDeviceToken = async () => {
			if (!session) return;

			try {
				const deviceToken = await getExpoPushTokenAsync();

				if (deviceToken) {
					await sendNotificationsTokenRequest({
						deviceToken: deviceToken.data,
						platform: RNPlatform.OS as Platform,
					});
				}
			} catch (err) {
				console.warn('Something went wrong...', err);
			}
		};

		syncDeviceToken();
	}, [session]);

	return (
		<AuthContext
			value={{
				signIn: (user: User) => {
					setSession(JSON.stringify(user));
				},
				signOut: () => {
					setSession(null);
				},
				session,
				isLoading,
			}}
		>
			{children}
		</AuthContext>
	);
}
