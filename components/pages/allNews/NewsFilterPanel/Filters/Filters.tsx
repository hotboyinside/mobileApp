import { StyleSheet } from 'react-native';
import { AdditionalFilters } from './AdditionalFilters/AdditionalFilters';
import { ThemedView } from '@/components/ThemedView';
import { useUnit } from 'effector-react';
import { HeaderBottomSheet } from '../HeaderBottomSheet';
import React from 'react';
import { SelectedFilters } from './SelectedFilters/SelectedFilters';
import { MarketFilter } from './MarketFilter/MarketFilter';
import { StockTypeFilter } from './StockTypeFilter/StockTypeFilter';
import { NewsTypeFilter } from './NewsTypeFilter/NewsTypeFilter';
import { resetDraftFilters } from '@/stores/allNews/filtersPanel/filters/additionalFilters/model';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';

type FiltersProps = {
	onCloseFilters: () => void;
};

export const Filters = ({ onCloseFilters }: FiltersProps) => {
	const resetDraftFiltersFn = useUnit(resetDraftFilters);

	return (
		<BottomSheetScrollView
			style={styles.wrapper}
			stickyHeaderIndices={[0]}
			showsVerticalScrollIndicator={false}
			contentContainerStyle={{ paddingBottom: 120 }}
		>
			<HeaderBottomSheet
				onResetDefaultValues={resetDraftFiltersFn}
				onCloseFilters={onCloseFilters}
				headerLabel='Filters'
			/>

			<ThemedView style={[styles.container]}>
				<SelectedFilters />
				<MarketFilter />
				<StockTypeFilter />
				<NewsTypeFilter />
				<AdditionalFilters />
			</ThemedView>
		</BottomSheetScrollView>
	);
};

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
		marginBottom: 80,
	},

	container: {
		flex: 1,
		padding: 16,
		gap: 24,
	},
});
