import { AdditionalFilterKey, FiltersStore, Range } from '@/types/filters';
import { createEvent, createStore, sample } from 'effector';
import { getFiltersSnapshotFx, saveFilterFx } from './handlers';
import { pageMounted, filtersApplyClick } from '@/stores/allNews/model';

export const $additionalFilters = createStore<FiltersStore | null>(null);
export const $additionalFiltersDraft = createStore<FiltersStore | null>(null);

export const toggleFilterEnabled = createEvent<AdditionalFilterKey>();
export const updateFilterRange = createEvent<{
	key: AdditionalFilterKey;
	range: Range;
}>();
export const resetDraftFilters = createEvent();

$additionalFiltersDraft.on(toggleFilterEnabled, (state, key) => {
	if (!state) return state;

	return {
		...state,
		[key]: {
			...state[key],
			enabled: !state[key].enabled,
			range: state[key].enabled ? { from: '', to: '' } : state[key].range,
		},
	};
});

$additionalFiltersDraft.on(updateFilterRange, (state, { key, range }) => {
	if (!state) return state;

	return {
		...state,
		[key]: {
			...state[key],
			range: range,
		},
	};
});

sample({
	clock: pageMounted,
	target: getFiltersSnapshotFx,
});

sample({
	clock: getFiltersSnapshotFx.doneData,
	target: [$additionalFiltersDraft, $additionalFilters],
});

sample({
	clock: resetDraftFilters,
	source: $additionalFilters,
	target: $additionalFiltersDraft,
});

sample({
	clock: filtersApplyClick,
	source: $additionalFiltersDraft,
	target: [$additionalFilters, saveFilterFx],
});
