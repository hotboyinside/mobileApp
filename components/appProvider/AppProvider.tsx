'use client';
import { euLocaleText } from '@/locales/eu';
import { ThemeProvider } from '@react-navigation/native';
import * as React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { DialogProvider } from './dialog/DialogProvider';
import { LocalizationProvider } from './localization/LocalizationProvider';
import { LocaleText } from './localization/types/localization.types';

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
	 * Locale text for components
	 */
	localeText?: Partial<LocaleText>;
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
	const {
		children,
		localeText = euLocaleText,
		authentication = null,
		session = null,
		theme,
	} = props;

	return (
		<SafeAreaProvider>
			<AuthenticationContext value={authentication}>
				<SessionContext value={session}>
					<ThemeProvider value={theme}>
						<LocalizationProvider localeText={localeText}>
							<DialogProvider>{children}</DialogProvider>
						</LocalizationProvider>
					</ThemeProvider>
				</SessionContext>
			</AuthenticationContext>
		</SafeAreaProvider>
	);
}

export { AppProvider };
