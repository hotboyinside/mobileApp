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
export const NEWS = urlJoin(API_BASE_PATH, '/news');
export const NEWS_BY_ID = (id: string) => urlJoin(NEWS, id);
export const NEWS_GET_NEWS = urlJoin(NEWS, '/get-news');

// notifications
export const API_NOTIFICATIONS = urlJoin(API_BASE_PATH, '/notification');
export const API_NOTIFICATIONS_MOBILE = urlJoin(API_NOTIFICATIONS, '/mobile');
export const API_NOTIFICATIONS_MOBILE_TOKEN = urlJoin(
	API_NOTIFICATIONS_MOBILE,
	'/device-token'
);
export const API_NOTIFICATIONS_MOBILE_SETTINGS = urlJoin(
	API_NOTIFICATIONS_MOBILE,
	'/settings'
);

// text to speech
export const TEXT_TO_SPEECH = `${API_BASE_PATH}/textToSpeech`;

// in-app-purchases
export const API_IN_APP_PURCHASES = urlJoin(API_BASE_PATH, '/in-app-purchases');
