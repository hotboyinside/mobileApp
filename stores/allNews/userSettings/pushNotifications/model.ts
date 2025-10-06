import { createEvent, createStore } from 'effector';

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
