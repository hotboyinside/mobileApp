import { initialStarRating } from '@/constants/starRatingDefaultSet';
import { StarRatingChangeEvent, StarRatingKeywords } from '@/types/starRating';
import { createEvent, createStore, sample } from 'effector';

export const $starRatingKeywords =
	createStore<StarRatingKeywords>(initialStarRating);
export const $draftStarRatingKeywords =
	createStore<StarRatingKeywords>(initialStarRating);

export const setStarRatingKeywords = createEvent<StarRatingKeywords>();
export const addDraftStarRatingKeyword = createEvent<StarRatingChangeEvent>();
export const deleteDraftStarRatingKeyword =
	createEvent<StarRatingChangeEvent>();

$draftStarRatingKeywords.on(addDraftStarRatingKeyword, (state, payload) => {
	return {
		...state,
		[payload.changeableStar]: [...state[payload.changeableStar], payload.word],
	};
});

$draftStarRatingKeywords.on(deleteDraftStarRatingKeyword, (state, payload) => {
	const starRatingWithDeletedKeyword = state[payload.changeableStar].filter(
		keyword => keyword !== payload.word
	);

	return {
		...state,
		[payload.changeableStar]: [...starRatingWithDeletedKeyword],
	};
});

$starRatingKeywords.on(setStarRatingKeywords, (_, payload) => payload);

sample({
	clock: setStarRatingKeywords,
	target: $draftStarRatingKeywords,
});

$draftStarRatingKeywords.watch(state => console.log(state));
