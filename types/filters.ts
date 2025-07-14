export type FilterKey =
	| 'currentPrice'
	| 'change'
	| 'dollarChange'
	| 'volume'
	| 'float'
	| 'dayRange';

export const FILTER_LABELS: Record<FilterKey, string> = {
	currentPrice: 'Current Price',
	change: 'Change',
	dollarChange: '$ Change',
	volume: 'Volume',
	float: 'Float',
	dayRange: 'Day Range',
};

export type Range = { from: string; to: string };

type FilterState = { enabled: boolean; range: Range };

export type FiltersStore = Record<FilterKey, FilterState>;
