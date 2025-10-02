import { urlJoin } from '@/helpers/route';
import { RelativePathString } from 'expo-router';

export const ALL_NEWS = '(tabs)' as RelativePathString;

export const NEWS_LIST = '/news';
export const NEWS_DETAILS = (id: string) =>
	urlJoin(NEWS_LIST, id) as RelativePathString;
