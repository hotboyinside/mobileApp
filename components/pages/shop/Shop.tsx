import { ThemedText } from '@/components/ThemedText';
import { postInAppPurchasesRequest } from '@/config/api/inAppPurchases';
import { ErrorCode, PurchaseIOS, useIAP } from 'expo-iap';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Button, Platform, ScrollView, View } from 'react-native';

const IOS_SUBS = ['premium_monthly', 'premium_halfyear', 'premium_yearly'];
const ANDROID_SUBS = ['premium_access'];

export const Shop = () => {
  const [loading, setLoading] = useState(true);
  const {
    connected,
    subscriptions,
    fetchProducts,
    requestPurchase,
    finishTransaction,
  } = useIAP({
    onPurchaseSuccess: async purchase => {
      try {
        console.log('purchase', purchase);

        const iosPurchase = purchase as PurchaseIOS;

        const payload = {
          appBundleIdIOS: iosPurchase.appBundleIdIOS,
          transactionId: iosPurchase.transactionId,
          originalTransactionIdentifierIOS:
            iosPurchase.originalTransactionIdentifierIOS,
          productId: iosPurchase.productId,
          purchaseToken: iosPurchase.purchaseToken,
          expirationDateIOS: iosPurchase.expirationDateIOS,
          transactionDate: iosPurchase.transactionDate,
          environmentIOS: iosPurchase.environmentIOS,
          platform: iosPurchase.platform,
        };

        const result = await postInAppPurchasesRequest(payload);
        console.log('result', result);

        if (result.status === 200) {
          await finishTransaction({ purchase, isConsumable: false });
          Alert.alert('Успех', 'Подписка активирована ✅');
        } else {
          Alert.alert('Ошибка', 'Не прошла валидация покупки на сервере');
          return;
        }
      } catch (err) {
        console.warn('finishTransaction error', err);
      }
    },
    onPurchaseError: error => {
      const { code, message } = error;
      if (code === ErrorCode.UserCancelled) {
        Alert.alert('Покупка отменена');
        return;
      }
      Alert.alert('Ошибка', message || 'Не удалось оформить покупку');
    },
  });

  useEffect(() => {
    const load = async () => {
      if (!connected) return;
      setLoading(true);
      try {
        const skus = Platform.OS === 'ios' ? IOS_SUBS : ANDROID_SUBS;
        await fetchProducts({ skus, type: 'subs' });
      } catch (err) {
        console.warn('fetchProducts error:', err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [connected]);

  // iOS покупка
  const handleBuyIOS = async (id: string) => {
    try {
      await requestPurchase({
        request: { ios: { sku: id } },
        type: 'subs',
      });
    } catch (err) {
      console.warn('requestPurchase iOS error', err);
      Alert.alert('Ошибка', 'Не удалось оформить покупку');
    }
  };

  // Android покупка с offerToken
  const handleBuyAndroid = async (productId: string, offerToken: string) => {
    try {
      await requestPurchase({
        request: {
          android: { skus: [productId], offerToken },
        },
        type: 'subs',
      });
    } catch (err) {
      console.warn('requestPurchase Android error', err);
      Alert.alert('Ошибка', 'Не удалось оформить покупку');
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator />
        <ThemedText style={{ marginTop: 8 }}>Загружаем подписки...</ThemedText>
      </View>
    );
  }

  if (subscriptions.length === 0) {
    return (
      <View style={{ padding: 16 }}>
        <ThemedText>
          Подписки не найдены. Убедись, что productId совпадает с App Store / Google Play.
        </ThemedText>
      </View>
    );
  }

  return (
    <ScrollView style={{ padding: 16, backgroundColor: '#000' }}>
      <ThemedText style={{ fontSize: 20, fontWeight: '600', marginBottom: 12 }}>
        Подписки
      </ThemedText>

      {subscriptions.map(sub => (
        <View
          key={sub.id}
          style={{
            marginBottom: 20,
            padding: 12,
            borderWidth: 1,
            borderRadius: 8,
          }}
        >
          <ThemedText style={{ fontWeight: '600' }}>{sub.title ?? sub.id}</ThemedText>
          {sub.description ? <ThemedText>{sub.description}</ThemedText> : null}

          {Platform.OS === 'ios'
            ? sub.id &&
              IOS_SUBS.includes(sub.id) && (
                <Button title="Подписаться" onPress={() => handleBuyIOS(sub.id)} />
              )
            : sub.subscriptionOfferDetailsAndroid?.map(plan => (
                <View
                  key={plan.basePlanId}
                  style={{ marginTop: 12, padding: 6, borderWidth: 1, borderRadius: 6 }}
                >
                  <ThemedText style={{ fontWeight: '500' }}>
                    {plan.basePlanId.replace(/-/g, ' ')}
                  </ThemedText>
                  <ThemedText>
                    {plan.pricingPhases[0]?.formattedPrice ?? ''}
                  </ThemedText>
                  <Button
                    title="Подписаться"
                    onPress={() => handleBuyAndroid(sub.id, plan.offerToken)}
                  />
                </View>
              ))}
        </View>
      ))}
    </ScrollView>
  );
};
