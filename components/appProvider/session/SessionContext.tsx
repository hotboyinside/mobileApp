import { use, createContext, type PropsWithChildren } from 'react';
import { useStorageState } from '../authentication/useStorageState';
import { User } from '@/types/user';

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
