import { $isKeywordsEnabled } from "@/stores/userSettings/keywordsEnabled";
import { KeywordsMode, UserKeyword } from "@/types/keywords";
import { createEvent, createStore, sample } from "effector";
import {
  FilterTabVariant,
  addSelectedTabFilters,
  removeSelectedTabFilters,
} from "../model";

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
