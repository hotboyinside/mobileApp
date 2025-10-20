import { useSession } from '@/components/appProvider/session/SessionContext';
import { ALL_NEWS } from '@/constants/routes';
import * as Notifications from 'expo-notifications';
import { router } from 'expo-router';
import { useEffect } from 'react';

export type NotificationData = {
	newsId?: string;
};

export function useNotificationObserver() {
	const { session, isLoading } = useSession();

	useEffect(() => {
		if (isLoading || !session) return;

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
	}, [session, isLoading]);
}
