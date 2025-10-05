import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Button } from '@/components/ui/Button';
import {
	ScrollView,
	StyleSheet,
	Image,
	View,
	Linking,
	TouchableOpacity,
	Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CloseIcon from '@/assets/icons/close-icon.svg';
import StarDuoIcon from '@/assets/icons/star-duo-icon.svg';
import MicrophoneDuoIcon from '@/assets/icons/microphone-duo-icon.svg';
import MedalDuoIcon from '@/assets/icons/medal-duo-icon.svg';
import AdDuoIcon from '@/assets/icons/ad-duo-icon.svg';
import ChatLikeDuoIcon from '@/assets/icons/chat-like-duo-icon.svg';
import PieChartIcon from '@/assets/icons/pie-chart-icon.svg';
import SettingsDuoIcon from '@/assets/icons/settings-duo-icon.svg';
import FireIcon from '@/assets/icons/fire-icon.svg';
import { appTokens } from '@/constants/tokens';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useRouter } from 'expo-router';
import ModalPremiumImage from '@/assets/images/ModalPremiumImage.svg';
import ReviewAvatar from '@/assets/images/ReviewAvatar.png';
import CallAvatar from '@/assets/images/CallAvatar.png';
import React, { FC, useRef, useState } from 'react';
import { SvgProps } from 'react-native-svg';
import { Badge } from '@/components/ui/Badge/Badge';

const TERMS_OF_SERVICE_URL =
	'https://foxrunner.com/termsAndConditions?utm_source=chatgpt.com';
const PRIVACY_POLICY = 'https://foxrunner.com/privacyPolicy';

const OFFSET = 16;
const HEADER_HEIGHT = 192 + OFFSET;

interface Card {
	icon: FC<SvgProps>;
	title: string;
	isSoon: boolean;
	description?: string;
}

const CARDS: Card[] = [
	{
		icon: StarDuoIcon,
		title: 'Keyword customization',
		description: 'Highlight the news you are hunting for',
		isSoon: false,
	},
	{
		icon: MicrophoneDuoIcon,
		title: 'Voiceover alerts',
		description: 'Make sure you never miss the important stuff',
		isSoon: false,
	},
	{
		icon: MedalDuoIcon,
		title: 'Additional filters',
		description: 'Keep your focus on what is important',
		isSoon: false,
	},
	{
		icon: AdDuoIcon,
		title: 'No ads',
		description: 'Opt in for the uninterrupted trading experience',
		isSoon: false,
	},
	{
		icon: ChatLikeDuoIcon,
		title: 'Unlimited news alerts',
		description: 'Stay updated with alerts on the latest news',
		isSoon: true,
	},
	{
		icon: PieChartIcon,
		title: 'Congress trading chart',
		description: 'Get a sneak peek at any politician is top traded assets',
		isSoon: true,
	},
	{
		icon: SettingsDuoIcon,
		title: 'And many other customization options!',
		isSoon: true,
	},
];

interface Plan {
	name: string;
	period: string;
	monthPrice: string;
	total: string;
	isPopular: boolean;
	saveMoney?: string;
}

const PLANS: Plan[] = [
	{
		name: 'Monthly',
		period: '1 month of Premium',
		monthPrice: '$69',
		total: '$69.99',
		isPopular: false,
	},
	{
		name: 'Semi-annual',
		period: '6 months of Premium',
		monthPrice: '$58',
		total: '$350',
		isPopular: false,
		saveMoney: '$70',
	},
	{
		name: 'Annual',
		period: '12 months of Premium',
		monthPrice: '$49',
		total: '$599.99',
		isPopular: true,
		saveMoney: '$240',
	},
];

