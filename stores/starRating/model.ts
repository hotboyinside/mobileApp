import {
	DefaultStarRatingSet,
	initialStarRating,
} from '@/constants/starRatingDefaultSet';
import {
	StarNumber,
	StarRatingChangeEvent,
	StarRatingKeywords,
} from '@/types/starRating';
import { combine, createEvent, createStore, sample } from 'effector';
import {
	changeUserInputKeyword,
	showDuplicateError,
} from '../allNews/filtersPanel/starRating/model';
import { pageMounted } from '../allNews/model';
import { getStarRatingFx, updateStarRatingFx } from './handlers';

export const $starRatingKeywords =
	createStore<StarRatingKeywords>(initialStarRating);
export const $draftStarRatingKeywords =
	createStore<StarRatingKeywords>(initialStarRating);

export const openEditStarRating = createEvent();
export const setStarRatingKeywords = createEvent<StarRatingKeywords>();
export const addDraftStarRatingKeyword = createEvent<StarRatingChangeEvent>();
export const deleteDraftStarRatingKeyword =
	createEvent<StarRatingChangeEvent>();
export const clearDraftStarRatingKeywordsByStar = createEvent<StarNumber>();
export const resetToDefaultStarRatingKeywords = createEvent();
export const saveDraftStarRatingKeyword = createEvent();

$starRatingKeywords.on(setStarRatingKeywords, (_, payload) => payload);
$draftStarRatingKeywords.on(deleteDraftStarRatingKeyword, (state, payload) => {
	const starRatingWithDeletedKeyword = state[payload.changeableStar].filter(
		keyword => keyword !== payload.word
	);

	return {
		...state,
		[payload.changeableStar]: [...starRatingWithDeletedKeyword],
	};
});
export const $isStarRatingChanged = combine(
	$starRatingKeywords,
	$draftStarRatingKeywords,
	(saved, draft) => {
		const savedStr = JSON.stringify(saved);
		const draftStr = JSON.stringify(draft);

		return savedStr !== draftStr;
	}
);

$draftStarRatingKeywords.on(
	clearDraftStarRatingKeywordsByStar,
	(state, payload) => ({
		...state,
		[payload]: [],
	})
);

$draftStarRatingKeywords.on(
	resetToDefaultStarRatingKeywords,
	_ => DefaultStarRatingSet.userRating.keywordsByStar
);

sample({
	clock: pageMounted,
	target: getStarRatingFx,
});

getStarRatingFx.done.watch(({ result }) => {
	setStarRatingKeywords(result.userRating!.keywordsByStar);
});

updateStarRatingFx.done.watch(() => saveDraftStarRatingKeyword());
updateStarRatingFx.fail.watch(({ error }: { error: any }) => {});

sample({
	clock: openEditStarRating,
	source: $starRatingKeywords,
	target: $draftStarRatingKeywords,
});

sample({
	clock: setStarRatingKeywords,
	target: $draftStarRatingKeywords,
});

sample({
	clock: addDraftStarRatingKeyword,
	fn: ({ changeableStar }) => ({ star: changeableStar, text: '' }),
	target: changeUserInputKeyword,
});

sample({
	clock: addDraftStarRatingKeyword,
	source: $draftStarRatingKeywords,
	filter: (state, { changeableStar, word }) => {
		const trimmedWord = word.trim();
		return (
			trimmedWord !== '' &&
			Object.values(state).some(keywords =>
				keywords.some(
					(keyword: string) =>
						keyword.toLowerCase() === trimmedWord.toLowerCase()
				)
			)
		);
	},
	fn: (_, { changeableStar, word }) => ({
		star: changeableStar,
		message: `Word "${word.trim()}" already exists in another rating`,
	}),
	target: showDuplicateError,
});

sample({
	clock: addDraftStarRatingKeyword,
	source: $draftStarRatingKeywords,
	fn: (state, { changeableStar, word }) => {
		const trimmedWord = word.trim();
		if (
			trimmedWord === '' ||
			Object.values(state).some(keywords =>
				keywords.some(
					(keyword: string) =>
						keyword.toLowerCase() === trimmedWord.toLowerCase()
				)
			)
		) {
			return state;
		}

		return {
			...state,
			[changeableStar]: [...state[changeableStar], trimmedWord],
		};
	},
	target: $draftStarRatingKeywords,
});

sample({
	clock: saveDraftStarRatingKeyword,
	source: $draftStarRatingKeywords,
	target: $starRatingKeywords,
});
