import { FiltersStore } from '@/types/filters';

export const defaultAdditionalFiltersSet: FiltersStore = {
	currentPrice: { enabled: false, range: { from: '', to: '' } },
	change: { enabled: false, range: { from: '', to: '' } },
	dollarChange: { enabled: false, range: { from: '', to: '' } },
	volume: { enabled: false, range: { from: '', to: '' } },
	float: { enabled: false, range: { from: '', to: '' } },
	dayRange: { enabled: false, range: { from: '', to: '' } },
};
