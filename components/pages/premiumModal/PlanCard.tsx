import FireIcon from '@/assets/icons/fire-icon.svg';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Badge } from '@/components/ui/Badge/Badge';
import { appTokens } from '@/constants/tokens';
import { useThemeColor } from '@/hooks/useThemeColor';
import React from 'react';
import { StyleSheet, View } from 'react-native';

interface Plan {
	id: string;
	name: string;
	period: string;
	monthPrice: string;
	total: string;
	isPopular: boolean;
	saveMoney?: string;
}

interface PlanCardProps {
	plan: Plan;
	selected?: boolean;
	isPremiumUser: boolean;
	isFreeTrialUsed?: boolean;
}

export const PlanCard = ({
	plan,
	selected,
	isPremiumUser,
	isFreeTrialUsed,
}: PlanCardProps) => {
	const isFreeUserWithTrialUsed = !isPremiumUser && isFreeTrialUsed;
	const isFreeUserWithTrial = !isPremiumUser && !isFreeTrialUsed;

	const borderTertiaryColor = useThemeColor(appTokens.border.tertiary);
	const borderBrandColor = useThemeColor(appTokens.border.brand);
	const backgroundPrimaryColor = useThemeColor(appTokens.background.primary);
	const textQuaternaryColor = useThemeColor(appTokens.text.quaternary);
	const iconWhiteColor = useThemeColor(appTokens.foreground.white);

	return (
		<ThemedView
			style={[
				styles.container,
				{
					backgroundColor: backgroundPrimaryColor,
					borderColor: selected ? borderBrandColor : borderTertiaryColor,
				},
			]}
		>
			<View style={styles.row}>
				<ThemedText type='textLg' style={styles.name}>
					{plan.name}
				</ThemedText>
				<ThemedText type='textLg' style={styles.monthPrice}>
					{`${plan.monthPrice}/mo`}
				</ThemedText>
			</View>

			<View style={[styles.row, plan.saveMoney && { marginBottom: 12 }]}>
				<ThemedText
					type='textSm'
					style={[styles.period, { color: textQuaternaryColor }]}
				>
					{(isFreeUserWithTrialUsed || isPremiumUser) && plan.period}
					{isFreeUserWithTrial && `1 month free →\n${plan.period}`}
				</ThemedText>
				<ThemedText
					type='textSm'
					style={[styles.total, { color: textQuaternaryColor }]}
				>
					{`${plan.total} total`}
				</ThemedText>
			</View>

			{(plan.saveMoney || plan.isPopular) && (
				<View style={styles.badges}>
					{plan.saveMoney && (
						<Badge
							variant='filled'
							color='primary'
							size='md'
							value={`Save ${plan.saveMoney}`}
							badgeStyle={styles.fullRadius}
						/>
					)}

					{plan.isPopular && (
						<Badge
							variant='filled'
							color='red'
							size='md'
							value={
								<View style={styles.popularBadge}>
									<FireIcon width={16} height={16} color={iconWhiteColor} />
									<ThemedText
										tokenColor={appTokens.text.primaryOnBrand}
										type='textSm'
										style={styles.popularText}
									>
										Most popular
									</ThemedText>
								</View>
							}
							badgeStyle={styles.fullRadius}
						/>
					)}
				</View>
			)}
		</ThemedView>
	);
};

const styles = StyleSheet.create({
	container: {
		borderWidth: 2,
		borderRadius: 16,
		paddingHorizontal: 20,
		paddingVertical: 16,
	},

	row: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 2,
	},

	name: {
		fontWeight: 700,
		fontFamily: 'MontserratBold',
	},

	monthPrice: {
		fontWeight: 700,
		fontFamily: 'MontserratBold',
	},

	period: {
		maxWidth: 211,
		fontWeight: 500,
		fontFamily: 'MontserratMedium',
	},

	total: {
		fontWeight: 500,
		fontFamily: 'MontserratMedium',
	},

	badges: {
		flexDirection: 'row',
		gap: 4,
	},

	fullRadius: {
		borderRadius: 100,
	},

	popularBadge: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 2,
	},

	popularText: {
		fontWeight: '500',
		fontFamily: 'MontserratMedium',
	},
});
