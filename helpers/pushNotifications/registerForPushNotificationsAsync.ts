import { sendNotificationsTokenFx } from "@/stores/userSettings/pushNotifications/handlers";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

export async function registerForPushNotificationsAsync() {
  let token;

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      return;
    }

    try {
      const deviceToken = await Notifications.getDevicePushTokenAsync();

      if (deviceToken) {
        sendNotificationsTokenFx(deviceToken.data);
      }
    } catch (e) {
      token = `${e}`;
    }
  }

  return token;
}
