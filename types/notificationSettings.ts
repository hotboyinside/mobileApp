import { Platform } from '@/config/api/notifications/sendNotificationsToken';

export interface NotificationsSettings {
	isKeywordsPushesEnabled: boolean;
	isKeywordsPushesSoundEnabled: boolean;
	isKeywordsVoiceOverEnabled: boolean;
	isKeywordsEnabled: boolean;
}

export interface NotificationsSettingsResponse {
	errors: any;
	success: NotificationsSettings;
}

export type PostNotificationsSettingsResponse = NotificationsSettingsResponse;
export type PutNotificationsSettingsResponse = NotificationsSettingsResponse;

export interface PutNotificationsSettingsRequestData {
	isKeywordsPushesEnabled?: boolean;
	isKeywordsPushesSoundEnabled?: boolean;
	isKeywordsVoiceOverEnabled?: boolean;
	isKeywordsEnabled?: boolean;
	deviceToken?: string;
	platform?: Platform;
}
