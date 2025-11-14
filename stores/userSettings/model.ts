import { Status } from '@/constants/status';
import { createEvent, createStore } from 'effector';
import { putNotificationsSettingsFx } from './handlers';

export const $notificationsSettingsStatus = createStore<Status>(Status.Idle)
	.on(putNotificationsSettingsFx.pending, (_, pending) =>
		pending ? Status.Loading : Status.Idle
	)
	.on(putNotificationsSettingsFx.done, () => Status.Idle)
	.on(putNotificationsSettingsFx.fail, () => Status.Error);

export const resetSettings = createEvent();
