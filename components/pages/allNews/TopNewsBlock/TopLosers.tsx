import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Tab } from '@/components/ui/Tabs/Tab';
import { TabView } from '@rneui/base';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { News } from './TopNewsCard';
import { Cards } from './TopNews';

export const topLosersMocks: News[] = [
	{
		symbol: 'NFLX',
		title: 'Netflix теряет подписчиков на фоне роста конкуренции',
		change: '-4.21',
	},
	{
		symbol: 'AMZN',
		title: 'Amazon сообщает о снижении прибыли во втором квартале',
		change: '-2.89',
	},
	{
		symbol: 'NVDA',
		title: 'NVIDIA столкнулась с падением спроса на чипы в Китае',
		change: '-3.45',
	},
];

export default function TopLosers() {
	const [index, setIndex] = useState(0);

	return (
		<ThemedView>
			<ThemedText type='textLg' style={styles.title}>
				Top Losers
			</ThemedText>
			<Tab
				value={index}
				onChange={e => setIndex(e)}
				tabsTitles={['All Stocks', 'With News or Filings']}
				style={styles.tabContainer}
			/>
			<TabView
				value={index}
				onChange={setIndex}
				animationType='spring'
				disableSwipe
				containerStyle={{
					height: 116,
					marginTop: 16,
				}}
			>
				<TabView.Item>
					<Cards topNews={topLosersMocks} />
				</TabView.Item>
				<TabView.Item>
					<Cards topNews={topLosersMocks} />
				</TabView.Item>
			</TabView>
		</ThemedView>
	);
}

const styles = StyleSheet.create({
	tabContainer: {
		marginHorizontal: 16,
	},

	title: {
		marginHorizontal: 16,
		marginBottom: 8,
		fontWeight: 700,
		fontFamily: 'MontserratBold',
	},
});
