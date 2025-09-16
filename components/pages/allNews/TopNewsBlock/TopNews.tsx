import React from 'react';
import { Platform, ScrollView, StyleSheet } from 'react-native';
import { TopNewsCard } from './TopNewsCard';
import { ISymbol } from '@/types/symbols';

export type News = {
	symbol: string;
	change: string;
	title?: string;
};

type CardsProps = {
	topSymbols?: (ISymbol & { title?: string })[];
};

export const Cards = ({ topSymbols }: CardsProps) => {

	if (!topSymbols || topSymbols?.length === 0) {
		return null
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
		marginHorizontal: 16,
		gap: 8,
		paddingRight: Platform.select({
			ios: 16,
			android: 32,
		}),
	},
});
