import { USERS_RATING } from '@/constants/apiRoutes';
import { StarRatingKeywords } from '@/types/starRating';
import { api } from './axios';

export interface UserRating {
	keywordsByStar: StarRatingKeywords;
	modificationCount: number;
}

export interface GetUserResponse {
	errors: [];
	success: {
		userRating: UserRating | null;
	};
}

export const getUserStarRatingRequest = () => {
	return api.get<GetUserResponse>(USERS_RATING);
};

export const updateUserStarRatingRequest = (
	starRating: StarRatingKeywords,
	modificationCount: number
) => {
	const preparedData = {
		keywordsByStar: Object.fromEntries(
			Object.entries(starRating).map(([star, keywords]) => [
				star,
				[...keywords],
			])
		),
		modificationCount: modificationCount,
	};

	return api.put(USERS_RATING, preparedData);
};
