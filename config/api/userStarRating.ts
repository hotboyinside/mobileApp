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
		result: {
			userRating: UserRating | null;
		};
	};
}

export const getUserStarRatingRequest = () => {
	return api.get<GetUserResponse>(USERS_RATING);
};
