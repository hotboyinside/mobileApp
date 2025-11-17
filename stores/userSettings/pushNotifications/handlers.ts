import {
	Platform,
	sendNotificationsTokenRequest,
} from '@/api/notifications/sendNotificationsToken';
import { createEffect } from 'effector';
import { Platform as RNPlatform } from 'react-native';

export const sendNotificationsTokenFx = createEffect(
	async (deviceTokenData: string) => {
		const result = await sendNotificationsTokenRequest({
			deviceToken: deviceTokenData,
			platform: RNPlatform.OS as Platform,
		});
		if (result.data.success) {
			return result.data.success;
		}
	}
);
