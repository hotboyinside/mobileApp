import FireIcon from '@/assets/icons/fire-icon.svg';
import CallAvatar from '@/assets/images/CallAvatar.png';
import { useSession } from '@/components/appProvider/session/SessionContext';
import { useGlobalSheet } from '@/components/appProvider/sheetModal/GlobalSheetProvider';
import PurchaseSuccessBottomSheet from '@/components/pages/premiumModal/PurchaseSuccessBottomSheet';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Button } from '@/components/ui/Button';
import { postInAppPurchasesRequest } from '@/config/api/inAppPurchases';
import { ExternalLinks } from '@/constants/links';
import { appTokens } from '@/constants/tokens';
import { isUserPremium } from '@/helpers/userStatus/isUserPremium';
import { useThemeColor } from '@/hooks/useThemeColor';
import {
	closeFilterSubTab,
	FilterSubTabVariant,
	openFilterSubTab,
} from '@/stores/allNews/filtersPanel/model';
import { useUnit } from 'effector-react';
import { ErrorCode, useIAP } from 'expo-iap';
import React, { useEffect, useRef, useState } from 'react';
import {
	Image,
	Linking,
	ScrollView,
	StyleSheet,
	TouchableOpacity,
	View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CARDS } from './const/cards';
import { Plan, PLANS } from './const/plans';
import FeatureCard from './FeatureCard';
import ModalHeader from './ModalHeader';
import { PlanCard } from './PlanCard';
import { Review } from './Review';

const OFFSET = 16;

const SUB_IDS = ['premium_monthly', 'premium_halfyear', 'premium_yearly'];

