import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { MultiSelectTabs } from '@/components/ui/MultiSelectTabs/MultiSelectTabs';
import {
	$stockTypeDraft,
	changeStockTypeDraft,
	StockTypesNames,
	getStockTypeLabel,
} from '@/stores/allNews/filtersPanel/filters/stockType/model';

import { useUnit } from 'effector-react';
import { StyleSheet } from 'react-native';

export const StockTypeFilter = () => {
	const stockTypeDraft = useUnit($stockTypeDraft);
	const changeStockTypeDraftFx = useUnit(changeStockTypeDraft);

	return (
		<ThemedView>
			<ThemedText style={styles.title} type='textLg'>
				Stock type
			</ThemedText>

			<MultiSelectTabs<StockTypesNames>
				tabsTitles={Object.values(StockTypesNames)}
				selectedValues={stockTypeDraft}
				getLabel={getStockTypeLabel}
				onSelectionChange={changeStockTypeDraftFx}
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
