import React from 'react';
import { Platform, ScrollView, StyleSheet } from 'react-native';
import { TopNewsCard } from './TopNewsCard';
import { ISymbol } from '@/types/symbols';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';
import { appTokens } from '@/constants/tokens';
import ChartUpIcon from '@/assets/icons/chart-up-icon.svg';
import ChartDownIcon from '@/assets/icons/chart-down-icon.svg';

export type News = {
	symbol: string;
	change: string;
	title?: string;
};

type CardsProps = {
	isTopGainers: boolean;
	topSymbols?: (ISymbol & { title?: string })[];
};

export const Cards = ({ topSymbols, isTopGainers }: CardsProps) => {
	const backgroundColor = useThemeColor(
		{},
		appTokens.background.secondarySubtle
	);
	const successBgColor = useThemeColor({}, appTokens.background.successPrimary);
	const errorBgColor = useThemeColor({}, appTokens.background.errorPrimary);
	const successIconColor = useThemeColor(
		{},
		appTokens.foreground.successPrimary
	);
	const errorIconColor = useThemeColor({}, appTokens.foreground.errorPrimary);

	if (!topSymbols || topSymbols?.length === 0) {
		return (
			<ThemedView
				style={[styles.mockContainer, { backgroundColor: backgroundColor }]}
			>
				<ThemedView
					style={[styles.contentWrapper, { backgroundColor: backgroundColor }]}
				>
					<ThemedView
						style={[
							styles.iconContainer,
							{ backgroundColor: isTopGainers ? successBgColor : errorBgColor },
						]}
					>
						{isTopGainers ? (
							<ChartUpIcon width={20} height={20} fill={successIconColor} />
						) : (
							<ChartDownIcon width={20} height={20} fill={errorIconColor} />
						)}
					</ThemedView>
					<ThemedView style={{ backgroundColor: backgroundColor }}>
						<ThemedText type='textSm' style={styles.mockTitle}>
							No data yet
						</ThemedText>
						<ThemedText style={styles.mockDescription} type='textSm'>
							Market opens soon
						</ThemedText>
					</ThemedView>
				</ThemedView>
			</ThemedView>
		);
	}

	return (
		<ScrollView
			horizontal
			showsHorizontalScrollIndicator={false}
			contentContainerStyle={styles.container}
		>
			{topSymbols.map(symbol => (
				<TopNewsCard
					key={symbol.symbol}
					symbol={symbol.symbol}
					change={symbol.absoluteChange?.toString() ?? ''}
					title={symbol.title}
				/>
			))}
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		gap: 8,
		marginHorizontal: 16,
		paddingRight: Platform.select({
			ios: 16,
			android: 32,
		}),
	},

	mockContainer: {
		flex: 1,
		height: '100%',
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
	},

	contentWrapper: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 12,
	},

	iconContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 16,
		padding: 10,
	},

	mockTitle: {
		fontWeight: 600,
		fontFamily: 'MontserratSemiBold',
	},

	mockDescription: {
		fontWeight: 400,
		fontFamily: 'MontserratRegular',
	},
});
