import { API_AUTH_LOGIN } from '@/constants/apiRoutes';
import { api } from './axios';

export const loginRequest = (data: { email: string; password: string }) => {
	return api.post(API_AUTH_LOGIN, data);
};
