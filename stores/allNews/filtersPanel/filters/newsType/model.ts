import { NewsTypesLabels, NewsTypesNames } from '@/types/newsType';
import { createEvent, createStore, sample } from 'effector';
import { discardFiltersDraft, filtersApplyClick } from '../model';
import { getNewsTypesSnapshotFx, saveNewsTypesFx } from './handlers';

export const getNewsTypeLabel = (value: NewsTypesNames): string =>
	NewsTypesLabels[value];

export const $newsType = createStore<NewsTypesNames[]>([]);
export const $newsTypeDraft = createStore<NewsTypesNames[]>([]);

export const toggleNewsTypeDraft = createEvent<NewsTypesNames>();
export const removeNewsTypeFromDraft = createEvent<NewsTypesNames>();
export const resetNewsTypeDraft = createEvent();

$newsTypeDraft.on(toggleNewsTypeDraft, (state, payload) => {
	if (state.includes(payload)) {
		return state.filter(val => val !== payload);
	}
	return [...state, payload];
});
$newsTypeDraft.on(removeNewsTypeFromDraft, (state, payload) =>
	state.filter(value => value !== payload)
);
$newsTypeDraft.on(resetNewsTypeDraft, _ => []);

sample({
	clock: getNewsTypesSnapshotFx.doneData,
	target: [$newsType, $newsTypeDraft],
});

sample({
	clock: filtersApplyClick,
	source: $newsTypeDraft,
	target: [$newsType, saveNewsTypesFx],
});

sample({
	clock: discardFiltersDraft,
	source: $newsType,
	target: $newsTypeDraft,
});
