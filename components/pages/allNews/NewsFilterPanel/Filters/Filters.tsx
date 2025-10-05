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
import { resetAdditionalFiltersDraft } from '@/stores/allNews/filtersPanel/filters/additionalFilters/model';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { appTokens } from '@/constants/tokens';
import { useThemeColor } from '@/hooks/useThemeColor';
import { resetMarketDraft } from '@/stores/allNews/filtersPanel/filters/market/model';
import { resetStockTypeDraft } from '@/stores/allNews/filtersPanel/filters/stockType/model';
import { resetNewsTypeDraft } from '@/stores/allNews/filtersPanel/filters/newsType/model';

type FiltersProps = {
	onCloseFilters: () => void;
};

export const Filters = ({ onCloseFilters }: FiltersProps) => {
	const onResetAdditionalFiltersDraft = useUnit(resetAdditionalFiltersDraft);
	const onResetMarketDraft = useUnit(resetMarketDraft);
	const onResetStockTypeDraft = useUnit(resetStockTypeDraft);
	const onResetNewsTypeDraft = useUnit(resetNewsTypeDraft);

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
				}}
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
