import { defaultAdditionalFiltersSet } from '@/constants/additionalFilters/defaultAdditionalFiltersSet';
import {
	AdditionalFilterKey,
	AdditionalFilterRange,
	AdditionalFiltersErrors,
	FiltersStore,
} from '@/types/filters';
import { createEvent, createStore, sample } from 'effector';
import { discardFiltersDraft, filtersApplyClick } from '../model';
import { getFiltersSnapshotFx, saveFilterFx } from './handlers';

export const $additionalFilters = createStore<FiltersStore | null>(null);
export const $additionalFiltersDraft = createStore<FiltersStore | null>(null);
export const $additionalFiltersErrors = createStore<AdditionalFiltersErrors>(
	{}
);

export const toggleFilterEnabled = createEvent<AdditionalFilterKey>();
export const updateFilterRange = createEvent<{
	key: AdditionalFilterKey;
	range: AdditionalFilterRange;
}>();
export const resetAdditionalFiltersDraft = createEvent();
export const setFilterError = createEvent<{
	key: AdditionalFilterKey;
	error: string;
}>();
export const resetFilterErrors = createEvent();

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

$additionalFiltersDraft.on(resetAdditionalFiltersDraft, _ => {
	return defaultAdditionalFiltersSet;
});
$additionalFiltersErrors.on(setFilterError, (state, { key, error }) => ({
	...state,
	[key]: error,
}));
$additionalFiltersErrors.on(resetFilterErrors, () => ({}));

sample({
	clock: getFiltersSnapshotFx.doneData,
	target: [$additionalFiltersDraft, $additionalFilters],
});

sample({
	clock: filtersApplyClick,
	source: $additionalFiltersDraft,
	target: [$additionalFilters, saveFilterFx],
});

sample({
	clock: discardFiltersDraft,
	source: $additionalFilters,
	target: $additionalFiltersDraft,
});

sample({
	clock: discardFiltersDraft,
	fn: () => {
		return {};
	},
	target: $additionalFiltersErrors,
});
