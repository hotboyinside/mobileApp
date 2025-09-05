import { KeywordsMode, UserKeyword } from '@/types/keywords';
import { createEvent, createStore } from 'effector';

export const $keywordMode = createStore<KeywordsMode>(KeywordsMode.InsertMode);
export const $keywords = createStore<UserKeyword[]>([]);
export const $onlyVisualKeywords = $keywords.map(state =>
	state.filter(keyword => !keyword.isVoiceoverEnabled)
);
export const $withVoiceOverKeywords = $keywords.map(state =>
	state.filter(keyword => keyword.isVoiceoverEnabled)
);

export const setKeywords = createEvent<UserKeyword[]>();
export const addKeyword = createEvent<UserKeyword>();
export const deleteKeyword = createEvent<string>();
export const editKeyword = createEvent<UserKeyword>();

$keywords.on(setKeywords, (_, payload) => payload);
$keywords.on(addKeyword, (state, payload) => [payload, ...state]);
$keywords.on(deleteKeyword, (state, payload) => {
	return state.filter(keyword => keyword._id !== payload);
});
$keywordMode.on(editKeyword, () => KeywordsMode.EditMode);
