import { Subscription } from './subscription';

export interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  currentSubscription: Subscription;
  isFreeTrialUsed: boolean;
}
