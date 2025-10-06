import { createEvent, createStore } from 'effector';

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
