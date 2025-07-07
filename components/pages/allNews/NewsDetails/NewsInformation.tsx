import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { StarRating } from '@/components/ui/StarRating';
import { MockItem } from '../News/News';
import { ThemedText } from '@/components/ThemedText';
import { appTokens } from '@/constants/tokens';
import { Change } from '@/components/ui/Change/Change';
import { Badge } from '@/components/ui/Badge/Badge';
import { BadgeColor } from '@/components/ui/Badge/badgeTypes';
import { SymbolStats } from './SymbolsStats';

type NewsInformationProps = {
	news: MockItem;
};

export const NewsInformation = ({ news }: NewsInformationProps) => {
	const { title, description, createdTime, rating, keywords, symbols } = news;

	const timeColor = appTokens.text.quaternary;

	return (
		<ScrollView>
			<StarRating
				rating={rating}
				starHeight={20}
				starWidth={20}
				containerStyle={styles.ratingContainer}
			/>

			<ThemedText type='displayXs' style={styles.title}>
				{title}
			</ThemedText>

			<ThemedText type='textXs' color={timeColor} style={styles.time}>
				{createdTime}
			</ThemedText>

			<View style={styles.symbols}>
				{symbols.map(symbol => (
					<View style={styles.symbolWithChange} key={symbol.symbol}>
						<Badge
							variant='pillColor'
							size='lg'
							color='gray'
							value={symbol.symbol}
						/>
						<Change size='sm' value={symbol.absoluteChange} />
					</View>
				))}
			</View>

			<ThemedText type='textMd' style={styles.description}>
				{description}
			</ThemedText>

			<View style={styles.keywords}>
				{keywords.map(keyword => (
					<Badge
						value={(keyword?.icon || '') + keyword.text}
						key={keyword.text}
						variant='keywords'
						size='lg'
						color={keyword.bgColor as BadgeColor}
					/>
				))}
			</View>

			<View style={styles.symbolsStats}>
				{symbols.map(symbol => (
					<SymbolStats key={symbol.symbol} symbol={symbol} />
				))}
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	ratingContainer: {
		marginTop: 16,
	},

	title: {
		marginTop: 16,
		fontWeight: 700,
		fontFamily: 'MontserratBold',
	},

	time: {
		marginTop: 12,
		fontWeight: 400,
		fontFamily: 'MontserratRegular',
	},

	symbols: {
		marginTop: 16,
		flexDirection: 'row',
		flexWrap: 'wrap',
		alignItems: 'center',
		gap: 8,
	},

	symbolWithChange: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 4,
	},

	description: {
		marginTop: 16,
		fontWeight: 500,
		fontFamily: 'MontserratMedium',
	},

	keywords: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		alignItems: 'center',
		gap: 4,
		marginTop: 12,
	},

	symbolsStats: {
		marginTop: 32,
		gap: 16,
	},
});