export default function ModalScreen() {
	const { width: screenWidth } = Dimensions.get('window');
	const [selectedPlan, setSelectedPlan] = useState<Plan>(PLANS[2]);
	const [plansPosition, setPlansPosition] = useState(0);
	const router = useRouter();
	const scrollRef = useRef<ScrollView>(null);
	const { top: topSafeArea, bottom: bottomSafeArea } = useSafeAreaInsets();

	const borderTertiaryColor = useThemeColor(appTokens.border.tertiary);
	const borderAltColor = useThemeColor(appTokens.border.alt);
	const borderBrandColor = useThemeColor(appTokens.border.brand);
	const backgroundPrimaryColor = useThemeColor(appTokens.background.primary);
	const backgroundSecondaryColor = useThemeColor(
		appTokens.background.secondary
	);
	const backgroundColor = useThemeColor(appTokens.background.overlay);
	const iconWhiteColor = useThemeColor(appTokens.foreground.white);
	const iconColor = useThemeColor(appTokens.component.buttons.primary.fg);
	const iconBrandColor = useThemeColor(appTokens.foreground.brandPrimary);
	const textPrimaryColor = useThemeColor(appTokens.text.primary);
	const textQuaternaryColor = useThemeColor(appTokens.text.quaternary);
	const textBrandColor = useThemeColor(appTokens.text.brandSecondary);
	const bgButtonColor = appTokens.alpha.white[10];

	return (
		<ThemedView style={{ flex: 1 }}>
			<ScrollView
				ref={scrollRef}
				showsVerticalScrollIndicator={false}
				style={[styles.container]}
			>
				<ThemedView
					style={[
						styles.header,
						{ paddingTop: topSafeArea, height: HEADER_HEIGHT + topSafeArea },
					]}
				>
					<ModalPremiumImage
						width={screenWidth}
						style={{
							position: 'absolute',
							top: 0,
							right: 0,
							left: 0,
							bottom: 0,
						}}
						stroke={backgroundColor}
					/>
					<ThemedText type='displayXs' style={styles.headerText}>
						Dominate the Market. Try&nbsp;Premium Free
					</ThemedText>
					<ThemedText>🔥 FoxRunner Premium</ThemedText>
					<Button
						size='sm'
						icon={<CloseIcon width={20} height={20} fill={iconColor} />}
						onlyIcon
						buttonStyle={[
							styles.closeButton,
							{ backgroundColor: bgButtonColor },
						]}
						containerStyle={[
							styles.closeButtonExtra,
							{ top: topSafeArea + 10 },
						]}
						onPress={() => router.back()}
					/>
				</ThemedView>

				<ThemedView
					style={[
						styles.content,
						{ backgroundColor: backgroundColor, borderColor: borderAltColor },
					]}
				>
					<ThemedText
						type='textLg'
						style={[styles.title, { color: textPrimaryColor }]}
					>
						Why Pros Trade with Premium
					</ThemedText>

					<ScrollView
						horizontal
						contentContainerStyle={styles.cards}
						showsHorizontalScrollIndicator={false}
					>
						{CARDS.map(card => (
							<ThemedView
								key={card.title}
								style={[
									styles.cardItem,
									{
										backgroundColor: backgroundPrimaryColor,
										borderColor: borderTertiaryColor,
									},
								]}
							>
								<card.icon
									width={28}
									height={28}
									fill={iconBrandColor}
									style={styles.cardIcon}
								/>
								<ThemedText
									type='textMd'
									style={[styles.cardTitle, { color: textPrimaryColor }]}
								>
									{card.title}
								</ThemedText>
								{card.description && (
									<ThemedText
										type='textSm'
										style={[
											styles.cardDescription,
											{ color: textQuaternaryColor },
										]}
									>
										{card.description}
									</ThemedText>
								)}
							</ThemedView>
						))}
					</ScrollView>

					<ThemedText
						type='textLg'
						style={[styles.title, { color: textPrimaryColor }]}
					>
						Your edge is one click away
					</ThemedText>
					<ThemedView
						style={[
							styles.review,
							{
								backgroundColor: backgroundSecondaryColor,
								borderColor: borderAltColor,
							},
						]}
					>
						<ThemedView
							style={[
								styles.reviewContainer,
								{ backgroundColor: backgroundSecondaryColor },
							]}
						>
							<Image source={ReviewAvatar} style={styles.reviewAvatar} />
							<ThemedView
								style={[
									styles.reviewContent,
									{ backgroundColor: backgroundSecondaryColor },
								]}
							>
								<ThemedText
									type='textMd'
									style={[styles.reviewText, { color: textPrimaryColor }]}
								>
									“I didn’t realize what I was missing until I upgraded.”
								</ThemedText>
								<ThemedText
									type='textSm'
									style={[styles.reviewAuthor, { color: textQuaternaryColor }]}
								>
									Andrew Isaacson, actual FoxRunner user
								</ThemedText>
							</ThemedView>
						</ThemedView>
					</ThemedView>

					<ThemedText
						type='textLg'
						style={[styles.title, { color: textPrimaryColor }]}
					>
						Plans for Serious Traders
					</ThemedText>
					<View
						style={[styles.plans]}
						onLayout={event => {
							const layout = event.nativeEvent.layout;
							setPlansPosition(layout.y);
						}}
					>
						{PLANS.map((plan, index) => (
							<TouchableOpacity
								key={plan.name}
								onPress={() => setSelectedPlan(PLANS[index])}
							>
								<ThemedView
									style={[
										styles.plan,
										{
											backgroundColor: backgroundPrimaryColor,
											borderColor: borderTertiaryColor,
										},
										selectedPlan === plan && { borderColor: borderBrandColor },
									]}
								>
									<View style={[styles.planRow, { marginBottom: 2 }]}>
										<ThemedText type='textLg' style={styles.planName}>
											{plan.name}
										</ThemedText>
										<ThemedText
											type='textLg'
											style={styles.planMonthPrice}
										>{`${plan.monthPrice}/mo`}</ThemedText>
									</View>
									<View
										style={[
											styles.planRow,
											plan.saveMoney && { marginBottom: 12 },
										]}
									>
										<ThemedText
											type='textSm'
											style={[
												styles.planPeriod,
												{ color: textQuaternaryColor },
											]}
										>
											{plan.period}
										</ThemedText>
										<ThemedText
											type='textSm'
											style={[styles.planTotal, { color: textQuaternaryColor }]}
										>{`${plan.total} total`}</ThemedText>
									</View>
									{plan.saveMoney && (
										<View style={styles.planOptions}>
											<Badge
												variant='filled'
												color='primary'
												size='md'
												value={`Save ${plan.saveMoney}`}
											/>
											{plan.isPopular && (
												<Badge
													variant='filled'
													color='red'
													size='md'
													value={
														<View style={styles.planIcon}>
															<FireIcon
																width={16}
																height={16}
																color={iconWhiteColor}
															/>
															<ThemedText type='textSm'>
																Most popular
															</ThemedText>
														</View>
													}
												/>
											)}
										</View>
									)}
								</ThemedView>
							</TouchableOpacity>
						))}
					</View>

					<ThemedView
						style={[
							styles.call,
							{
								backgroundColor: backgroundSecondaryColor,
								borderColor: borderAltColor,
							},
						]}
					>
						<Image source={CallAvatar} style={styles.callAvatar} />
						<ThemedText
							type='textMd'
							style={[styles.callText, { color: textPrimaryColor }]}
						>
							92% of power users upgrade to Premium
						</ThemedText>
						<ThemedText
							type='textSm'
							style={[styles.callDescription, { color: textQuaternaryColor }]}
						>
							Are you one of them?
						</ThemedText>
					</ThemedView>

					<View style={[styles.linkRules]}>
						<ThemedText
							type='textSm'
							style={[styles.linkText, { color: textQuaternaryColor }]}
						>
							By subscribing, you agree to&nbsp;our&nbsp;
							<ThemedText
								type='textSm'
								style={[styles.link, { color: textBrandColor }]}
								onPress={() => Linking.openURL(TERMS_OF_SERVICE_URL)}
							>
								Terms&nbsp;of&nbsp;Service
							</ThemedText>{' '}
							and&nbsp;
							<ThemedText
								type='textSm'
								style={[styles.link, { color: textBrandColor }]}
								onPress={() => Linking.openURL(PRIVACY_POLICY)}
							>
								Privacy Policy
							</ThemedText>
						</ThemedText>
					</View>
				</ThemedView>
			</ScrollView>

			<View
				style={[
					styles.bottom,
					{
						paddingBottom: bottomSafeArea + 16,
						borderColor: borderTertiaryColor,
					},
				]}
			>
				<ThemedText type='textXs' style={styles.bottomText}>
					<ThemedText type='textXs'>{`${selectedPlan.total} / year `}</ThemedText>
					<ThemedText
						type='textXs'
						style={{ color: textQuaternaryColor }}
					>{`(${selectedPlan.monthPrice}/mo)`}</ThemedText>
				</ThemedText>
				<View style={styles.buttons}>
					<Button title='Continue' variant='primary' size='lg' />
					<Button
						title='All Plans'
						variant='link'
						size='lg'
						buttonStyle={styles.linkButton}
						onPress={() =>
							scrollRef.current?.scrollTo({
								y: plansPosition - 16,
								animated: true,
							})
						}
					/>
				</View>
			</View>
		</ThemedView>
	);
}

