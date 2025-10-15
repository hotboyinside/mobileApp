import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Badge } from '@/components/ui/Badge/Badge';
import { Change } from '@/components/ui/Change/Change';
import { appTokens } from '@/constants/tokens';
import { useThemeColor } from '@/hooks/useThemeColor';
import React from 'react';
import { StyleSheet } from 'react-native';

export type TopNewsCardProps = {
	symbol: string;
	change?: number;
	title?: string;
	isPositive?: boolean;
};

export const TopNewsCard = ({
	symbol,
	title,
	change,
	isPositive,
}: TopNewsCardProps) => {
	const borderContainerColor = useThemeColor(appTokens.border.tertiary);

	return (
		<ThemedView
			style={[styles.container, { borderColor: borderContainerColor }]}
		>
			<Badge
				variant='keywords'
				color={isPositive ? 'green' : 'red'}
				size='sm'
				value={symbol}
			/>
			<ThemedText
				style={styles.title}
				type='textXs'
				numberOfLines={2}
				ellipsizeMode='tail'
			>
				{title ?? 'No title'}
			</ThemedText>
			<Change value={change} showPercent priceChange={isPositive ? 1 : -1} />
		</ThemedView>
	);
};

const styles = StyleSheet.create({
	container: {
		borderWidth: 1,
		borderRadius: 12,
		width: 200,
		flex: 1,
		alignItems: 'flex-start',
		gap: 8,
		padding: 12,
	},

	title: {
		minHeight: 36,
		fontWeight: 600,
		fontSize: 12,
		lineHeight: 18,
		fontFamily: 'MontserratSemiBold',
	},

	changeContainer: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},

	iconBox: {
		paddingTop: 5,
		marginRight: 2,
	},

	change: {
		fontFamily: 'MontserratSemiBold',
		fontSize: 14,
		fontWeight: 600,
		lineHeight: 20,
	},
});
