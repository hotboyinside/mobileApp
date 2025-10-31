import { User } from '@/types/user';

export const isUserPremium = (user?: User | null): boolean => {
	if (!user) return false;

	const isActiveStripeUser = Boolean(user.currentSubscription?.price);
	const isActivePurchaseUser = Boolean(user.currentSubscription.mobileSubscription);
	const isActiveAdmin = Boolean(user.currentSubscription.adminSubscription);

	return (
		isActiveStripeUser || isActivePurchaseUser || isActiveAdmin
	);
};
