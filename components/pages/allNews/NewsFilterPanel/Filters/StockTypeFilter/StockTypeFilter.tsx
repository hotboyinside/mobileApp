import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { MultiSelectTabs } from '@/components/ui/Tabs/MultiSelectTabs';
import {
	$stockTypeDraft,
	getStockTypeLabel,
	toggleStockTypeDraft,
} from '@/stores/allNews/filtersPanel/filters/stockType';
import { StockTypesNames } from '@/types/stockTypes';

import { useUnit } from 'effector-react';
import { StyleSheet } from 'react-native';

export const StockTypeFilter = () => {
	const stockTypeDraft = useUnit($stockTypeDraft);
	const toggleStockTypeDraftFx = useUnit(toggleStockTypeDraft);

	return (
		<ThemedView>
			<ThemedText style={styles.title} type='textLg'>
				Stock type
			</ThemedText>

			<MultiSelectTabs<StockTypesNames>
				tabsTitles={Object.values(StockTypesNames)}
				selectedValues={stockTypeDraft}
				getLabel={getStockTypeLabel}
				onSelectionChange={toggleStockTypeDraftFx}
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
