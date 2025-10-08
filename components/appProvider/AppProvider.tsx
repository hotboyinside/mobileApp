'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as React from 'react';
import { DialogProvider } from './dialog/DialogProvider';
import { SessionProvider } from './session/SessionContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { GlobalSheetProvider } from './sheetModal/GlobalSheetProvider';
export interface NavigateOptions {
	history?: 'auto' | 'push' | 'replace';
}

export interface Navigate {
	(url: string | URL, options?: NavigateOptions): void;
}

export interface AppProviderProps {
	children: React.ReactNode;
}

function AppProvider(props: AppProviderProps) {
	const { children } = props;
	const queryClient = new QueryClient();

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<QueryClientProvider client={queryClient}>
				<SessionProvider>
					<GlobalSheetProvider>
						<DialogProvider>{children}</DialogProvider>
					</GlobalSheetProvider>
				</SessionProvider>
			</QueryClientProvider>
		</GestureHandlerRootView>
	);
}

export { AppProvider };
