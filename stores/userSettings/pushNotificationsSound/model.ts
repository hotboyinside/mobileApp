import { createEvent, createStore, sample } from "effector";
import {
  postNotificationsSettingsFx,
  putNotificationsSettingsFx,
} from "../handlers";
import { setVoiceOverEnabled } from "../voiceOver";

export const $isPushNotificationsSound = createStore<boolean>(false);

export const setPushNotificationsSound = createEvent<boolean>();
export const togglePushNotificationsSound = createEvent();

$isPushNotificationsSound.on(
  setPushNotificationsSound,
  (_, payload) => payload
);

$isPushNotificationsSound.on(
  togglePushNotificationsSound,
  (state, _) => !state
);

sample({
  clock: postNotificationsSettingsFx.doneData,
  fn: result => result.success.isKeywordsPushesSoundEnabled,
  target: setPushNotificationsSound,
});

sample({
  clock: putNotificationsSettingsFx.doneData,
  fn: result => result.success.isKeywordsVoiceOverEnabled,
  target: setPushNotificationsSound,
});
