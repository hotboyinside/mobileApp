import { createContext } from 'react';
import { LocaleText } from './types/localization.types';

export interface ILocalizationContext {
	localeText: Partial<LocaleText>;
	setLocalization: (localization: LocaleText) => void;
}

export const LocalizationContext = createContext<ILocalizationContext | null>(
	null
);
