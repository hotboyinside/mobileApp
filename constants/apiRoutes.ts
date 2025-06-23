import { urlJoin } from '@/helpers/route';

export const API_BASE_PATH = 'api/v1';

// auth api routes
export const API_AUTH = urlJoin(API_BASE_PATH, '/auth');
export const API_AUTH_LOGIN = urlJoin(API_AUTH, '/login');
