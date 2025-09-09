import { createEffect } from 'effector';
import {
	postUserKeywordRequest,
	PostKeywordResponse,
	getUserKeywordsRequest,
	deleteUserKeywordRequest,
	DeleteKeywordResponse,
	putUserKeywordRequest,
} from '@/config/api/userKeywordsApi';
import {
	desktopToMobileColorMap,
	KeywordForPostBackend,
	KeywordFromClient,
	KeywordsColorVariants,
	KeywordsColorVariantsFromDesktop,
	mobileToDesktopColorMap,
	UserKeyword,
	UserKeywordFromBackend,
} from '@/types/keywords';
import { AxiosResponse } from 'axios';
import {
	addKeyword,
	deleteKeyword,
	finishEditKeyword,
	setKeywords,
	updateKeyword,
} from './model';

export const getAllNewsKeywordsFx = createEffect(
	async () => await getUserKeywordsRequest()
);

getAllNewsKeywordsFx.done.watch(({ result }) => {
	const mappedKeywords = result.data.success.docs.map(
		(keyword: UserKeywordFromBackend) => ({
			...keyword,
			color:
				desktopToMobileColorMap[
					keyword.color as KeywordsColorVariantsFromDesktop
				] || KeywordsColorVariants.Gray,
		})
	);

	setKeywords(mappedKeywords);
});

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

postKeywordFx.done.watch(({ result }) => {
	const keyword = result.success.keyword;
	const keywordWithMappedColor = {
		...keyword,
		color: desktopToMobileColorMap[keyword.color],
	};

	addKeyword(keywordWithMappedColor);
});

export const deleteKeywordFx = createEffect(async (keywordId: string) => {
	const response: AxiosResponse<DeleteKeywordResponse> =
		await deleteUserKeywordRequest(keywordId);

	return response.data;
});

deleteKeywordFx.done.watch(({ result }) => {
	const deletedKeyword = result.success.keyword;

	deleteKeyword(deletedKeyword._id);
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

updateKeywordFx.done.watch(({ result }) => {
	const keyword = result.success.keyword;
	const keywordWithMappedColor = {
		...keyword,
		color: desktopToMobileColorMap[keyword.color],
	};

	updateKeyword(keywordWithMappedColor);
	finishEditKeyword();
});
