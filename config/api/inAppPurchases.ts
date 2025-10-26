import { api } from './axios';
import { API_IN_APP_PURCHASES } from '@/constants/apiRoutes';

type InAppPerchases = any;

export const postInAppPurchasesRequest = (data: InAppPerchases) => {
    return api.post(API_IN_APP_PURCHASES, data);
};