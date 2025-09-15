import { filtersApplyClick } from '@/stores/allNews/model';
import { createEvent, createStore, sample } from 'effector';

export enum NewsTypesNames {
	News = 'news',
	Filings = 'filings',
}

export const NewsTypesLabels: Record<NewsTypesNames, string> = {
	[NewsTypesNames.News]: 'News',
	[NewsTypesNames.Filings]: 'Filings',
};

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
	clock: filtersApplyClick,
	source: $newsTypeDraft,
	target: $newsType,
});
