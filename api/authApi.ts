import { api } from '@/config/axios';
import { API_AUTH_LOGIN } from '@/constants/apiRoutes';
import { User } from '@/types/user';

export interface LoginRequestData {
	email: string;
	password: string;
}

export interface LoginResponse {
	success: {
		user: User;
		authorized: boolean;
	};
}

export const loginRequest = (data: LoginRequestData) => {
	return api.post(API_AUTH_LOGIN, { ...data, isMobile: true });
};
