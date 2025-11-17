import {
	postNotificationsSettingsRequest,
	putNotificationsSettingsRequest,
} from '@/api/notifications/getNotificationsSettings';
import { Platform } from '@/api/notifications/sendNotificationsToken';
import { PutNotificationsSettingsRequestData } from '@/types/notificationSettings';
import messaging from '@react-native-firebase/messaging';
import { createEffect } from 'effector';
import { Platform as PlatformRN } from 'react-native';

export const postNotificationsSettingsFx = createEffect(async () => {
	const result = await postNotificationsSettingsRequest();
	return result.data;
});

export const putNotificationsSettingsFx = createEffect(
	async (data: PutNotificationsSettingsRequestData) => {
		if (data.isKeywordsPushesEnabled) {
			const deviceToken = await messaging().getToken();

			if (!deviceToken) {
				throw new Error('Device push token not found');
			}

			data.deviceToken = deviceToken;
			data.platform = PlatformRN.OS as Platform;
		}

		const result = await putNotificationsSettingsRequest(data);
		return result.data;
	}
);
