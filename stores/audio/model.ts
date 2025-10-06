import { createStore, createEvent } from 'effector';

export const $audioPlaying = createStore<boolean>(false);

export const setVoiceoverPlaying = createEvent<boolean>();
export const setAudioPlaying = createEvent<boolean>();

$audioPlaying.on(setAudioPlaying, (_, payload) => payload);
