import { API_NOTIFICATIONS_MOBILE_SETTINGS } from '@/constants/apiRoutes';
import { api } from '../axios';
import {
	PostNotificationsSettingsResponse,
	PutNotificationsSettingsRequestData,
	PutNotificationsSettingsResponse,
} from '@/types/notificationSettings';

export const postNotificationsSettingsRequest = () => {
	return api.post<PostNotificationsSettingsResponse>(
		API_NOTIFICATIONS_MOBILE_SETTINGS
	);
};

export const putNotificationsSettingsRequest = (
	data: PutNotificationsSettingsRequestData
) => {
	return api.put<PutNotificationsSettingsResponse>(
		API_NOTIFICATIONS_MOBILE_SETTINGS,
		data
	);
};
