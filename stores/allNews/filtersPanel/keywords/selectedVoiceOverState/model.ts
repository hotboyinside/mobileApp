import { createEvent, createStore } from 'effector';

export const $isSelectedVoiceoverEnabled = createStore<boolean>(false);

export const toggleIsSelectedVoiceoverEnabled = createEvent();

$isSelectedVoiceoverEnabled.on(
	toggleIsSelectedVoiceoverEnabled,
	(state, _) => !state
);
