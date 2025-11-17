import { deleteNotificationsTokenRequest } from '@/api/notifications/sendNotificationsToken';
import { api } from '@/config/axios';
import { registerForPushNotificationsAsync } from '@/helpers/pushNotifications/registerForPushNotificationsAsync';
import { User } from '@/types/user';
import {
	createContext,
	PropsWithChildren,
	use,
	useCallback,
	useEffect,
} from 'react';
import { useStorageState } from '../authentication/useStorageState';

const AuthContext = createContext<{
	signIn: (user: User) => void;
	signOut: () => void;
	updateUser: (partialUser: Partial<User>) => void;
	session?: User | null;
	isLoading: boolean;
}>({
	signIn: () => null,
	signOut: () => null,
	updateUser: () => null,
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
	const [[isLoading, sessionString], setSession] = useStorageState('session');
	const session: User | null = sessionString ? JSON.parse(sessionString) : null;

	const signOut = useCallback(async () => {
		try {
			await deleteNotificationsTokenRequest();
		} finally {
			setSession(null);
		}
	}, [setSession]);

	const signIn = useCallback(
		(user: User) => {
			setSession(JSON.stringify(user));
		},
		[setSession]
	);

	const updateUser = useCallback(
		(partialUser: Partial<User>) => {
			if (!session) return;

			const updated = {
				...session,
				currentSubscription: {
					...session.currentSubscription,
					...partialUser.currentSubscription,
				},
				...partialUser,
			};

			setSession(JSON.stringify(updated));
		},
		[session, setSession]
	);

	useEffect(() => {
		if (!session) return;

		registerForPushNotificationsAsync();
	}, [session]);
	useEffect(() => {
		const interceptor = api.interceptors.response.use(
			response => response,
			error => {
				if (error.response?.status === 403) {
					setSession(null);
				}
				return Promise.reject(error);
			}
		);

		return () => {
			api.interceptors.response.eject(interceptor);
		};
	}, []);

	return (
		<AuthContext
			value={{
				signIn,
				signOut,
				updateUser,
				session,
				isLoading,
			}}
		>
			{children}
		</AuthContext>
	);
}
