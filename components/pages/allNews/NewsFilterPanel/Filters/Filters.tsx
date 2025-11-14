import { ThemedView } from '@/components/ThemedView';
import { appTokens } from '@/constants/tokens';
import { useThemeColor } from '@/hooks/useThemeColor';
import {
	resetAdditionalFiltersDraft,
	resetFilterErrors,
} from '@/stores/allNews/filtersPanel/filters/additionalFilters';
import { resetMarketDraft } from '@/stores/allNews/filtersPanel/filters/market';
import { resetNewsTypeDraft } from '@/stores/allNews/filtersPanel/filters/newsType';
import { resetStockTypeDraft } from '@/stores/allNews/filtersPanel/filters/stockType';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { useUnit } from 'effector-react';
import React from 'react';
import { StyleSheet } from 'react-native';
import { HeaderBottomSheet } from '../HeaderBottomSheet';
import { AdditionalFilters } from './AdditionalFilters/AdditionalFilters';
import { MarketFilter } from './MarketFilter/MarketFilter';
import { NewsTypeFilter } from './NewsTypeFilter/NewsTypeFilter';
import { SelectedFilters } from './SelectedFilters/SelectedFilters';
import { StockTypeFilter } from './StockTypeFilter/StockTypeFilter';

type FiltersProps = {
	onCloseFilters: () => void;
};

export const Filters = ({ onCloseFilters }: FiltersProps) => {
	const onResetAdditionalFiltersDraft = useUnit(resetAdditionalFiltersDraft);
	const onResetMarketDraft = useUnit(resetMarketDraft);
	const onResetStockTypeDraft = useUnit(resetStockTypeDraft);
	const onResetNewsTypeDraft = useUnit(resetNewsTypeDraft);
	const onResetFiltersErrors = useUnit(resetFilterErrors);

	const backgroundColor = useThemeColor(appTokens.background.primary);

	return (
		<BottomSheetScrollView
			style={styles.wrapper}
			stickyHeaderIndices={[0]}
			showsVerticalScrollIndicator={false}
			contentContainerStyle={{
				paddingBottom: 120,
				backgroundColor: backgroundColor,
			}}
		>
			<HeaderBottomSheet
				onResetDefaultValues={() => {
					onResetAdditionalFiltersDraft();
					onResetMarketDraft();
					onResetStockTypeDraft();
					onResetNewsTypeDraft();
					onResetFiltersErrors();
				}}
				onCloseFilters={onCloseFilters}
				headerLabel='Filters'
			/>

			<ThemedView style={[styles.container]}>
				<SelectedFilters />
				<MarketFilter />
				<StockTypeFilter />
				<NewsTypeFilter />
				<AdditionalFilters onCloseFilters={onCloseFilters} />
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
