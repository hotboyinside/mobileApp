import { KeywordsMode, UserKeyword } from '@/types/keywords';
import { createEvent, createStore } from 'effector';

export const $isKeywordsEnabled = createStore<boolean>(true);
export const $keywordMode = createStore<KeywordsMode>(KeywordsMode.InsertMode);
export const $keywords = createStore<UserKeyword[]>([]);
export const $onlyVisualKeywords = $keywords.map(state =>
	state.filter(keyword => !keyword.isVoiceoverEnabled)
);
export const $withVoiceOverKeywords = $keywords.map(state =>
	state.filter(keyword => keyword.isVoiceoverEnabled)
);

export const keywordsEnabledToggle = createEvent();

export const startEditKeyword = createEvent<UserKeyword>();
export const finishEditKeyword = createEvent();
export const cancelEditKeyword = createEvent();

export const setKeywords = createEvent<UserKeyword[]>();
export const addKeyword = createEvent<UserKeyword>();
export const deleteKeyword = createEvent<string>();
export const updateKeyword = createEvent<UserKeyword>();

$isKeywordsEnabled.on(keywordsEnabledToggle, (state, _) => !state);

$keywordMode.on(startEditKeyword, () => KeywordsMode.EditMode);
$keywordMode.on(finishEditKeyword, () => KeywordsMode.InsertMode);
$keywordMode.on(cancelEditKeyword, () => KeywordsMode.InsertMode);

$keywords.on(setKeywords, (_, payload) => payload);
$keywords.on(addKeyword, (state, payload) => [payload, ...state]);
$keywords.on(deleteKeyword, (state, payload) => {
	return state.filter(keyword => keyword._id !== payload);
});
$keywords.on(updateKeyword, (state, payload) =>
	state.map(keyword => {
		if (keyword._id === payload._id) {
			return payload;
		}
		return keyword;
	})
);
