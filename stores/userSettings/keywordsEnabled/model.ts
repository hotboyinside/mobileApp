import {
	postNotificationsSettingsFx,
	putNotificationsSettingsFx,
} from '@/stores/userSettings';
import { createEvent, createStore, sample } from 'effector';

export const $isKeywordsEnabled = createStore<boolean>(false);

export const setKeywordsEnabled = createEvent<boolean>();
export const toggleKeywordsEnabled = createEvent();

$isKeywordsEnabled
	.on(setKeywordsEnabled, (_, payload) => payload)
	.on(
		postNotificationsSettingsFx.doneData,
		(_, result) => result.success.isKeywordsEnabled
	);

$isKeywordsEnabled.on(toggleKeywordsEnabled, (state, _) => !state);

sample({
	clock: putNotificationsSettingsFx.doneData,
	fn: result => {
		return result.success.isKeywordsEnabled;
	},
	target: $isKeywordsEnabled,
});
