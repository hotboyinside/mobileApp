import { API_IN_APP_PURCHASES } from '@/constants/apiRoutes';
import { api } from './axios';

type InAppPurchases = any;

export const postInAppPurchasesRequest = (data: InAppPurchases) => {
	return api.post(API_IN_APP_PURCHASES, data);
};
