import { User } from '@/types/user';

export const isUserPremium = (user?: User | null): boolean => {
	if (!user) return false;

	return (
		Boolean(user.currentSubscription?.price) ||
		Boolean(user.currentSubscription?.adminSubscription)
	);
};
