import { sendNotificationsTokenFx } from '@/stores/userSettings/pushNotifications/handlers';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import messaging from '@react-native-firebase/messaging';

export async function registerForPushNotificationsAsync() {
	let token;

	if (Device.isDevice) {
		const { status: existingStatus } =
			await Notifications.getPermissionsAsync();
		let finalStatus = existingStatus;
		if (existingStatus !== 'granted') {
			const { status } = await Notifications.requestPermissionsAsync();
			finalStatus = status;
		}
		if (finalStatus !== 'granted') {
			return;
		}

		try {
			const deviceToken = await messaging().getToken();

			if (deviceToken) {
				sendNotificationsTokenFx(deviceToken);
			}
		} catch (e) {
			token = `${e}`;
		}
	}

	return token;
}
