import {
	IParamsGetNews,
	IParamsGetSortedNews,
	getNewsRequest,
	getSortedNewsRequest,
} from '@/config/api/newsApi';
import { createEffect } from 'effector';
import { INews } from './model';

interface FetchNewsResponse {
	docs: INews[];
	page: number;
	totalDocs?: number;
	nextPage?: number | null;
}

export const fetchNewsFx = createEffect<IParamsGetNews, FetchNewsResponse>(
	async params => {
		const response = await getNewsRequest(params);
		console.log('response.data.success', response.data.success)
		return response.data.success;
	}
);

export const fetchSortedNewsFx = createEffect(
	async (params: IParamsGetSortedNews) => {
		const response = await getSortedNewsRequest(params);
		return response.data.success.docs;
	}
);

export const loadMoreNewsFx = createEffect<IParamsGetNews, FetchNewsResponse>(
	async params => {
		const response = await getNewsRequest(params);
		console.log('response.data.success', response.data.success)
		return response.data.success;
	}
);
