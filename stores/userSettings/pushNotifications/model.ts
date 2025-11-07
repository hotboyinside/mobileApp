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

$isPushNotificationsEnabledDraft.on(
	postNotificationsSettingsFx.doneData,
	(_, result) => result.success.isKeywordsPushesEnabled
);
$isPushNotificationsEnabled.on(
	postNotificationsSettingsFx.doneData,
	(_, result) => result.success.isKeywordsPushesEnabled
);

sample({
	clock: putNotificationsSettingsFx.doneData,
	fn: result => result.success.isKeywordsPushesEnabled,
	target: [$isPushNotificationsEnabled, $isPushNotificationsEnabledDraft],
});

sample({
	clock: resetSettings,
	source: $isPushNotificationsEnabled,
	target: $isPushNotificationsEnabledDraft,
});
