export interface NotificationsSettings {
	isKeywordsPushesEnabled: boolean;
	isKeywordsPushesSoundEnabled: boolean;
	isKeywordsVoiceOverEnabled: boolean;
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
}
