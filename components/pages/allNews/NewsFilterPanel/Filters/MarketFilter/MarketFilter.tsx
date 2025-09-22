import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { MultiSelectTabs } from '@/components/ui/Tabs/MultiSelectTabs';
import {
	$marketDraft,
	MarketNames,
	getMarketLabel,
	toggleMarketDraft,
} from '@/stores/allNews/filtersPanel/filters/market/model';

import { useUnit } from 'effector-react';
import { StyleSheet } from 'react-native';

export const MarketFilter = () => {
	const marketDraft = useUnit($marketDraft);
	const onToggleMarketDraft = useUnit(toggleMarketDraft);

	return (
		<ThemedView>
			<ThemedText style={styles.title} type='textLg'>
				Market
			</ThemedText>

			<MultiSelectTabs<MarketNames>
				tabsTitles={Object.values(MarketNames)}
				selectedValues={marketDraft}
				getLabel={getMarketLabel}
				onSelectionChange={onToggleMarketDraft}
			/>
		</ThemedView>
	);
};

const styles = StyleSheet.create({
	title: {
		marginBottom: 8,
		fontWeight: 700,
		fontFamily: 'MontserratBold',
	},
});
