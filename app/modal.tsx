import AdDuoIcon from "@/assets/icons/ad-duo-icon.svg";
import BoltDuoIcon from "@/assets/icons/bolt-duo-icon.svg";
import ChatLikeDuoIcon from "@/assets/icons/chat-like-duo-icon.svg";
import CloseIcon from "@/assets/icons/close-icon.svg";
import FireIcon from "@/assets/icons/fire-icon.svg";
import MedalDuoIcon from "@/assets/icons/medal-duo-icon.svg";
import MicrophoneDuoIcon from "@/assets/icons/microphone-duo-icon.svg";
import PieChartIcon from "@/assets/icons/pie-chart-icon.svg";
import SettingsDuoIcon from "@/assets/icons/settings-duo-icon.svg";
import StarDuoIcon from "@/assets/icons/star-duo-icon.svg";
import CallAvatar from "@/assets/images/CallAvatar.png";
import ModalPremiumImage from "@/assets/images/ModalPremiumImage.svg";
import ReviewAvatar from "@/assets/images/ReviewAvatar.png";
import { useSession } from "@/components/appProvider/session/SessionContext";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Badge } from "@/components/ui/Badge/Badge";
import { Button } from "@/components/ui/Button";
import { postInAppPurchasesRequest } from "@/config/api/inAppPurchases";
import { appTokens } from "@/constants/tokens";
import { isUserPremium } from "@/helpers/userStatus/isUserPremium";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ErrorCode, PurchaseAndroid, PurchaseIOS, useIAP } from "expo-iap";
import { useRouter } from "expo-router";
import React, { FC, useEffect, useRef, useState } from "react";
import {
  Alert,
  Dimensions,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SvgProps } from "react-native-svg";

const TERMS_OF_SERVICE_URL =
  "https://foxrunner.com/termsAndConditions?utm_source=chatgpt.com";
const PRIVACY_POLICY = "https://foxrunner.com/privacyPolicy";

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
    title: "Keyword customization",
    description: "Highlight the news you are hunting for",
    isSoon: false,
  },
  {
    icon: MicrophoneDuoIcon,
    title: "Voiceover alerts",
    description: "Make sure you never miss the important stuff",
    isSoon: false,
  },
  {
    icon: MedalDuoIcon,
    title: "Additional filters",
    description: "Keep your focus on what is important",
    isSoon: false,
  },
  {
    icon: AdDuoIcon,
    title: "No ads",
    description: "Opt in for the uninterrupted trading experience",
    isSoon: false,
  },
  {
    icon: ChatLikeDuoIcon,
    title: "Unlimited news alerts",
    description: "Stay updated with alerts on the latest news",
    isSoon: true,
  },
  {
    icon: PieChartIcon,
    title: "Congress trading chart",
    description: "Get a sneak peek at any politician is top traded assets",
    isSoon: true,
  },
  {
    icon: SettingsDuoIcon,
    title: "And many other customization options!",
    isSoon: true,
  },
];

interface Plan {
  id: string;
  name: string;
  period: string;
  monthPrice: string;
  total: string;
  isPopular: boolean;
  saveMoney?: string;
}

const PLANS: Plan[] = [
  {
    id: "premium_monthly",
    name: "Monthly",
    period: "1 month of Premium",
    monthPrice: "$69",
    total: "$69.99",
    isPopular: false,
  },
  {
    id: "premium_halfyear",
    name: "Semi-annual",
    period: "6 months of Premium",
    monthPrice: "$58",
    total: "$350",
    isPopular: false,
    saveMoney: "$70",
  },
  {
    id: "premium_yearly",
    name: "Annual",
    period: "12 months of Premium",
    monthPrice: "$49",
    total: "$599.99",
    isPopular: true,
    saveMoney: "$240",
  },
];

const SUB_IDS = ["premium_monthly", "premium_halfyear", "premium_yearly"];

