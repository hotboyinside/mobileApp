import { USERS_KEYWORDS, USERS_KEYWORDS_ITEM } from '@/constants/apiRoutes';
import { api } from './axios';
import {
	KeywordForPostBackend,
	UserKeywordFromBackend,
} from '@/types/keywords';

export interface PostKeywordResponse {
	success: {
		keyword: UserKeywordFromBackend;
	};
}

export type DeleteKeywordResponse = PostKeywordResponse;

export const getUserKeywordsRequest = () => {
	return api.get(USERS_KEYWORDS);
};

export const postUserKeywordRequest = (data: KeywordForPostBackend) => {
	return api.post(USERS_KEYWORDS, data);
};

export const deleteUserKeywordRequest = (keywordId: string) => {
	return api.delete(USERS_KEYWORDS_ITEM({ keywordId }));
};
