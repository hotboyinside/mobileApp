export type AdditionalFilterKey =
	| 'currentPrice'
	| 'change'
	| 'priceChange'
	| 'currentVolume'
	| 'float'
	| 'currentDayRange';

export const additionalFiltersLabels: Record<AdditionalFilterKey, string> = {
	currentPrice: 'Current Price',
	change: 'Change',
	priceChange: '$ Change',
	currentVolume: 'Volume',
	float: 'Float',
	currentDayRange: 'Day Range',
};

export type AdditionalFilterRange = { from: string; to: string };

type AdditionalFilterValue = { enabled: boolean; range: AdditionalFilterRange };

export type FiltersStore = Record<AdditionalFilterKey, AdditionalFilterValue>;
