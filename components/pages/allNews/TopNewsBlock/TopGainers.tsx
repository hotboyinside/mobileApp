import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { TabView } from '@rneui/base';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { News } from './TopNewsCard';
import { Cards } from './TopNews';
import { Tab } from '@/components/ui/Tabs/Tab';
import { appTokens } from '@/constants/tokens';
import { useThemeColor } from '@/hooks/useThemeColor';

export const topGainersMocks: News[] = [
	{
		symbol: 'AAPL',
		title: 'Apple акции растут',
		change: '5.67',
	},
	{
		symbol: 'TSLA',
		title: 'Акции Tesla упала на фоне проблем с поставками титана из России',
		change: '3.12',
	},
	{
		symbol: 'BTC',
		title: 'Биткоин продолжает уверенный рост',
		change: '2.34',
	},
];

export default function TopGainers() {
	const [index, setIndex] = useState(0);

	const backgroundColor = useThemeColor(
		{},
		appTokens.background.secondarySubtle
	);

	return (
		<ThemedView style={{ backgroundColor: backgroundColor }}>
			<ThemedText type='textLg' style={styles.title}>
				Top Gainers
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
				containerStyle={styles.tabViewContainer}
			>
				<TabView.Item>
					<Cards topNews={topGainersMocks} />
				</TabView.Item>
				<TabView.Item>
					<Cards topNews={topGainersMocks} />
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

	tabViewContainer: {
		height: 116,
		marginTop: 16,
	},
});
