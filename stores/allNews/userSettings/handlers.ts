import {
	postNotificationsSettingsRequest,
	putNotificationsSettingsRequest,
} from '@/config/api/notifications/getNotificationsSettings';
import { createEffect } from 'effector';
import { setPushNotificationsEnabled } from './pushNotifications/model';
import { setVoiceOverEnabled } from './voiceOver/model';
import { setPushNotificationsSound } from './pushNotificationsSound/model';
import { PutNotificationsSettingsRequestData } from '@/types/notificationSettings';

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
