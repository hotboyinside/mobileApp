import ArrowIcon from '@/assets/icons/arrow-left-soft-icon.svg';
import SoundIcon from '@/assets/icons/sound-icon.svg';
import SupportIcon from '@/assets/icons/support-icon.svg';
import VoiceOverOn from '@/assets/icons/voiceover-on-icon.svg';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ThemedViewWithSafeArea } from '@/components/ThemedViewWithSafeArea';
import { Button } from '@/components/ui/Button';
import { Switch } from '@/components/ui/Switch/Switch';
import { appTokens } from '@/constants/tokens';
import { useThemeColor } from '@/hooks/useThemeColor';
import { changePushNotificationsSettings } from '@/stores/userSettings/handlers';
import { $isPushNotificationsEnabled } from '@/stores/userSettings/pushNotifications/model';
import { $isPushNotificationsSound } from '@/stores/userSettings/pushNotificationsSound/model';
import { $isVoiceOverEnabled } from '@/stores/userSettings/voiceOver/model';
import { useUnit } from 'effector-react';
import * as Device from 'expo-device';
import * as NotificationsExpo from 'expo-notifications';
import { goBack } from 'expo-router/build/global-state/routing';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

export const Notifications = () => {
	const [isPermissionStatusGranted, setIsPermissionStatusGranted] =
		useState(false);
	const [isLoadingPermissionRequest, setIsLoadingPermissionRequest] =
		useState(false);

	const isPushNotificationsEnabled = useUnit($isPushNotificationsEnabled);
	const isPushNotificationsSound = useUnit($isPushNotificationsSound);
	const isVoiceOverEnabled = useUnit($isVoiceOverEnabled);

	const backButtonColor = useThemeColor(
		appTokens.component.buttons.secondaryGray.fg
	);
	const iconGrayColor = useThemeColor(appTokens.utilityGray['400']);
	const borderTertiaryColor = useThemeColor(appTokens.border.tertiary);
	const bgSecondarySubtleColor = useThemeColor(
		appTokens.background.secondarySubtle
	);

	useEffect(() => {
		const checkNotificationPermission = async () => {
			if (Device.isDevice) {
				const { status } = await NotificationsExpo.requestPermissionsAsync();
				setIsPermissionStatusGranted(status === 'granted');
				setIsLoadingPermissionRequest(true);
			}
		};

		checkNotificationPermission();
	}, []);

	if (!isLoadingPermissionRequest) {
		return null;
	}

	return (
		<ThemedViewWithSafeArea
			safeEdges={['top', 'bottom']}
			style={styles.wrapper}
		>
			<ThemedView style={styles.container}>
				<ThemedView style={styles.header}>
					<Button
						variant='secondary'
						onlyIcon
						icon={<ArrowIcon width={20} height={20} fill={backButtonColor} />}
						onPress={goBack}
					/>
					<ThemedText type='textMd' style={styles.title}>
						Notifications
					</ThemedText>
					<View style={styles.mock} />
				</ThemedView>

				<ThemedView style={styles.content}>
					<ThemedText type='textLg' style={styles.title}>
						Keyword Alerts
					</ThemedText>
					<ThemedText
						tokenColor={appTokens.text.primary}
						type='textXs'
						style={styles.description}
					>
						Get alerts for your selected keywords in press releases
					</ThemedText>

					<ThemedView
						style={[
							styles.settings,
							{
								borderColor: borderTertiaryColor,
								backgroundColor: bgSecondarySubtleColor,
							},
						]}
					>
						<ThemedView style={styles.row}>
							<ThemedView style={styles.button}>
								<SupportIcon width={20} height={20} fill={iconGrayColor} />
								<ThemedView>
									<ThemedText
										type='textMd'
										tokenColor={appTokens.text.secondary}
										style={styles.buttonText}
									>
										Push
									</ThemedText>
									{!isPermissionStatusGranted && (
										<ThemedText
											type='textXs'
											tokenColor={appTokens.text.quaternary}
											style={styles.buttonText}
										>
											Turn on notifications in device settings to get alerts
										</ThemedText>
									)}
								</ThemedView>
							</ThemedView>
							<Switch
								value={isPushNotificationsEnabled}
								disabled={!isPermissionStatusGranted}
								onChange={newValue =>
									changePushNotificationsSettings({
										isKeywordsPushesEnabled: newValue,
									})
								}
							/>
						</ThemedView>

						<View
							style={[styles.divider, { backgroundColor: borderTertiaryColor }]}
						/>

						<ThemedView style={styles.row}>
							<ThemedView style={styles.button}>
								<SoundIcon width={20} height={20} fill={iconGrayColor} />
								<ThemedView>
									<ThemedText
										type='textMd'
										tokenColor={appTokens.text.secondary}
										style={styles.buttonText}
									>
										Sound
									</ThemedText>
									{!isPermissionStatusGranted && (
										<ThemedText
											type='textXs'
											tokenColor={appTokens.text.quaternary}
											style={styles.buttonText}
										>
											Turn on notifications in device settings to get alerts
										</ThemedText>
									)}
								</ThemedView>
							</ThemedView>
							<Switch
								value={isPushNotificationsSound}
								disabled={!isPermissionStatusGranted}
								onChange={newValue =>
									changePushNotificationsSettings({
										isKeywordsPushesSoundEnabled: newValue,
									})
								}
							/>
						</ThemedView>

						<View
							style={[styles.divider, { backgroundColor: borderTertiaryColor }]}
						/>

						<ThemedView style={styles.row}>
							<ThemedView style={styles.button}>
								<VoiceOverOn width={20} height={20} fill={iconGrayColor} />
								<ThemedView>
									<ThemedText
										type='textMd'
										tokenColor={appTokens.text.secondary}
										style={styles.buttonText}
									>
										Voiceover
									</ThemedText>
									<ThemedText
										type='textXs'
										tokenColor={appTokens.text.quaternary}
										style={styles.buttonText}
									>
										Plays alerts while the app is open
									</ThemedText>
								</ThemedView>
							</ThemedView>
							<Switch
								value={isVoiceOverEnabled}
								onChange={newValue =>
									changePushNotificationsSettings({
										isKeywordsVoiceOverEnabled: newValue,
									})
								}
							/>
						</ThemedView>
					</ThemedView>
				</ThemedView>
			</ThemedView>
		</ThemedViewWithSafeArea>
	);
};

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
	},

	container: {
		marginHorizontal: 16,
	},

	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingVertical: 4,
	},

	title: {
		fontWeight: 700,
		fontFamily: 'MontserratBold',
	},

	mock: {
		width: 40,
		height: 40,
	},

	content: {
		paddingTop: 24,
	},

	description: {
		fontWeight: 400,
		fontFamily: 'MontserratRegular',
	},

	settings: {
		borderWidth: 1,
		borderRadius: 16,
		marginTop: 12,
		overflow: 'hidden',
	},

	row: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 20,
		paddingVertical: 12,
	},

	button: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
	},

	buttonText: {
		maxWidth: 220,
		fontWeight: 500,
		fontFamily: 'MontserratMedium',
	},

	divider: {
		width: '100%',
		height: 1,
	},
});
