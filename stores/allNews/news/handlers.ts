import { IParamsGetNews, getNewsRequest } from '@/api/newsApi';
import { speakTextToSpeech } from '@/helpers/pushNotifications/speakTextToSpeech';
import { INews } from '@/types/news';
import { createEffect } from 'effector';

interface FetchNewsResponse {
	docs: INews[];
	page: number;
	totalDocs?: number;
	nextPage?: number | null;
}

export const fetchNewsFx = createEffect<IParamsGetNews, FetchNewsResponse>(
	async params => {
		const response = await getNewsRequest(params);
		return response.data.success;
	}
);

export const loadMoreNewsFx = createEffect<IParamsGetNews, FetchNewsResponse>(
	async params => {
		const response = await getNewsRequest(params);
		return response.data.success;
	}
);

export const speakTtsFx = createEffect(speakTextToSpeech);
