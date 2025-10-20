import {
	DeleteKeywordResponse,
	deleteUserKeywordRequest,
	getUserKeywordsRequest,
	PostKeywordResponse,
	postUserKeywordRequest,
	putUserKeywordRequest,
} from '@/config/api/userKeywordsApi';
import {
	KeywordForPostBackend,
	KeywordFromClient,
	mobileToDesktopColorMap,
	UserKeyword,
} from '@/types/keywords';
import { AxiosResponse } from 'axios';
import { createEffect } from 'effector';

export const getAllNewsKeywordsFx = createEffect(
	async () => await getUserKeywordsRequest()
);

export const postKeywordFx = createEffect<
	KeywordFromClient,
	PostKeywordResponse
>(async keyword => {
	const keywordWithMappedColor = {
		...keyword,
		color: mobileToDesktopColorMap[keyword.color],
	};

	const response: AxiosResponse<PostKeywordResponse> =
		await postUserKeywordRequest(keywordWithMappedColor);

	return response.data;
});

export const deleteKeywordFx = createEffect(async (keywordId: string) => {
	const response: AxiosResponse<DeleteKeywordResponse> =
		await deleteUserKeywordRequest(keywordId);

	return response.data;
});

export const updateKeywordFx = createEffect<UserKeyword, PostKeywordResponse>(
	async keyword => {
		const { _id, ...rest } = keyword;
		const keywordWithMappedColor: KeywordForPostBackend = {
			...rest,
			color: mobileToDesktopColorMap[rest.color],
		};

		const response: AxiosResponse<PostKeywordResponse> =
			await putUserKeywordRequest(_id, keywordWithMappedColor);

		return response.data;
	}
);
