import {
	postNotificationsSettingsRequest,
	putNotificationsSettingsRequest,
} from '@/config/api/notifications/getNotificationsSettings';
import { Platform } from '@/config/api/notifications/sendNotificationsToken';
import { PutNotificationsSettingsRequestData } from '@/types/notificationSettings';
import messaging from '@react-native-firebase/messaging';
import { createEffect, createEvent, sample } from 'effector';
import { debounce } from 'patronum';
import { Platform as PlatformRN } from 'react-native';
import { setPushNotificationsEnabled } from './pushNotifications/model';
import { setPushNotificationsSound } from './pushNotificationsSound/model';
import { setVoiceOverEnabled } from './voiceOver/model';

export const postNotificationsSettingsFx = createEffect(async () => {
	const result = await postNotificationsSettingsRequest();
	return result.data;
});

postNotificationsSettingsFx.doneData.watch(result => {
	const settingsData = result.success;
	setPushNotificationsEnabled(settingsData.isKeywordsPushesEnabled);
	setPushNotificationsSound(settingsData.isKeywordsPushesSoundEnabled);
	setVoiceOverEnabled(settingsData.isKeywordsVoiceOverEnabled);
});
postNotificationsSettingsFx.fail.watch(() => {});

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

putNotificationsSettingsFx.doneData.watch(result => {
	const settingsData = result.success;
	setPushNotificationsEnabled(settingsData.isKeywordsPushesEnabled);
	setPushNotificationsSound(settingsData.isKeywordsPushesSoundEnabled);
	setVoiceOverEnabled(settingsData.isKeywordsVoiceOverEnabled);
});

postNotificationsSettingsFx.fail.watch(() => {});

export const changePushNotificationsSettings =
	createEvent<PutNotificationsSettingsRequestData>();

const debouncedChangePushNotificationsSettings = debounce({
	source: changePushNotificationsSettings,
	timeout: 400,
});

sample({
	clock: debouncedChangePushNotificationsSettings,
	target: putNotificationsSettingsFx,
});