export default function ModalScreen() {
  const scrollRef = useRef<ScrollView>(null);
  const router = useRouter();
  const { session, updateUser } = useSession();
  const [selectedPlan, setSelectedPlan] = useState<Plan>(PLANS[2]);
  const [plansPosition, setPlansPosition] = useState(0);
  const { top: topSafeArea, bottom: bottomSafeArea } = useSafeAreaInsets();
  const { width: screenWidth } = Dimensions.get("window");

  const { connected, fetchProducts, requestPurchase, finishTransaction } =
    useIAP({
      onPurchaseSuccess: async purchase => {
        try {
          let payload: any = {};
          if (purchase.platform === "ios") {
            const p = purchase as PurchaseIOS;
            payload = {
              platform: "ios",
              appBundleIdIOS: p.appBundleIdIOS,
              transactionId: p.transactionId,
              originalTransactionIdentifierIOS:
                p.originalTransactionIdentifierIOS,
              productId: p.productId,
              purchaseToken: p.purchaseToken,
              expirationDateIOS: p.expirationDateIOS,
              transactionDate: p.transactionDate,
              environmentIOS: p.environmentIOS,
            };
          } else {
            const p = purchase as PurchaseAndroid;
            const dataAndroid = p.dataAndroid ? JSON.parse(p.dataAndroid) : {};
            payload = {
              platform: "android",
              transactionId: p.transactionId || dataAndroid.orderId,
              productId: p.productId,
              purchaseToken: p.purchaseToken || dataAndroid.purchaseToken,
              transactionDate: p.transactionDate || dataAndroid.purchaseTime,
              packageNameAndroid:
                p.packageNameAndroid || dataAndroid.packageName,
            };
          }

          const result = await postInAppPurchasesRequest(payload);
          if (result.data.success.valid) {
            await finishTransaction({ purchase, isConsumable: false });
            updateUser({
              currentSubscription: {
                price: selectedPlan.id,
                nextBillingDate: result.data.success.expirationDate,
              },
            });
            Alert.alert("Успех", "Подписка активирована ✅");
          } else {
            Alert.alert("Ошибка", "Не прошла валидация покупки на сервере");
          }
        } catch (err) {
          console.warn("finishTransaction error", err);
        }
      },
      onPurchaseError: ({ code, message }) => {
        if (code === ErrorCode.UserCancelled) {
          Alert.alert("Покупка отменена");
          return;
        }
        Alert.alert("Ошибка", message || "Не удалось оформить покупку");
      },
    });

  const isPremiumUser = isUserPremium(session);
  const isFreeTrialUsed = session?.currentSubscription?.isFreeTrialUsed;

  const isFreeUserWithTrialUsed = !isPremiumUser && isFreeTrialUsed;
  const isFreeUserWithTrial = !isPremiumUser && !isFreeTrialUsed;

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
  const iconFgColor = useThemeColor(appTokens.foreground.white);
  const iconBrandColor = useThemeColor(appTokens.foreground.brandPrimary);
  const textPrimaryColor = useThemeColor(appTokens.text.primary);
  const textQuaternaryColor = useThemeColor(appTokens.text.quaternary);
  const textBrandColor = useThemeColor(appTokens.text.brandSecondary);
  const bgButtonColor = appTokens.alpha.white[10];

  useEffect(() => {
    if (!connected) return;
    (async () => {
      try {
        await fetchProducts({ skus: SUB_IDS, type: "subs" });
      } catch (err) {
        console.warn("fetchProducts error:", err);
      }
    })();
  }, [connected]);

  const handleBuy = async (id: string) => {
    try {
      await requestPurchase({
        request: { ios: { sku: id }, android: { skus: [id] } },
        type: "subs",
      });
    } catch (err) {
      console.warn("requestPurchase error:", err);
      Alert.alert("Ошибка", "Не удалось инициировать покупку");
    }
  };

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
            style={styles.image}
            stroke={backgroundColor}
          />
          <ThemedText
            tokenColor={appTokens.text.primaryOnBrand}
            type='displayXs'
            style={styles.headerText}
          >
            {isFreeUserWithTrial && "Dominate the Market.\nTry Premium Free"}
            {isFreeUserWithTrialUsed && "Reclaim Your Edge.\nUpgrade Now"}
            {isPremiumUser && "Lead the Market\nwith Premium"}
          </ThemedText>
          <Badge
            value={
              <View style={styles.iconContainer}>
                <BoltDuoIcon width={16} height={16} fill={iconFgColor} />
                <ThemedText
                  tokenColor={appTokens.text.primaryOnBrand}
                  type='textSm'
                >
                  FoxRunner Premium
                </ThemedText>
              </View>
            }
            variant='filled'
            color='primary'
            size='md'
          />
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
                      {isFreeUserWithTrialUsed ||
                        (isPremiumUser && plan.period)}
                      {isFreeUserWithTrial && `1 month free →\n${plan.period}`}
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
                        badgeStyle={styles.fullRadius}
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
                              <ThemedText
                                tokenColor={appTokens.text.primaryOnBrand}
                                type='textSm'
                                style={styles.planText}
                              >
                                Most popular
                              </ThemedText>
                            </View>
                          }
                          badgeStyle={styles.fullRadius}
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
              </ThemedText>{" "}
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
        {!isPremiumUser && (
          <ThemedText type='textXs' style={styles.bottomText}>
            {isFreeUserWithTrial && (
              <ThemedText type='textXs'>1 month free, then</ThemedText>
            )}{" "}
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
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
  },

  header: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },

  image: {
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
  },

  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },

  headerText: {
    maxWidth: 340,
    marginBottom: 8,
    textAlign: "center",
    fontWeight: 700,
    fontFamily: "MontserratBold",
  },

  closeButtonExtra: {
    position: "absolute",
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
    fontFamily: "MontserratBold",
  },

  content: {
    marginTop: -OFFSET,
    zIndex: 1,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingTop: 16,
    overflow: "hidden",
  },

  cards: {
    gap: 8,
    paddingHorizontal: 20,
    marginBottom: 16,
  },

  cardItem: {
    width: 208,
    alignItems: "center",
    justifyContent: "center",
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
    textAlign: "center",
    fontWeight: 600,
    fontFamily: "MontserratSemiBold",
  },

  cardDescription: {
    textAlign: "center",
    fontWeight: 500,
    fontFamily: "MontserratMedium",
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
    flexDirection: "row",
    alignItems: "flex-start",
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
    fontFamily: "MontserratSemiBold",
  },

  reviewAuthor: {
    fontWeight: 500,
    fontFamily: "MontserratMedium",
  },

  trial: {
    flexDirection: "row",
    gap: 8,
    marginHorizontal: 20,
    marginBottom: 16,
  },

  trialTitle: {
    fontWeight: 500,
    fontFamily: "MontserratMedium",
  },

  trialDescription: {
    fontWeight: 500,
    fontFamily: "MontserratMedium",
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
    flexDirection: "row",
    justifyContent: "space-between",
  },

  planName: {
    fontWeight: 700,
    fontFamily: "MontserratBold",
  },

  planMonthPrice: {
    fontWeight: 700,
    fontFamily: "MontserratBold",
  },

  planPeriod: {
    maxWidth: 211,
    fontWeight: 500,
    fontFamily: "MontserratMedium",
  },

  planTotal: {
    fontWeight: 500,
    fontFamily: "MontserratMedium",
  },

  planOptions: {
    flexDirection: "row",
    gap: 4,
  },

  planText: {
    fontWeight: 500,
    fontFamily: "MontserratMedium",
  },

  planIcon: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },

  fullRadius: {
    borderRadius: 100,
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
    fontFamily: "MontserratSemiBold",
  },

  callDescription: {
    fontWeight: 500,
    fontFamily: "MontserratMedium",
  },

  linkRules: {
    marginHorizontal: 20,
  },

  linkText: {
    marginBottom: 20,
    textAlign: "center",
    fontWeight: 500,
    fontFamily: "MontserratMedium",
  },

  link: {
    textDecorationLine: "underline",
  },

  buttonContainer: {
    gap: 12,
  },

  bottom: {
    borderRadius: 8,
    padding: 16,
  },

  bottomText: {
    textAlign: "center",
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
