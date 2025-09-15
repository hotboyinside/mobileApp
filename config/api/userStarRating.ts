import { USERS_RATING } from '@/constants/apiRoutes';
import { api } from './axios';
import { StarRatingKeywords } from '@/types/starRating';

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

export const updateUserStarRatingRequest = (data: StarRatingKeywords) => {
	const preparedData = {
		keywordsByStar: Object.fromEntries(
			Object.entries(data).map(([star, keywords]) => [star, [...keywords]])
		),
	};

	return api.put(USERS_RATING, preparedData);
};
