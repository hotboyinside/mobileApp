import { userKeywordsMock } from '@/mocks/keywords';
import { UserKeyword } from '@/types/keywords';
import { createEvent, createStore } from 'effector';

export const $keywords = createStore<UserKeyword[]>(userKeywordsMock);
export const $onlyVisualKeywords = $keywords.map(state =>
	state.filter(keyword => !keyword.isVoiceoverEnabled)
);
export const $withVoiceOverKeywords = $keywords.map(state =>
	state.filter(keyword => keyword.isVoiceoverEnabled)
);

export const addKeyword = createEvent<UserKeyword>();
export const deleteKeyword = createEvent<string>();

$keywords.on(addKeyword, (state, payload) => [...state, payload]);
$keywords.on(deleteKeyword, (state, payload) => {
	return state.filter(keyword => keyword._id !== payload);
});
