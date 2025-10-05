import React from 'react';
import {
	View,
	StyleSheet,
	ScrollView,
	TouchableOpacity,
	Image,
} from 'react-native';
import BoltDuoIcon from '@/assets/icons/bolt-duo-icon.svg';
import { ThemedView } from '@/components/ThemedView';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useThemeColor } from '@/hooks/useThemeColor';
import { appTokens } from '@/constants/tokens';
import { ThemedText } from '@/components/ThemedText';
import PeopleDuoIcon from '@/assets/icons/people-duo-icon.svg';
import BellIcon from '@/assets/icons/bell-icon.svg';
import ThemeIcon from '@/assets/icons/theme-icon.svg';
import ArrowRightSoftIcon from '@/assets/icons/arrow-right-soft-icon.svg';
import UserIcon from '@/assets/icons/user-icon.svg';
import DollarIcon from '@/assets/icons/dollar.svg';
import QuestionIcon from '@/assets/icons/question.svg';
import LogOutIcon from '@/assets/icons/log-out-icon.svg';
import { Button } from '@/components/ui/Button';
import gradientImg from '@/assets/images/Glow.png';
import MoreBackgroundImage from '@/assets/images/MoreBackgroundImage.png';
import { useRouter } from 'expo-router';
import { useSession } from '@/components/appProvider/session/SessionContext';
import Social from '@/components/ui/Social';
import { MODAL, NOTIFICATIONS } from '@/constants/routes';

const OFFSET = 28;
const HEADER_HEIGHT = 160 + OFFSET;

