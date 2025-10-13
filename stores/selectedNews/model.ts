import { createEvent, createStore } from 'effector';
import { IFilteredNews } from '@/types/news';
import { fetchSelectedNewsFx } from './handlers';

export const $fetchedNews = createStore<IFilteredNews | null>(null);

export const setFetchedNews = createEvent<IFilteredNews | null>();

$fetchedNews.on(setFetchedNews, (_, nextNews) => nextNews);
$fetchedNews.on(fetchSelectedNewsFx.doneData, (_, news) => news);
$fetchedNews.reset(fetchSelectedNewsFx.fail);