const styles = StyleSheet.create({
	container: {
		position: 'relative',
		flex: 1,
	},

	header: {
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		overflow: 'hidden',
	},

	headerText: {
		maxWidth: 340,
		marginBottom: 8,
		textAlign: 'center',
		fontWeight: 700,
		fontFamily: 'MontserratBold',
	},

	closeButtonExtra: {
		position: 'absolute',
		top: 0,
		right: 16,
	},

	closeButton: {
		borderRadius: 16,
	},

	title: {
		marginBottom: 20,
		paddingHorizontal: 20,
		fontWeight: 700,
		fontFamily: 'MontserratBold',
	},

	content: {
		marginTop: -OFFSET,
		zIndex: 1,
		borderTopLeftRadius: 16,
		borderTopRightRadius: 16,
		paddingTop: 16,
		overflow: 'hidden',
	},

	cards: {
		gap: 8,
		paddingHorizontal: 20,
		marginBottom: 16,
	},

	cardItem: {
		width: 208,
		alignItems: 'center',
		justifyContent: 'center',
		borderWidth: 2,
		borderRadius: 16,
		paddingVertical: 16,
		paddingHorizontal: 8,
	},

	cardIcon: {
		marginBottom: 8,
	},

	cardTitle: {
		maxWidth: 176,
		marginBottom: 4,
		textAlign: 'center',
		fontWeight: 600,
		fontFamily: 'MontserratSemiBold',
	},

	cardDescription: {
		textAlign: 'center',
		fontWeight: 500,
		fontFamily: 'MontserratMedium',
	},

	review: {
		borderWidth: 1,
		borderRadius: 16,
		marginHorizontal: 20,
		paddingVertical: 12,
		paddingHorizontal: 16,
		marginBottom: 24,
	},

	reviewContainer: {
		flexDirection: 'row',
		alignItems: 'flex-start',
		gap: 16,
	},

	reviewContent: {
		flex: 1,
	},

	reviewAvatar: {
		width: 40,
		height: 40,
	},

	reviewText: {
		marginBottom: 4,
		fontWeight: 600,
		fontFamily: 'MontserratSemiBold',
	},

	reviewAuthor: {
		fontWeight: 500,
		fontFamily: 'MontserratMedium',
	},

	plans: {
		gap: 8,
		marginHorizontal: 20,
		marginBottom: 24,
	},

	plan: {
		borderWidth: 2,
		borderRadius: 16,
		paddingHorizontal: 20,
		paddingVertical: 16,
	},

	planRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},

	planName: {
		fontWeight: 700,
		fontFamily: 'MontserratBold',
	},

	planMonthPrice: {
		fontWeight: 700,
		fontFamily: 'MontserratBold',
	},

	planPeriod: {
		fontWeight: 500,
		fontFamily: 'MontserratMedium',
	},

	planTotal: {
		fontWeight: 500,
		fontFamily: 'MontserratMedium',
	},

	planOptions: {
		flexDirection: 'row',
		gap: 4,
	},

	planIcon: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 2,
	},

	call: {
		borderWidth: 1,
		borderRadius: 16,
		marginHorizontal: 20,
		paddingVertical: 12,
		paddingHorizontal: 16,
		marginBottom: 24,
	},

	callAvatar: {
		width: 116,
		height: 32,
		marginBottom: 12,
	},

	callText: {
		marginBottom: 8,
		fontWeight: 600,
		fontFamily: 'MontserratSemiBold',
	},

	callDescription: {
		fontWeight: 500,
		fontFamily: 'MontserratMedium',
	},

	linkRules: {
		marginHorizontal: 20,
	},

	linkText: {
		marginBottom: 20,
		textAlign: 'center',
		fontWeight: 500,
		fontFamily: 'MontserratMedium',
	},

	link: {
		textDecorationLine: 'underline',
	},

	buttonContainer: {
		gap: 12,
	},

	bottom: {
		borderRadius: 8,
		borderWidth: 1,
		padding: 16,
	},

	bottomText: {
		textAlign: 'center',
		marginBottom: 12,
	},

	buttons: {
		gap: 12,
	},

	linkButton: {
		paddingVertical: 0,
		paddingHorizontal: 0,
	},
});
