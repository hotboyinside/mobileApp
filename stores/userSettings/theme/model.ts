import { createEvent, createStore, sample } from "effector";
import { AppTheme } from "@/constants/appTheme";
import { loadAppThemeFx, saveAppThemeFx } from "./handlers";

export const $appTheme = createStore<AppTheme>(AppTheme.System);

export const setAppTheme = createEvent<AppTheme>();

$appTheme.on(setAppTheme, (_, theme) => theme);
$appTheme.on(loadAppThemeFx.doneData, (_, theme) => theme);

sample({
  clock: setAppTheme,
  target: saveAppThemeFx,
});
