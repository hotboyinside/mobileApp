import { ThemedViewWithSafeArea } from '@/components/ThemedViewWithSafeArea';
import { Button } from '@/components/ui/Button';
import { goBack } from 'expo-router/build/global-state/routing';
import { StyleSheet, View } from 'react-native';
import ArrowIcon from '@/assets/icons/arrow-left-soft-icon.svg';
import SupportIcon from '@/assets/icons/support-icon.svg';
import SoundIcon from '@/assets/icons/sound-icon.svg';
import VoiceOverOn from '@/assets/icons/voiceover-on-icon.svg';
import { ThemedView } from '@/components/ThemedView';
import { appTokens } from '@/constants/tokens';
import { useThemeColor } from '@/hooks/useThemeColor';
import { ThemedText } from '@/components/ThemedText';
import { Switch } from '@/components/ui/Switch/Switch';
import { $isPushNotificationsEnabled } from '@/stores/allNews/userSettings/pushNotifications/model';
import { useUnit } from 'effector-react';
import { $isVoiceOverEnabled } from '@/stores/allNews/userSettings/voiceOver/model';
import { $isPushNotificationsSound } from '@/stores/allNews/userSettings/pushNotificationsSound/model';
import { putNotificationsSettingsFx } from '@/stores/allNews/userSettings/handlers';

export const Notifications = () => {
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
								<ThemedText
									type='textMd'
									tokenColor={appTokens.text.secondary}
									style={styles.buttonText}
								>
									Push
								</ThemedText>
							</ThemedView>
							<Switch
								value={isPushNotificationsEnabled}
								onChange={newValue =>
									putNotificationsSettingsFx({
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
								<ThemedText
									type='textMd'
									tokenColor={appTokens.text.secondary}
									style={styles.buttonText}
								>
									Sound
								</ThemedText>
							</ThemedView>
							<Switch
								value={isPushNotificationsSound}
								onChange={newValue =>
									putNotificationsSettingsFx({
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
									putNotificationsSettingsFx({
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
		fontWeight: 500,
		fontFamily: 'MontserratMedium',
	},

	divider: {
		width: '100%',
		height: 1,
	},
});
