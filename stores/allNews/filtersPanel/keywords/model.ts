import { $isKeywordsEnabled } from '@/stores/userSettings/keywordsEnabled';
import {
	desktopToMobileColorMap,
	KeywordsColorVariants,
	KeywordsColorVariantsFromDesktop,
	KeywordsMode,
	UserKeyword,
	UserKeywordFromBackend,
} from '@/types/keywords';
import { createEvent, createStore, sample } from 'effector';
import { pageMounted } from '../../model';
import {
	addSelectedTabFilters,
	FilterTabVariant,
	removeSelectedTabFilters,
} from '../model';
import {
	deleteKeywordFx,
	getAllNewsKeywordsFx,
	postKeywordFx,
	updateKeywordFx,
} from './handlers';

export const $keywordMode = createStore<KeywordsMode>(KeywordsMode.InsertMode);
export const $keywords = createStore<UserKeyword[]>([]);
export const $onlyVisualKeywords = $keywords.map(state =>
	state.filter(keyword => !keyword.isVoiceoverEnabled)
);
export const $withVoiceOverKeywords = $keywords.map(state =>
	state.filter(keyword => keyword.isVoiceoverEnabled)
);

export const startEditKeyword = createEvent<UserKeyword>();
export const finishEditKeyword = createEvent();
export const cancelEditKeyword = createEvent();

export const setKeywords = createEvent<UserKeyword[]>();
export const addKeyword = createEvent<UserKeyword>();
export const deleteKeyword = createEvent<string>();
export const updateKeyword = createEvent<UserKeyword>();

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

sample({
	source: $isKeywordsEnabled,
	filter: isKeywordsEnabled => isKeywordsEnabled === true,
	fn: () => FilterTabVariant.keywords,
	target: addSelectedTabFilters,
});

sample({
	source: $isKeywordsEnabled,
	filter: isKeywordsEnabled => isKeywordsEnabled === false,
	fn: () => FilterTabVariant.keywords,
	target: removeSelectedTabFilters,
});

sample({
	clock: pageMounted,
	target: getAllNewsKeywordsFx,
});

getAllNewsKeywordsFx.done.watch(({ result }) => {
	const mappedKeywords = result.data.success.docs.map(
		(keyword: UserKeywordFromBackend) => ({
			...keyword,
			color:
				desktopToMobileColorMap[
					keyword.color as KeywordsColorVariantsFromDesktop
				] || KeywordsColorVariants.Gray,
		})
	);

	setKeywords(mappedKeywords);
});

postKeywordFx.done.watch(({ result }) => {
	const keyword = result.success.keyword;
	const keywordWithMappedColor = {
		...keyword,
		color: desktopToMobileColorMap[keyword.color],
	};

	addKeyword(keywordWithMappedColor);
});

deleteKeywordFx.done.watch(({ result }) => {
	const deletedKeyword = result.success.keyword;

	deleteKeyword(deletedKeyword._id);
});

updateKeywordFx.done.watch(({ result }) => {
	const keyword = result.success.keyword;
	const keywordWithMappedColor = {
		...keyword,
		color: desktopToMobileColorMap[keyword.color],
	};

	updateKeyword(keywordWithMappedColor);
	finishEditKeyword();
});
