import {
	getUserStarRatingRequest,
	updateUserStarRatingRequest,
} from '@/config/api/userStarRating';
import { DefaultStarRatingSet } from '@/constants/starRatingDefaultSet';
import { createEffect } from 'effector';
import { saveDraftStarRatingKeyword, setStarRatingKeywords } from './model';
import { StarRatingKeywords } from '@/types/starRating';

export const getStarRatingFx = createEffect(async () => {
	const result = await getUserStarRatingRequest();
	if (result.data.success.userRating) {
		return result.data.success;
	}
	return DefaultStarRatingSet;
});

getStarRatingFx.done.watch(({ result }) => {
	setStarRatingKeywords(result.userRating!.keywordsByStar);
});

export const updateStarRatingFx = createEffect(
	async (data: StarRatingKeywords) => {
		const result = await updateUserStarRatingRequest(data);
		if (!result) throw new Error('something went wrong...');
		return result;
	}
);

updateStarRatingFx.done.watch(() => saveDraftStarRatingKeyword());
updateStarRatingFx.fail.watch(({ error }: { error: any }) => {});
