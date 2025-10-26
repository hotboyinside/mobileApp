import { ThemedText } from '@/components/ThemedText';
import { ErrorCode, PurchaseIOS, useIAP } from 'expo-iap';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Button, View } from 'react-native';
import { postInAppPurchasesRequest } from '@/config/api/inAppPurchases';

const SUB_IDS = ['premium_monthly', 'premium_halfyear', 'premium_yearly'];

export const Shop = () => {
    const [loading, setLoading] = useState(true);
    const {
        connected,
        subscriptions, // ProductSubscription[],
        fetchProducts, // (params) => Promise<void>
        requestPurchase, // (params) => Promise<void>
        finishTransaction, // (params) => Promise<void>
    } = useIAP({
        onPurchaseSuccess: async purchase => {
            try {
                console.log('purchase', purchase);

                const iosPurchase = purchase as PurchaseIOS;

                const payload = {
                    appBundleIdIOS: iosPurchase.appBundleIdIOS,
                    transactionId: iosPurchase.transactionId,
                    originalTransactionIdentifierIOS: iosPurchase.originalTransactionIdentifierIOS,
                    productId: iosPurchase.productId,
                    purchaseToken: iosPurchase.purchaseToken,
                    expirationDateIOS: iosPurchase.expirationDateIOS,
                    transactionDate: iosPurchase.transactionDate,
                    environmentIOS: iosPurchase.environmentIOS,
                    platform: iosPurchase.platform,
                };

                // TODO: отправь purchase/receipt на свой сервер для проверки (recommended)
                const result = await postInAppPurchasesRequest(payload);
                console.log('result', result);

                if (result.status == 200) {
                    // isConsumable = false для sподписок
                    await finishTransaction({ purchase, isConsumable: false });
                    Alert.alert('Успех', 'Подписка активирована ✅');
                } else {
                    // если невалидно — можно не финализировать транзакцию и обработать ошибку
                    Alert.alert('Ошибка', 'Не прошла валидация покупки на сервере');
                    return
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

            setLoading(true); // 🔹 начинаем загрузку

            try {
                await fetchProducts({ skus: SUB_IDS, type: 'subs' });
            } catch (err) {
                console.warn('fetchProducts error:', err);
            } finally {
                setLoading(false); // 🔹 завершаем загрузку
            }
        };

        load();
    }, [connected]);

    const handleBuy = async (id: string) => {
        try {
            await requestPurchase({
                request: {
                    ios: { sku: id },
                    android: { skus: [id] },
                },
                type: 'subs',
            });
        } catch (err) {
            console.warn('requestPurchase error:', err);
            Alert.alert('Ошибка', 'Не удалось инициировать покупку');
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

    return (
        <View style={{ padding: 16, backgroundColor: '#000' }}>
            <ThemedText style={{ fontSize: 20, fontWeight: '600', marginBottom: 12 }}>
                Подписки
            </ThemedText>

            {subscriptions.length === 0 ? (
                <ThemedText>
                    Подписки не найдены. Убедись, что productId совпадает с App Store
                    Connect.
                </ThemedText>
            ) : (
                subscriptions.map(s => (
                    <View
                        key={s.id}
                        style={{
                            marginBottom: 14,
                            padding: 12,
                            borderWidth: 1,
                            borderRadius: 8,
                        }}
                    >
                        <ThemedText style={{ fontWeight: '600' }}>
                            {s.title ?? s.id}
                        </ThemedText>
                        {s.description ? <ThemedText>{s.description}</ThemedText> : null}
                        <ThemedText style={{ marginVertical: 6 }}>
                            {s.price ?? s.displayPrice ?? ''}
                        </ThemedText>
                        <Button title='Подписаться' onPress={() => handleBuy(s.id)} />
                    </View>
                ))
            )}
        </View>
    );
};
