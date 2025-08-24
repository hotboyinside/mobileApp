import {
	SortLabels,
	SortByStore,
	sortMapping,
	sortByStoreDefault,
} from '@/types/sortBy';
import { combine, createEvent, createStore, sample } from 'effector';
import {
	FilterTabVariant,
	addSelectedTabFilters,
	removeSelectedTabFilters,
} from '../model';

export const $sortBy = createStore<SortByStore>(sortByStoreDefault);
export const $sortByDraft = createStore<SortLabels>(SortLabels.NewestFirst);
export const $isSortDefault = $sortBy.map(
	sortValue => sortValue.currentLabel === sortByStoreDefault.currentLabel
);
export const $isSortByChanged = combine(
	$sortBy,
	$sortByDraft,
	(sortBy, sortByDraft) => sortBy.currentLabel !== sortByDraft
);

export const updateSortingDraft = createEvent<SortLabels>();
export const resetSortingDraft = createEvent();

export const applySortingClick = createEvent();
export const closeSortByClick = createEvent();

$sortByDraft.on(updateSortingDraft, (_, payload) => {
	return payload;
});

$sortByDraft.on(resetSortingDraft, () => SortLabels.NewestFirst);

sample({
	clock: applySortingClick,
	source: $sortByDraft,
	fn(sortingLabel, _) {
		return sortMapping[sortingLabel] ?? sortByStoreDefault;
	},
	target: $sortBy,
});

sample({
	clock: closeSortByClick,
	source: $sortBy,
	fn(sortingValue, _) {
		return sortingValue.currentLabel;
	},
	target: $sortByDraft,
});

sample({
	source: $sortBy,
	filter: sortBy => sortBy.currentLabel !== SortLabels.NewestFirst,
	fn: () => FilterTabVariant.sort,
	target: addSelectedTabFilters,
});

sample({
	source: $sortBy,
	filter: sortBy => sortBy.currentLabel === SortLabels.NewestFirst,
	fn: () => FilterTabVariant.sort,
	target: removeSelectedTabFilters,
});
