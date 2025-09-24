export type AdditionalFilterKey =
	| 'currentPrice'
	| 'change'
	| 'dollarChange'
	| 'volume'
	| 'float'
	| 'dayRange';

export const additionalFiltersLabels: Record<AdditionalFilterKey, string> = {
	currentPrice: 'Current Price',
	change: 'Change',
	dollarChange: '$ Change',
	volume: 'Volume',
	float: 'Float',
	dayRange: 'Day Range',
};

export type AdditionalFilterRange = { from: string; to: string };

type AdditionalFilterValue = { enabled: boolean; range: AdditionalFilterRange };

export type FiltersStore = Record<AdditionalFilterKey, AdditionalFilterValue>;
