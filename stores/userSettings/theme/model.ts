import { AppTheme } from '@/constants/appTheme';
import { createEvent, createStore, sample } from 'effector';
import { loadAppThemeFx, saveAppThemeFx } from './handlers';

export const $appTheme = createStore<AppTheme>(AppTheme.Dark);

export const setAppTheme = createEvent<AppTheme>();

$appTheme.on(setAppTheme, (_, theme) => theme);
$appTheme.on(loadAppThemeFx.doneData, (_, theme) => theme);

sample({
	clock: setAppTheme,
	target: saveAppThemeFx,
});