export default function More() {
	const router = useRouter();
	const { signOut } = useSession();
	const { top: topSafeArea } = useSafeAreaInsets();

	const textErrorColor = useThemeColor(appTokens.text.errorPrimary);
	const textPrimaryColor = useThemeColor(appTokens.text.primary);
	const textSecondaryColor = useThemeColor(appTokens.text.secondary);
	const textQuaternaryColor = useThemeColor(appTokens.text.quaternary);
	const iconFgColor = useThemeColor(appTokens.foreground.white);
	const iconErrorColor = useThemeColor(appTokens.foreground.errorPrimary);
	const iconBrandColor = useThemeColor(appTokens.foreground.brandPrimary);
	const iconGrayColor = useThemeColor(appTokens.utilityGray[400]);
	const iconLinkGray = useThemeColor(appTokens.component.buttons.linkGray.fg);
	const backgroundErrorColor = useThemeColor(appTokens.background.errorPrimary);
	const backgroundColor = useThemeColor(appTokens.background.primary);
	const borderAltColor = useThemeColor(appTokens.border.alt);
	const borderTertiaryColor = useThemeColor(appTokens.border.tertiary);
	const bgOverlayColor = useThemeColor(appTokens.background.overlay);
	const bgSecondaryColor = useThemeColor(appTokens.background.secondarySubtle);

	return (
		<ScrollView
			showsVerticalScrollIndicator={false}
			style={[styles.container, { backgroundColor: backgroundColor }]}
		>
			<ThemedView
				style={[
					styles.header,
					{
						height: HEADER_HEIGHT + topSafeArea,
					},
				]}
			>
				<Image source={MoreBackgroundImage} style={[styles.backgroundImage]} />
				<ThemedText style={[styles.headerText, { paddingTop: topSafeArea }]}>
					Sean Dekmar
				</ThemedText>
				<ThemedText>🔥 Premium</ThemedText>
				<View style={{ height: OFFSET }} />
			</ThemedView>

			<ThemedView
				style={[
					styles.content,
					{ backgroundColor: backgroundColor, borderColor: borderAltColor },
				]}
			>
				<ThemedView style={styles.buttons}>
					<ThemedView
						style={[styles.button, { borderColor: borderTertiaryColor }]}
					>
						<BoltDuoIcon
							width={28}
							height={28}
							style={styles.icon}
							fill={iconBrandColor}
						/>
						<ThemedText
							type='textMd'
							style={[styles.buttonTitle, { color: textPrimaryColor }]}
						>
							Subscription
						</ThemedText>
						<ThemedText type='textXs' style={{ color: textQuaternaryColor }}>
							Start for free. Upgrade anytime.
						</ThemedText>
					</ThemedView>
					<ThemedView
						style={[styles.button, { borderColor: borderTertiaryColor }]}
					>
						<PeopleDuoIcon
							width={28}
							height={28}
							style={styles.icon}
							fill={iconBrandColor}
						/>
						<ThemedText
							type='textMd'
							style={[styles.buttonTitle, { color: textPrimaryColor }]}
						>
							Invite & Earn
						</ThemedText>
						<ThemedText type='textXs' style={{ color: textQuaternaryColor }}>
							Invite a Friend — Earn Money.
						</ThemedText>
					</ThemedView>
				</ThemedView>

				<TouchableOpacity onPress={() => router.push(MODAL)}>
					<ThemedView
						style={[styles.promo, { backgroundColor: bgOverlayColor }]}
					>
						<ThemedText type='textMd' style={styles.promoTitle}>
							Upgrade to Premium
						</ThemedText>
						<ThemedText type='textSm' style={styles.promoDescription}>
							30 days free — get full access now!
						</ThemedText>
						<BoltDuoIcon
							width={60}
							height={60}
							fill={iconFgColor}
							style={styles.promoIcon}
						/>
						<Image source={gradientImg} style={styles.gradientCircleLeft} />
						<Image source={gradientImg} style={styles.gradientCircleRight} />
					</ThemedView>
				</TouchableOpacity>

				<ThemedView
					style={[
						styles.settings,
						{
							marginTop: 24,
							backgroundColor: bgSecondaryColor,
							borderColor: borderTertiaryColor,
						},
					]}
				>
					<TouchableOpacity
						onPress={() => router.push(NOTIFICATIONS)}
						style={[
							styles.settingsButton,
							{ borderColor: borderTertiaryColor },
						]}
					>
						<ThemedView
							style={[
								styles.settingsTitle,
								{ backgroundColor: bgSecondaryColor },
							]}
						>
							<BellIcon width={20} height={20} color={iconGrayColor} />
							<ThemedText
								style={[styles.settingsText, { color: textSecondaryColor }]}
							>
								Notifications
							</ThemedText>
						</ThemedView>
						<ArrowRightSoftIcon width={20} height={20} fill={iconLinkGray} />
					</TouchableOpacity>
					<TouchableOpacity
						style={[
							styles.settingsButton,
							{ borderColor: borderTertiaryColor },
						]}
					>
						<ThemedView
							style={[
								styles.settingsTitle,
								{ backgroundColor: bgSecondaryColor },
							]}
						>
							<ThemeIcon width={20} height={20} fill={iconGrayColor} />
							<ThemedText
								style={[styles.settingsText, { color: textSecondaryColor }]}
							>
								Theme
							</ThemedText>
						</ThemedView>
						<ArrowRightSoftIcon width={20} height={20} fill={iconLinkGray} />
					</TouchableOpacity>
					<TouchableOpacity style={[styles.settingsButton, styles.lastButton]}>
						<ThemedView
							style={[
								styles.settingsTitle,
								{ backgroundColor: bgSecondaryColor },
							]}
						>
							<UserIcon width={20} height={20} fill={iconLinkGray} />
							<ThemedText
								style={[styles.settingsText, { color: textSecondaryColor }]}
							>
								My account
							</ThemedText>
						</ThemedView>
					</TouchableOpacity>
				</ThemedView>

				<ThemedView
					style={[
						styles.settings,
						{
							marginTop: 16,
							backgroundColor: bgSecondaryColor,
							borderColor: borderTertiaryColor,
						},
					]}
				>
					<TouchableOpacity
						style={[
							styles.settingsButton,
							{ borderColor: borderTertiaryColor },
						]}
					>
						<ThemedView
							style={[
								styles.settingsTitle,
								{ backgroundColor: bgSecondaryColor },
							]}
						>
							<DollarIcon width={20} height={20} fill={iconLinkGray} />
							<ThemedText
								style={[styles.settingsText, { color: textSecondaryColor }]}
							>
								Restore Purchases
							</ThemedText>
						</ThemedView>
					</TouchableOpacity>
					<TouchableOpacity style={[styles.settingsButton, styles.lastButton]}>
						<ThemedView
							style={[
								styles.settingsTitle,
								{ backgroundColor: bgSecondaryColor },
							]}
						>
							<QuestionIcon width={20} height={20} fill={iconLinkGray} />
							<ThemedText
								style={[styles.settingsText, { color: textSecondaryColor }]}
							>
								Help & Support
							</ThemedText>
						</ThemedView>
					</TouchableOpacity>
				</ThemedView>

				<Button
					title='Log out'
					size='lg'
					variant='secondary'
					icon={<LogOutIcon width={20} height={20} fill={iconErrorColor} />}
					titleStyle={{ color: textErrorColor }}
					buttonStyle={{
						borderWidth: 0,
						justifyContent: 'flex-start',
						backgroundColor: backgroundErrorColor,
					}}
					containerStyle={styles.logOut}
					onPress={() => signOut()}
				/>

				<Social />

				<ThemedText style={[styles.version, { color: textQuaternaryColor }]}>
					Beta Version
				</ThemedText>
			</ThemedView>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	header: {
		position: 'relative',
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	backgroundImage: {
		position: 'absolute',
		top: 0,
		right: 0,
		left: 0,
		bottom: 0,
		width: '100%',
		height: '100%',
		resizeMode: 'cover',
	},

	headerText: { color: '#fff', fontSize: 22, fontWeight: 'bold' },
	content: {
		marginTop: -OFFSET,
		zIndex: 1,
		borderTopLeftRadius: 28,
		borderTopRightRadius: 28,
		paddingHorizontal: 16,
		paddingTop: 16,
	},

	buttons: {
		flexDirection: 'row',
		gap: 8,
		marginBottom: 12,
	},

	button: {
		flex: 1,
		borderWidth: 2,
		borderRadius: 16,
		paddingHorizontal: 16,
		paddingVertical: 12,
	},

	icon: {
		marginBottom: 8,
	},

	buttonTitle: {
		marginBottom: 2,
		fontWeight: 600,
		fontFamily: 'MontserratSemiBold',
	},

	promo: {
		position: 'relative',
		borderRadius: 16,
		padding: 16,
		overflow: 'hidden',
	},

	promoIcon: {
		zIndex: 1,
		position: 'absolute',
		top: 10,
		right: 10,
		transform: [{ rotate: '15deg' }],
	},

	promoTitle: {
		zIndex: 1,
		fontWeight: 600,
		fontFamily: 'MontserratSemiBold',
	},

	promoDescription: {
		zIndex: 1,
		marginTop: 4,
		fontWeight: 400,
		fontFamily: 'MontserratRegular',
	},

	gradientCircleLeft: {
		position: 'absolute',
		top: -25,
		left: -75,
		borderRadius: 40,
		width: 150,
		height: 150,
		transform: [{ rotate: '180deg' }],
	},

	gradientCircleRight: {
		position: 'absolute',
		top: -25,
		right: -55,
		borderRadius: 67,
		width: 150,
		height: 150,
	},

	settings: {
		borderRadius: 24,
		borderWidth: 1,
	},

	settingsTitle: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
	},

	settingsText: {
		fontWeight: 500,
		fontFamily: 'MontserratMedium',
	},

	settingsButton: {
		borderBottomWidth: 1,
		paddingVertical: 12,
		paddingHorizontal: 20,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},

	lastButton: {
		borderBottomWidth: 0,
	},

	logOut: {
		marginTop: 16,
		marginBottom: 24,
	},

	version: {
		marginTop: 8,
		textAlign: 'center',
		marginBottom: 30,
	},
});
