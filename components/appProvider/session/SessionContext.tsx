import { use, createContext, type PropsWithChildren } from 'react';
import { useStorageState } from '../authentication/useStorageState';

const AuthContext = createContext<{
	signIn: (user: any) => void;
	signOut: () => void;
	session?: string | null;
	isLoading: boolean;
}>({
	signIn: () => null,
	signOut: () => null,
	session: null,
	isLoading: false,
});

// This hook can be used to access the user info.
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
				signIn: (user: any) => {
					console.log('user', user);
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
