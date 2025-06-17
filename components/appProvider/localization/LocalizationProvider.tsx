'use client';
import { euLocaleText } from '@/locales/eu';
import { ReactNode, useCallback, useContext, useMemo, useState } from 'react';
import { LocalizationContext } from './LocalizationContext';
import { LocaleText } from './types/localization.types';

export interface LocalizationProviderProps {
	children?: ReactNode;
	localeText?: Partial<LocaleText>;
}

export const LocalizationProvider = ({
	localeText: initialLocaleText = euLocaleText,
	children,
}: LocalizationProviderProps) => {
	const [localeText, setLocaleText] =
		useState<Partial<LocaleText>>(initialLocaleText);

	const setLocalization = useCallback((newLocalText: Partial<LocaleText>) => {
		setLocaleText(newLocalText);
	}, []);

	const contextValue = useMemo(
		() => ({ localeText, setLocalization }),
		[localeText, setLocalization]
	);

	return (
		<LocalizationContext value={contextValue}>{children}</LocalizationContext>
	);
};

export function useLocaleText() {
	const context = useContext(LocalizationContext);
	if (!context) {
		throw new Error('useLocaleText must be used within a LocalizationProvider');
	}
	return context;
}
