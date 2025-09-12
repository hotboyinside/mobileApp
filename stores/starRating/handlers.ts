import { getUserStarRatingRequest } from '@/config/api/userStarRating';
import { DefaultStarRatingSet } from '@/constants/starRatingDefaultSet';
import { createEffect } from 'effector';
import { setStarRatingKeywords } from './model';

export const getStarRatingFx = createEffect(async () => {
	const result = await getUserStarRatingRequest();
	if (result.data.success.result) {
		return result.data.success.result;
	}
	return DefaultStarRatingSet;
});

getStarRatingFx.done.watch(({ result }) => {
	setStarRatingKeywords(result.userRating!.keywordsByStar);
});
