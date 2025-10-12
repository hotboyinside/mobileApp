import { useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import { router } from 'expo-router';
import { ALL_NEWS } from '@/constants/routes';

export type NotificationData = {
	newsId?: string;
};

export function useNotificationObserver() {
	useEffect(() => {
		function redirect(notification: Notifications.Notification) {
			router.push(ALL_NEWS);
		}

		const response = Notifications.getLastNotificationResponse();
		if (response?.notification) {
			redirect(response.notification);
		}

		const subscription = Notifications.addNotificationResponseReceivedListener(
			response => {
				redirect(response.notification);
			}
		);

		return () => {
			subscription.remove();
		};
	}, []);
}
