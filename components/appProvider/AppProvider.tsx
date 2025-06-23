'use client';
import { ThemeProvider } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { DialogProvider } from './dialog/DialogProvider';
export interface NavigateOptions {
	history?: 'auto' | 'push' | 'replace';
}

export interface Navigate {
	(url: string | URL, options?: NavigateOptions): void;
}

/**
 * Abstract router used by Toolpad components.
 */

export interface Session {
	user?: {
		id?: string | null;
		name?: string | null;
		image?: string | null;
		email?: string | null;
	};
}

export interface Authentication {
	signIn: () => void;
	signOut: () => void;
}

export const AuthenticationContext = React.createContext<Authentication | null>(
	null
);

export const SessionContext = React.createContext<Session | null>(null);

export interface AppProviderProps {
	/**
	 * The content of the app provider.
	 */
	children: React.ReactNode;
	/**
	 * [Theme or themes](https://mui.com/toolpad/core/react-app-provider/#theming) to be used by the app in light/dark mode. A [CSS variables theme](https://mui.com/material-ui/customization/css-theme-variables/overview/) is recommended.
	 * @default createDefaultTheme()
	 */
	theme?: ReactNavigation.Theme;
	/**
	 * Session info about the current user.
	 * @default ruLocaleText
	 */
	session?: Session | null;
	/**
	 * Authentication methods.
	 * @default null
	 */
	authentication?: Authentication | null;
}

function AppProvider(props: AppProviderProps) {
	const { children, authentication = null, session = null, theme } = props;
	const queryClient = new QueryClient();

	return (
		<SafeAreaProvider>
			<QueryClientProvider client={queryClient}>
				<AuthenticationContext value={authentication}>
					<SessionContext value={session}>
						<ThemeProvider value={theme}>
							<DialogProvider>{children}</DialogProvider>
						</ThemeProvider>
					</SessionContext>
				</AuthenticationContext>
			</QueryClientProvider>
		</SafeAreaProvider>
	);
}

export { AppProvider };
