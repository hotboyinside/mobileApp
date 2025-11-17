import { getNewsByIdRequest } from '@/api/newsApi';
import { IFilteredNews } from '@/types/news';
import { createEffect } from 'effector';

export const fetchSelectedNewsFx = createEffect(
	async (newsId: string): Promise<IFilteredNews> => {
		const res = await getNewsByIdRequest(newsId);
		return res.data.result;
	}
);
