import { createEvent, createStore } from 'effector';

export const $isVoiceOverEnabled = createStore<boolean>(false);

export const toggleVoiceoverEnabled = createEvent();

$isVoiceOverEnabled.on(toggleVoiceoverEnabled, (state, _) => !state);
