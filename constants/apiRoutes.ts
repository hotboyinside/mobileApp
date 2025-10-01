import { urlJoin } from '@/helpers/route';

export const API_BASE_PATH = 'api/v1';

// auth api routes
export const API_AUTH = urlJoin(API_BASE_PATH, '/auth');
export const API_AUTH_LOGIN = urlJoin(API_AUTH, '/login');

// users
export const API_USERS = urlJoin(API_BASE_PATH, '/users');
export const USERS_KEYWORDS = urlJoin(API_USERS, '/keywords');
export const USERS_KEYWORDS_ITEM = ({ keywordId }: { keywordId: string }) =>
	urlJoin(USERS_KEYWORDS, `/${keywordId}`);
export const USERS_RATING = urlJoin(API_USERS, '/rating');

// news
export const NEWS = `${API_BASE_PATH}/news`;
export const NEWS_GET_NEWS = `${NEWS}/get-news`;
export const NEWS_GET_SORTED_NEWS = `${NEWS}/get-sorted-news`;

// notifications
export const API_NOTIFICATIONS = urlJoin(API_BASE_PATH, '/notifications');
export const API_NOTIFICATIONS_MOBILE = urlJoin(API_NOTIFICATIONS, '/mobile');
export const API_NOTIFICATIONS_MOBILE_TOKEN = urlJoin(API_NOTIFICATIONS_MOBILE, '/device-token');
