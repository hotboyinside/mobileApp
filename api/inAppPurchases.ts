import { api } from '@/config/axios';
import { API_IN_APP_PURCHASES } from '@/constants/apiRoutes';

export interface PurchaseBase {
	platform: 'ios' | 'android';
	productId: string;
	transactionId: string;
	purchaseToken?: string;
	transactionDate?: string | number;
}

export interface PurchaseIOS extends PurchaseBase {
	platform: 'ios';
	appBundleIdIOS?: string;
	originalTransactionIdentifierIOS?: string;
	expirationDateIOS?: string;
	environmentIOS?: string;
}

export interface PurchaseAndroid extends PurchaseBase {
	platform: 'android';
	packageNameAndroid?: string;
}

export type RawPurchase = {
	platform: 'ios' | 'android';
	[key: string]: any;
};

export type InAppPurchasesPayload = PurchaseIOS | PurchaseAndroid;

const buildInAppPurchasesPayload = (
	purchase: RawPurchase
): InAppPurchasesPayload => {
	if (purchase.platform === 'ios') {
		const p = purchase;
		return {
			platform: 'ios',
			appBundleIdIOS: p.appBundleIdIOS,
			transactionId: p.transactionId,
			originalTransactionIdentifierIOS: p.originalTransactionIdentifierIOS,
			productId: p.productId,
			purchaseToken: p.purchaseToken,
			expirationDateIOS: p.expirationDateIOS,
			transactionDate: p.transactionDate,
			environmentIOS: p.environmentIOS,
		};
	} else {
		const p = purchase;
		const dataAndroid = p.dataAndroid ? JSON.parse(p.dataAndroid) : {};

		return {
			platform: 'android',
			transactionId: p.transactionId || dataAndroid.orderId,
			productId: p.productId,
			purchaseToken: p.purchaseToken || dataAndroid.purchaseToken,
			transactionDate: p.transactionDate || dataAndroid.purchaseTime,
			packageNameAndroid: p.packageNameAndroid || dataAndroid.packageName,
		};
	}
};

export const postInAppPurchasesRequest = (purchase: RawPurchase) => {
	const payload = buildInAppPurchasesPayload(purchase);
	return api.post(API_IN_APP_PURCHASES, payload);
};
