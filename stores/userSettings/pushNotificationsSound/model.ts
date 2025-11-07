import { createEvent, createStore, sample } from 'effector';
import {
	postNotificationsSettingsFx,
	putNotificationsSettingsFx,
} from '../handlers';
import { resetSettings } from '../model';

export const $isPushNotificationsSound = createStore<boolean>(false);
export const $isPushNotificationsSoundDraft = createStore<boolean>(false);

export const setPushNotificationsSound = createEvent<boolean>();
export const togglePushNotificationsSoundDraft = createEvent();

$isPushNotificationsSoundDraft.on(
	togglePushNotificationsSoundDraft,
	(state, _) => !state
);

$isPushNotificationsSoundDraft.on(
	postNotificationsSettingsFx.doneData,
	(_, result) => result.success.isKeywordsPushesSoundEnabled
);
$isPushNotificationsSound.on(
	postNotificationsSettingsFx.doneData,
	(_, result) => result.success.isKeywordsPushesSoundEnabled
);

sample({
	clock: putNotificationsSettingsFx.doneData,
	fn: result => result.success.isKeywordsPushesSoundEnabled,
	target: setPushNotificationsSound,
});

sample({
	clock: setPushNotificationsSound,
	target: [$isPushNotificationsSound, $isPushNotificationsSoundDraft],
});

sample({
	clock: resetSettings,
	source: $isPushNotificationsSound,
	target: $isPushNotificationsSoundDraft,
});
