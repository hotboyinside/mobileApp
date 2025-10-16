import { createEvent, createStore, sample } from "effector";
import {
  postNotificationsSettingsFx,
  putNotificationsSettingsFx,
} from "../handlers";

export const $isVoiceOverEnabled = createStore<boolean>(false);

export const setVoiceOverEnabled = createEvent<boolean>();
export const toggleVoiceoverEnabled = createEvent();

$isVoiceOverEnabled.on(setVoiceOverEnabled, (_, payload) => payload);
$isVoiceOverEnabled.on(toggleVoiceoverEnabled, (state, _) => !state);

sample({
  clock: postNotificationsSettingsFx.doneData,
  fn: result => result.success.isKeywordsVoiceOverEnabled,
  target: setVoiceOverEnabled,
});

sample({
  clock: putNotificationsSettingsFx.doneData,
  fn: result => result.success.isKeywordsVoiceOverEnabled,
  target: setVoiceOverEnabled,
});
