import React from 'react';
import { Platform, ScrollView, StyleSheet, View } from 'react-native';
import { TopNewsCard, News } from './TopNewsCard';

type CardsProps = {
	topNews: News[];
};

export const Cards = ({ topNews }: CardsProps) => {
	return (
		<ScrollView
			horizontal
			showsHorizontalScrollIndicator={false}
			contentContainerStyle={styles.container}
		>
			{topNews.map(news => (
				<TopNewsCard
					key={news.symbol}
					symbol={news.symbol}
					change={news.change}
					title={news.title}
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
