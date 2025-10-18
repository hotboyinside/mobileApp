import ArrowRightSoftIcon from '@/assets/icons/arrow-right-soft-icon.svg';
import BellIcon from '@/assets/icons/bell-icon.svg';
import BoltDuoIcon from '@/assets/icons/bolt-duo-icon.svg';
import DollarIcon from '@/assets/icons/dollar.svg';
import LogOutIcon from '@/assets/icons/log-out-icon.svg';
import PeopleDuoIcon from '@/assets/icons/people-duo-icon.svg';
import QuestionIcon from '@/assets/icons/question.svg';
import ThemeIcon from '@/assets/icons/theme-icon.svg';
import UserIcon from '@/assets/icons/user-icon.svg';
import { useSession } from '@/components/appProvider/session/SessionContext';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Button } from '@/components/ui/Button';
import Social from '@/components/ui/Social';
import { ExternalLinks } from '@/constants/links';
import { MODAL, NOTIFICATIONS, SHOP, THEME } from '@/constants/routes';
import { appTokens } from '@/constants/tokens';
import { isUserPremium } from '@/helpers/userStatus/isUserPremium';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useRouter } from 'expo-router';
import {
	Linking,
	Pressable,
	ScrollView,
	StyleSheet,
	TouchableOpacity,
} from 'react-native';
import { Header } from './Header';
import { PromoButton } from './PromoButton';

const OFFSET = 28;

export default function More() {
	const router = useRouter();
	const { session, signOut } = useSession();

	const isPremiumUser = isUserPremium(session);
	const isFreeTrialUsed = session?.currentSubscription?.isFreeTrialUsed;
	const userFullName = `${session?.firstName} ${session?.lastName}`;

	const textErrorColor = useThemeColor(appTokens.text.errorPrimary);
	const textPrimaryColor = useThemeColor(appTokens.text.primary);
	const textSecondaryColor = useThemeColor(appTokens.text.secondary);
	const textQuaternaryColor = useThemeColor(appTokens.text.quaternary);
	const iconErrorColor = useThemeColor(appTokens.foreground.errorPrimary);
	const iconBrandColor = useThemeColor(appTokens.foreground.brandPrimary);
	const iconGrayColor = useThemeColor(appTokens.utilityGray[400]);
	const iconLinkGray = useThemeColor(appTokens.component.buttons.linkGray.fg);
	const backgroundErrorColor = useThemeColor(appTokens.background.errorPrimary);
	const backgroundColor = useThemeColor(appTokens.background.primary);
	const borderAltColor = useThemeColor(appTokens.border.alt);
	const borderTertiaryColor = useThemeColor(appTokens.border.tertiary);
	const bgSecondaryColor = useThemeColor(appTokens.background.secondarySubtle);

	return (
		<ScrollView
			showsVerticalScrollIndicator={false}
			style={[styles.container, { backgroundColor: backgroundColor }]}
		>
			<Header userName={userFullName} isPremium={isPremiumUser} />

			<ThemedView
				style={[
					styles.content,
					{ backgroundColor: backgroundColor, borderColor: borderAltColor },
				]}
			>
				<ThemedView style={styles.buttons}>
					<Pressable
						onPress={() => router.push(MODAL)}
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
					</Pressable>
					<Pressable
						onPress={() => Linking.openURL(ExternalLinks.affiliateUrl)}
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
					</Pressable>
				</ThemedView>

				{!isPremiumUser && !isFreeTrialUsed && <PromoButton />}

				<ThemedView
					style={[
						styles.settings,
						{
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
						onPress={() => router.push(THEME)}
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
					<TouchableOpacity
						onPress={() => Linking.openURL(ExternalLinks.webProfileUrl)}
						style={[styles.settingsButton, styles.lastButton]}
					>
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
						onPress={() => router.push(SHOP)}
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
					<TouchableOpacity
						onPress={() => Linking.openURL(ExternalLinks.faqUrl)}
						style={[styles.settingsButton, styles.lastButton]}
					>
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
					buttonStyle={[
						styles.buttonExtra,
						{
							backgroundColor: backgroundErrorColor,
						},
					]}
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

	headerText: {
		marginBottom: 8,
		fontWeight: 700,
		fontFamily: 'MontserratBold',
	},

	iconContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 2,
	},

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

	buttonExtra: {
		borderWidth: 0,
		justifyContent: 'flex-start',
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
