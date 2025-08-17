import { createEvent, createStore, sample } from 'effector';
import { filtersApplyClick } from '../../model';

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

const defaultNewsType = [NewsTypesNames.News, NewsTypesNames.Filings];

export const $newsType = createStore<NewsTypesNames[]>(defaultNewsType);
export const $newsTypeDraft = createStore<NewsTypesNames[]>(defaultNewsType);

export const changeNewsTypeDraft = createEvent<NewsTypesNames[]>();
export const removeNewsTypeFromDraft = createEvent<NewsTypesNames>();
export const resetNewsTypeDraft = createEvent();

$newsTypeDraft.on(changeNewsTypeDraft, (_, payload) => payload);
$newsTypeDraft.on(removeNewsTypeFromDraft, (state, payload) =>
	state.filter(value => value !== payload)
);

sample({
	clock: filtersApplyClick,
	source: $newsTypeDraft,
	target: $newsType,
});

sample({
	clock: resetNewsTypeDraft,
	source: $newsType,
	target: $newsTypeDraft,
});
