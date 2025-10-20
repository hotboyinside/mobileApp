import { createEvent, createStore, sample } from 'effector';
import {
	postNotificationsSettingsFx,
	putNotificationsSettingsFx,
} from '../handlers';
import { resetSettings } from '../model';

export const $isPushNotificationsEnabled = createStore<boolean>(false);
export const $isPushNotificationsEnabledDraft = createStore<boolean>(false);

export const setPushNotificationsEnabled = createEvent<boolean>();
export const togglePushNotificationsEnabledDraft = createEvent();

$isPushNotificationsEnabledDraft.on(
	togglePushNotificationsEnabledDraft,
	(state, _) => !state
);

sample({
	clock: postNotificationsSettingsFx.doneData,
	fn: result => result.success.isKeywordsPushesEnabled,
	target: setPushNotificationsEnabled,
});

sample({
	clock: putNotificationsSettingsFx.doneData,
	fn: result => result.success.isKeywordsPushesEnabled,
	target: setPushNotificationsEnabled,
});

sample({
	clock: setPushNotificationsEnabled,
	target: [$isPushNotificationsEnabled, $isPushNotificationsEnabledDraft],
});

sample({
	clock: resetSettings,
	source: $isPushNotificationsEnabled,
	target: $isPushNotificationsEnabledDraft,
});
