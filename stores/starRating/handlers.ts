import {
	getUserStarRatingRequest,
	updateUserStarRatingRequest,
} from '@/config/api/userStarRating';
import { DefaultStarRatingSet } from '@/constants/starRatingDefaultSet';
import { StarRatingKeywords } from '@/types/starRating';
import { createEffect } from 'effector';

export const getStarRatingFx = createEffect(async () => {
	const result = await getUserStarRatingRequest();
	if (result.data.success.userRating) {
		return result.data.success;
	}
	return DefaultStarRatingSet;
});

export const updateStarRatingFx = createEffect(
	async ({
		starRating,
		modificationCount,
	}: {
		starRating: StarRatingKeywords;
		modificationCount: number;
	}) => {
		const result = await updateUserStarRatingRequest(
			starRating,
			modificationCount
		);
		if (!result) throw new Error('something went wrong...');
		return result;
	}
);
