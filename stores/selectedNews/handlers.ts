import { createEffect } from 'effector';
import { IFilteredNews } from '@/types/news';
import { getNewsByIdRequest } from '@/config/api/newsApi';

export const fetchSelectedNewsFx = createEffect(async (newsId: string): Promise<IFilteredNews> => {
    const res = await getNewsByIdRequest(newsId);
    return res.data.result;
});