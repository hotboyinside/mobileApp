import { combine } from 'effector';
import {
	$isPushNotificationsEnabled,
	$isPushNotificationsEnabledDraft,
} from '../pushNotifications';
import {
	$isPushNotificationsSound,
	$isPushNotificationsSoundDraft,
} from '../pushNotificationsSound';
import { $isVoiceOverEnabled, $isVoiceOverEnabledDraft } from '../voiceOver';

export const $hasSettingsChanges = combine(
	$isPushNotificationsEnabled,
	$isPushNotificationsEnabledDraft,
	$isPushNotificationsSound,
	$isPushNotificationsSoundDraft,
	$isVoiceOverEnabled,
	$isVoiceOverEnabledDraft,
	(
		isPushNotificationsEnabled,
		isPushNotificationsEnabledDraft,
		isPushNotificationsSound,
		isPushNotificationsSoundDraft,
		isVoiceOverEnabled,
		isVoiceOverEnabledDraft
	) => {
		const isPushNotificationsEnabledChanged =
			isPushNotificationsEnabled !== isPushNotificationsEnabledDraft;
		const isPushNotificationsSoundChanged =
			isPushNotificationsSound !== isPushNotificationsSoundDraft;
		const isVoiceOverEnabledChanged =
			isVoiceOverEnabled !== isVoiceOverEnabledDraft;

		return (
			isPushNotificationsEnabledChanged ||
			isPushNotificationsSoundChanged ||
			isVoiceOverEnabledChanged
		);
	}
);
