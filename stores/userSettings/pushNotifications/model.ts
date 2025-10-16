import { createEvent, createStore, sample } from "effector";
import {
  postNotificationsSettingsFx,
  putNotificationsSettingsFx,
} from "../handlers";

export const $isPushNotificationsEnabled = createStore<boolean>(false);

export const setPushNotificationsEnabled = createEvent<boolean>();
export const togglePushNotificationsEnabled = createEvent();

$isPushNotificationsEnabled.on(
  setPushNotificationsEnabled,
  (_, payload) => payload
);

$isPushNotificationsEnabled.on(
  togglePushNotificationsEnabled,
  (state, _) => !state
);

sample({
  clock: postNotificationsSettingsFx.doneData,
  fn: result => result.success.isKeywordsPushesEnabled,
  target: setPushNotificationsEnabled,
});

sample({
  clock: putNotificationsSettingsFx.doneData,
  fn: result => result.success.isKeywordsPushesEnabled,
  target: setPushNotificationsEnabled,
});
