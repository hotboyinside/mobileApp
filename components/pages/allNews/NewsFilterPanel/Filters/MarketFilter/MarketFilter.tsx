import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { MultiSelectTabs } from '@/components/ui/MultiSelectTabs/MultiSelectTabs';
import {
	$marketDraft,
	changeMarketDraft,
	MarketNames,
	getMarketLabel,
} from '@/stores/allNews/filtersPanel/filters/market/model';

import { useUnit } from 'effector-react';
import { StyleSheet } from 'react-native';

export const MarketFilter = () => {
	const marketDraft = useUnit($marketDraft);
	const changeMarketDraftFx = useUnit(changeMarketDraft);

	return (
		<ThemedView>
			<ThemedText style={styles.title} type='textLg'>
				Market
			</ThemedText>

			<MultiSelectTabs<MarketNames>
				tabsTitles={Object.values(MarketNames)}
				selectedValues={marketDraft}
				getLabel={getMarketLabel}
				onSelectionChange={changeMarketDraftFx}
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
