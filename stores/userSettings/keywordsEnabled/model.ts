import { createEvent, createStore, sample } from "effector";
import {
  postNotificationsSettingsFx,
  putNotificationsSettingsFx,
} from "@/stores/userSettings";

export const $isKeywordsEnabled = createStore<boolean>(false);

export const setKeywordsEnabled = createEvent<boolean>();
export const toggleKeywordsEnabled = createEvent();

$isKeywordsEnabled.on(setKeywordsEnabled, (_, payload) => payload);

$isKeywordsEnabled.on(toggleKeywordsEnabled, (state, _) => !state);

sample({
  clock: postNotificationsSettingsFx.doneData,
  fn: result => result.success.isKeywordsEnabled,
  target: setKeywordsEnabled,
});

sample({
  clock: putNotificationsSettingsFx.doneData,
  fn: result => result.success.isKeywordsEnabled,
  target: setKeywordsEnabled,
});
