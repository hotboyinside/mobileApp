import { createEvent, createStore, sample } from 'effector';
import {
	postNotificationsSettingsFx,
	putNotificationsSettingsFx,
} from '../handlers';
import { resetSettings } from '../model';

export const $isVoiceOverEnabled = createStore<boolean>(false);
export const $isVoiceOverEnabledDraft = createStore<boolean>(false);

export const setVoiceOverEnabled = createEvent<boolean>();
export const toggleVoiceoverEnabledDraft = createEvent();

$isVoiceOverEnabledDraft.on(toggleVoiceoverEnabledDraft, (state, _) => !state);

sample({
	clock: postNotificationsSettingsFx.doneData,
	fn: result => result.success.isKeywordsVoiceOverEnabled,
	target: setVoiceOverEnabled,
});

sample({
	clock: putNotificationsSettingsFx.doneData,
	fn: result => result.success.isKeywordsVoiceOverEnabled,
	target: setVoiceOverEnabled,
});

sample({
	clock: setVoiceOverEnabled,
	target: [$isVoiceOverEnabled, $isVoiceOverEnabledDraft],
});

sample({
	clock: resetSettings,
	source: $isVoiceOverEnabled,
	target: $isVoiceOverEnabledDraft,
});
