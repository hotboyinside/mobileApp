import { initialStarRating } from '@/constants/starRatingDefaultSet';
import { StarRatingChangeEvent, StarRatingKeywords } from '@/types/starRating';
import { createEvent, createStore } from 'effector';

export const $starRatingKeywords =
	createStore<StarRatingKeywords>(initialStarRating);
export const $draftStarRatingKeywords =
	createStore<StarRatingKeywords>(initialStarRating);

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
