import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Tab } from '@/components/ui/Tabs/Tab';
import { appTokens } from '@/constants/tokens';
import { useThemeColor } from '@/hooks/useThemeColor';
import {
	$dataTopBannersSymbolGainersStore,
	$dataTopBannersSymbolGapGainersStore,
} from '@/stores/allNews/topBannersData/model';
import { TabView } from '@rneui/base';
import { useUnit } from 'effector-react';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Cards } from './TopNews';

export default function TopGainers() {
	const dataTopBannersSymbolGainersStore = useUnit(
		$dataTopBannersSymbolGainersStore
	);
	const dataTopBannersSymbolGapGainersStore = useUnit(
		$dataTopBannersSymbolGapGainersStore
	);
	const [index, setIndex] = useState(0);

	const backgroundColor = useThemeColor(appTokens.background.secondarySubtle);

	return (
		<ThemedView style={{ backgroundColor: backgroundColor }}>
			<ThemedText type='textLg' style={styles.title}>
				Top Gainers
			</ThemedText>
			<Tab
				value={index}
				onChange={e => setIndex(e)}
				tabsTitles={['With News or Filings', 'All Stocks']}
				style={styles.tabContainer}
			/>
			<TabView
				value={index}
				onChange={setIndex}
				disableSwipe
				containerStyle={styles.tabViewContainer}
			>
				<TabView.Item style={{ flex: 1 }}>
					<Cards
						isTopGainers
						topSymbols={dataTopBannersSymbolGainersStore.topThreeGainersSymbols}
					/>
				</TabView.Item>
				<TabView.Item style={{ flex: 1 }}>
					<Cards
						isTopGainers
						topSymbols={
							dataTopBannersSymbolGapGainersStore.topThreeGainersSymbols
						}
					/>
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
