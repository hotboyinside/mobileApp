import { createEvent, createStore } from 'effector';

export const $isVoiceOverEnabled = createStore<boolean>(false);

export const setVoiceOverEnabled = createEvent<boolean>();
export const toggleVoiceoverEnabled = createEvent();

$isVoiceOverEnabled.on(setVoiceOverEnabled, (_, payload) => payload);
$isVoiceOverEnabled.on(toggleVoiceoverEnabled, (state, _) => !state);
