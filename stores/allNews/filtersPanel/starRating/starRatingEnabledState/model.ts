import { StarNumberStateKey, StarRatingEnabledState } from '@/types/starRating';
import { combine, createEvent, createStore, sample } from 'effector';

const defaultStarRatingEnabledState = {
	0: true,
	1: true,
	2: true,
	3: true,
	4: true,
};

export const $starRatingEnabledState = createStore<StarRatingEnabledState>(
	defaultStarRatingEnabledState
);
export const $draftStarRatingEnabledState = createStore<StarRatingEnabledState>(
	defaultStarRatingEnabledState
);
export const $isStarRatingEnabledStateChanged = combine(
	$starRatingEnabledState,
	$draftStarRatingEnabledState,
	(base, draft) => {
		return JSON.stringify(base) !== JSON.stringify(draft);
	}
);

export const toggleDraftStarRatingEnabledState =
	createEvent<StarNumberStateKey>();
export const applyDraftStarRatingEnabledState = createEvent();

$draftStarRatingEnabledState.on(
	toggleDraftStarRatingEnabledState,
	(state, payload) => {
		return { ...state, [payload]: !state[payload] };
	}
);

sample({
	clock: applyDraftStarRatingEnabledState,
	source: $draftStarRatingEnabledState,
	target: $starRatingEnabledState,
});
