import { API_NOTIFICATIONS_MOBILE_TOKEN } from '@/constants/apiRoutes';
import { api } from './axios';

export enum Platform {
    Ios = "ios",
    Android = "android",
    Web = "web",
}

export interface SendNotificationsTokenRequestData {
	deviceToken: string;
	platform?: Platform;
}

export interface SendNotificationsTokenResponse {
	success: {
		message: string;
	};
}

export const sendNotificationsTokenRequest = (data: SendNotificationsTokenRequestData) => {
	return api.post(API_NOTIFICATIONS_MOBILE_TOKEN, data);
};
