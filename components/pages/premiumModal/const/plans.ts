export interface Plan {
	id: string;
	name: string;
	period: string;
	monthPrice: string;
	total: string;
	isPopular: boolean;
	saveMoney?: string;
}

export const PLANS: Plan[] = [
	{
		id: 'premium_monthly',
		name: 'Monthly',
		period: '1 month of Premium',
		monthPrice: '$69',
		total: '$69.99',
		isPopular: false,
	},
	{
		id: 'premium_halfyear',
		name: 'Semi-annual',
		period: '6 months of Premium',
		monthPrice: '$58',
		total: '$350',
		isPopular: false,
		saveMoney: '$70',
	},
	{
		id: 'premium_yearly',
		name: 'Annual',
		period: '12 months of Premium',
		monthPrice: '$49',
		total: '$599.99',
		isPopular: true,
		saveMoney: '$240',
	},
];
