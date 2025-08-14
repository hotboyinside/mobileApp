import { FILTER_LABELS, FilterKey, FiltersStore } from '@/types/filters';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createEffect } from 'effector';

const PREFIX = 'all-news-filters';

export const INITIAL_FILTERS: FiltersStore = {
	currentPrice: { enabled: false, range: { from: '', to: '' } },
	change: { enabled: false, range: { from: '', to: '' } },
	dollarChange: { enabled: false, range: { from: '', to: '' } },
	volume: { enabled: false, range: { from: '', to: '' } },
	float: { enabled: false, range: { from: '', to: '' } },
	dayRange: { enabled: false, range: { from: '', to: '' } },
};

export const getFiltersSnapshotFx = createEffect(
	async (): Promise<FiltersStore> => {
		const filterStore = { ...INITIAL_FILTERS };
		try {
			Object.keys(FILTER_LABELS).map(async filterLabel => {
				const [filterValueFrom, filterValueTo] = await Promise.all([
					AsyncStorage.getItem(`${PREFIX}-${filterLabel}-from`),
					AsyncStorage.getItem(`${PREFIX}-${filterLabel}-to`),
				]);

				if (filterValueFrom || filterValueTo) {
					filterStore[filterLabel as FilterKey].enabled = true;
					filterStore[filterLabel as FilterKey].range.from =
						filterValueFrom ?? '';
					filterStore[filterLabel as FilterKey].range.to = filterValueTo ?? '';
				}
			});
		} catch (error) {
			console.error('Error retrieving filters data', error);
		} finally {
			return filterStore;
		}
	}
);

export const saveFilterFx = createEffect(async (filters: FiltersStore) => {
	try {
		for (const [key, filter] of Object.entries(filters)) {
			if (filter.enabled) {
				await AsyncStorage.setItem(`${PREFIX}-${key}-from`, filter.range.from);
				await AsyncStorage.setItem(`${PREFIX}-${key}-to`, filter.range.to);
			} else {
				await AsyncStorage.removeItem(`${PREFIX}-${key}-from`);
				await AsyncStorage.removeItem(`${PREFIX}-${key}-to`);
			}
		}
	} catch (error) {
		console.error('Error saving filters', error);
	}
});
