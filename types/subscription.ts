enum PurchaseStatus {
  ACTIVE = 1,
  EXPIRED = 2,
  BILLING_RETRY = 3,
  BILLING_GRACE_PERIOD = 4,
  REVOKED = 5,
}

interface Purchase {
  productId: string;
  expirationDate: Date | null;
  bundleId: string;
  status: PurchaseStatus;
  autoRenewStatus: boolean;
}

interface SubscriptionPrice {
  _id: string;
  currency: string;
  interval: number;
  intervalCount: number;
  unitAmount: number;
}

export interface Subscription {
    price?: SubscriptionPrice;
    nextBillingDate?: Date | null;
    isFreeTrialActive?: boolean;
    trialEndsAt?: Date | null;
    isCanceled?: boolean;
    discount?: number;
    adminSubscription?: boolean;
		mobileSubscription: Purchase | null;
}

