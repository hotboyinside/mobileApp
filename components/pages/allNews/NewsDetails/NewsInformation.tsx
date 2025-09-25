import React, { useMemo } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Stars } from '@/components/ui/Stars';
import { ThemedText } from '@/components/ThemedText';
import { appTokens } from '@/constants/tokens';
import { Change } from '@/components/ui/Change/Change';
import { Badge } from '@/components/ui/Badge/Badge';
import { SymbolStats } from './SymbolsStats';
import { IFilteredNews } from '@/stores/allNews/news/model';
import { $dataSymbolsData } from '@/stores/symbols/model';
import { useUnit } from 'effector-react';
import { ReadOnlyKeyword } from '../News/ReadOnlyKeyword';
import { $now } from '@/stores/allNews/globalTick/model';
import { formatNewsTime } from '@/helpers/time/formatNewsTime';

type NewsInformationProps = {
	news: IFilteredNews;
};

export const NewsInformation = ({ news }: NewsInformationProps) => {
	const dataSymbolsData = useUnit($dataSymbolsData);
	const now = useUnit($now);

	const { title, description, createdAt, rating, keywords, symbols } = news;

	const formattedData = useMemo(
		() => formatNewsTime(createdAt, now),
		[now, createdAt]
	);

	const safeSymbolsData = symbols.map(symbol => {
		const symbolData = dataSymbolsData[symbol.symbol];

		return {
			symbol: symbol.symbol,
			price: symbolData?.price ?? 0,
			absoluteChange: symbolData?.absoluteChange ?? 0,
			priceChange: symbolData?.priceChange ?? 0,
			volume: symbolData?.dayVolume ?? 0,
			float: symbolData?.float ?? 0,
			daysRange: symbolData?.daysRange ?? 0,
		};
	});

	const timeColor = appTokens.text.quaternary;

	return (
		<ScrollView style={styles.container}>
			<Stars
				rating={rating.score}
				starHeight={20}
				starWidth={20}
				containerStyle={styles.ratingContainer}
			/>

			<ThemedText type='displayXs' style={styles.title}>
				{title}
			</ThemedText>

			<ThemedText type='textXs' color={timeColor} style={styles.time}>
				{formattedData}
			</ThemedText>

			<View style={styles.symbols}>
				{safeSymbolsData.map(symbol => (
					<View style={styles.symbolWithChange} key={symbol.symbol}>
						<Badge
							variant='pillColor'
							size='lg'
							color='gray'
							value={symbol.symbol}
						/>
						<Change
							size='sm'
							value={symbol.absoluteChange}
							priceChange={symbol.priceChange}
						/>
					</View>
				))}
			</View>

			<ThemedText type='textMd' style={styles.description}>
				{description}
			</ThemedText>

			<View style={styles.keywords}>
				{keywords.map(keyword => (
					<ReadOnlyKeyword key={keyword._id} keyword={keyword} />
				))}
			</View>

			<View style={styles.symbolsStats}>
				{safeSymbolsData.map(symbol => (
					<SymbolStats key={symbol.symbol} symbol={symbol} />
				))}
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 16,
	},

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
		flexDirection: 'row',
		flexWrap: 'wrap',
		alignItems: 'center',
		marginTop: 16,
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
		gap: 16,
		marginTop: 32,
		marginBottom: 16,
	},
});
