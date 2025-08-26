import { createEvent, createStore } from "effector";

export const $selectedVoiceoverState = createStore<boolean>(false);

export const toggleSelectedVoiceoverState = createEvent();

$selectedVoiceoverState.on(toggleSelectedVoiceoverState, (state, _) => !state);