export const PremiumModal = () => {
	const scrollRef = useRef<ScrollView>(null);
	const { session, updateUser } = useSession();
	const { openSheetModal, closeSheetModal } = useGlobalSheet();
	const { bottom: bottomSafeArea } = useSafeAreaInsets();

	const onOpenFilterSubTab = useUnit(openFilterSubTab);
	const onCloseFilterSubTab = useUnit(closeFilterSubTab);

	const currentPlanId =
		session?.currentSubscription.mobileSubscription?.productId;
	const currentPlan = PLANS.find(plan => plan.id === currentPlanId) || PLANS[2];
	const [selectedPlan, setSelectedPlan] = useState<Plan>(currentPlan);
	const [plansPosition, setPlansPosition] = useState(0);

	const handleBuy = async (id: string) => {
		try {
			await requestPurchase({
				request: { ios: { sku: id }, android: { skus: [id] } },
				type: 'subs',
			});
		} catch (err) {
			console.warn('requestPurchase error:', err);
		}
	};

	const openKeywordColorPickerSheet = () => {
		onOpenFilterSubTab(FilterSubTabVariant.premiumSuccessPurchase);
		openSheetModal(
			'secondary',
			<PurchaseSuccessBottomSheet
				onClose={() => {
					onCloseFilterSubTab();
					closeSheetModal('secondary');
				}}
			/>
		);
	};

	const { connected, fetchProducts, requestPurchase, finishTransaction } =
		useIAP({
			onPurchaseSuccess: async purchase => {
				try {
					const result = await postInAppPurchasesRequest(purchase);

					if (result.data.success.valid) {
						await finishTransaction({ purchase, isConsumable: false });
						updateUser({
							currentSubscription: {
								mobileSubscription: {
									...result.data.success.purchase,
								},
							},
						});
						openKeywordColorPickerSheet();
					}
				} catch (err) {
					console.warn('finishTransaction error', err);
				}
			},
			onPurchaseError: ({ code }) => {
				if (code === ErrorCode.UserCancelled) {
					return;
				}
			},
		});

	const isPremiumUser = isUserPremium(session);
	const isFreeTrialUsed = session?.isFreeTrialUsed;

	const isFreeUserWithTrial = !isPremiumUser && !isFreeTrialUsed;

	const borderTertiaryColor = useThemeColor(appTokens.border.tertiary);
	const borderAltColor = useThemeColor(appTokens.border.alt);
	const backgroundPrimaryColor = useThemeColor(appTokens.background.primary);
	const backgroundSecondaryColor = useThemeColor(
		appTokens.background.secondary
	);
	const iconBrandColor = useThemeColor(appTokens.foreground.brandPrimary);
	const textQuaternaryColor = useThemeColor(appTokens.text.quaternary);
	const textBrandColor = useThemeColor(appTokens.text.brandSecondary);

	useEffect(() => {
		if (!connected) return;

		(async () => {
			try {
				await fetchProducts({ skus: SUB_IDS, type: 'subs' });
			} catch (err) {
				console.warn('fetchProducts error:', err);
			}
		})();
	}, [connected]);

	return (
		<ThemedView style={styles.wrapper}>
			<ScrollView
				ref={scrollRef}
				showsVerticalScrollIndicator={false}
				style={[styles.container]}
			>
				<ModalHeader
					isPremiumUser={isPremiumUser}
					isFreeTrialUsed={isFreeTrialUsed}
				/>

				<ThemedView
					style={[
						styles.content,
						{
							backgroundColor: backgroundPrimaryColor,
							borderColor: borderAltColor,
						},
					]}
				>
					<ThemedText type='textLg' style={styles.title}>
						Why Pros Trade with Premium
					</ThemedText>

					<ScrollView
						horizontal
						contentContainerStyle={styles.cards}
						showsHorizontalScrollIndicator={false}
					>
						{CARDS.map(card => (
							<FeatureCard key={card.title} {...card} />
						))}
					</ScrollView>

					<Review />

					<ThemedText type='textLg' style={styles.title}>
						Plans for Serious Traders
					</ThemedText>
					{isFreeUserWithTrial && (
						<View style={styles.trial}>
							<FireIcon width={24} height={24} color={iconBrandColor} />
							<View>
								<ThemedText
									style={styles.trialTitle}
									tokenColor={appTokens.text.secondary}
									type='textSm'
								>
									1-month free trial.
								</ThemedText>
								<ThemedText
									style={styles.trialDescription}
									tokenColor={appTokens.text.quaternary}
									type='textSm'
								>
									Pay only after your trial ends.
								</ThemedText>
							</View>
						</View>
					)}
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
								disabled={isPremiumUser}
							>
								<PlanCard
									plan={plan}
									selected={plan.id === selectedPlan.id}
									isPremiumUser={isPremiumUser}
									isFreeTrialUsed={isFreeTrialUsed}
								/>
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
						<ThemedText type='textMd' style={styles.callText}>
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
								onPress={() => Linking.openURL(ExternalLinks.termsUrl)}
							>
								Terms&nbsp;of&nbsp;Service
							</ThemedText>{' '}
							and&nbsp;
							<ThemedText
								type='textSm'
								style={[styles.link, { color: textBrandColor }]}
								onPress={() => Linking.openURL(ExternalLinks.privacyPolicyUrl)}
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
				{!isPremiumUser && (
					<ThemedText type='textXs' style={styles.bottomText}>
						{isFreeUserWithTrial && (
							<ThemedText type='textXs'>1 month free, then</ThemedText>
						)}{' '}
						<ThemedText type='textXs'>{`${selectedPlan.total} / year `}</ThemedText>
						<ThemedText
							type='textXs'
							style={{ color: textQuaternaryColor }}
						>{`(${selectedPlan.monthPrice}/mo)`}</ThemedText>
					</ThemedText>
				)}
				<View style={styles.buttons}>
					{!isPremiumUser && (
						<Button
							title='Continue'
							variant='primary'
							size='lg'
							onPress={() => handleBuy(selectedPlan.id)}
						/>
					)}
					{isPremiumUser && (
						<Button
							title='Premium Active'
							variant='primary'
							size='lg'
							disabled={true}
						/>
					)}

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
};

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
	},

	container: {
		position: 'relative',
		flex: 1,
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

	trial: {
		flexDirection: 'row',
		gap: 8,
		marginHorizontal: 20,
		marginBottom: 16,
	},

	trialTitle: {
		fontWeight: 500,
		fontFamily: 'MontserratMedium',
	},

	trialDescription: {
		fontWeight: 500,
		fontFamily: 'MontserratMedium',
	},

	plans: {
		gap: 8,
		marginHorizontal: 20,
		marginBottom: 24,
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

	bottom: {
		borderRadius: 8,
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
