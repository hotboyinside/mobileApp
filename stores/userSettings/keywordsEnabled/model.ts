import { createEvent, createStore } from 'effector';

export const $isKeywordsEnabled = createStore<boolean>(false);

export const setKeywordsEnabled = createEvent<boolean>();
export const toggleKeywordsEnabled = createEvent();

$isKeywordsEnabled.on(setKeywordsEnabled, (_, payload) => payload);

$isKeywordsEnabled.on(toggleKeywordsEnabled, (state, _) => !state);
