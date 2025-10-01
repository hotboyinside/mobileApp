import { FiltersStore } from '@/types/filters';

export const defaultAdditionalFiltersSet: FiltersStore = {
	currentPrice: { enabled: false, range: { from: '', to: '' } },
	change: { enabled: false, range: { from: '', to: '' } },
	priceChange: { enabled: false, range: { from: '', to: '' } },
	currentVolume: { enabled: false, range: { from: '', to: '' } },
	float: { enabled: false, range: { from: '', to: '' } },
	currentDayRange: { enabled: false, range: { from: '', to: '' } },
};
