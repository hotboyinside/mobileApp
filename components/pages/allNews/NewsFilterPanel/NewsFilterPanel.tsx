import SortIcon from '@/assets/icons/sort-icon.svg';
import { StyleSheet } from 'react-native';
import { SortList } from './SortList';
import { resetMarketDraft } from '@/stores/allNews/filtersPanel/filters/market/model';
import { resetNewsTypeDraft } from '@/stores/allNews/filtersPanel/filters/newsType/model';
import { resetStockTypeDraft } from '@/stores/allNews/filtersPanel/filters/stockType/model';
import { useUnit } from 'effector-react';
import { $activeFiltersCount } from '@/stores/allNews/filtersPanel/filters/selectableFIlters/model';
import { MultiSelectTabs } from '@/components/ui/Tabs/MultiSelectTabs';
import {
	FilterTabVariant,
	$selectedTabsFilters,
	openFilterTab,
	closeFilterTab,
} from '@/stores/allNews/filtersPanel/model';
import { ActiveTabWithCount } from './ActiveTabWithCount';
import { ThemedView } from '@/components/ThemedView';
import { appTokens } from '@/constants/tokens';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Filters } from './Filters/Filters';
import { useGlobalSheet } from '@/components/appProvider/sheetModal/GlobalSheetProvider';
import { BottomSheetApplyFooter } from './BottomSheetApplyFooter';
import { Keywords } from './Filters/keywords/Keywords';

export const NewsFilterPanel = () => {
	const selectedTabFilters = useUnit($selectedTabsFilters);
	const countOfActiveFilters = useUnit($activeFiltersCount);

	const openFilterTabFx = useUnit(openFilterTab);
	const closeFilterTabFx = useUnit(closeFilterTab);

	const openTabFilters = (tab: FilterTabVariant) => {
		switch (tab) {
			case FilterTabVariant.sort:
				openFilterTabFx(FilterTabVariant.sort);
				openBottomSheet(
					<SortList
						onClose={() => {
							closeFilterTabFx();
							closeBottomSheet();
						}}
					/>,
					props => (
						<BottomSheetApplyFooter
							{...props}
							onClose={() => {
								closeFilterTabFx();
								closeBottomSheet();
							}}
						/>
					)
				);
				break;
			case FilterTabVariant.filters:
				openFilterTabFx(FilterTabVariant.filters);
				openBottomSheet(
					<Filters
						onCloseFilters={() => {
							closeFilterTabFx();
							closeBottomSheet();
							resetMarketDraft();
							resetStockTypeDraft();
							resetNewsTypeDraft();
						}}
					/>,
					props => (
						<BottomSheetApplyFooter
							{...props}
							onClose={() => {
								closeFilterTabFx();
								closeBottomSheet();
							}}
						/>
					)
				);
				break;
			case FilterTabVariant.keywords:
				openBottomSheet(
					<Keywords
						onClose={() => {
							closeFilterTab();
							closeBottomSheet();
						}}
					/>
				);
				break;
			case FilterTabVariant.rating:
				openBottomSheet(<SortList onClose={closeBottomSheet} />);
				break;
		}
	};

	const getLabel = (tabTitle: FilterTabVariant) => {
		switch (tabTitle) {
			case FilterTabVariant.sort:
				return <SortIcon />;
			case FilterTabVariant.filters:
				if (countOfActiveFilters > 0) {
					return (
						<ActiveTabWithCount
							label={FilterTabVariant.filters}
							count={countOfActiveFilters}
						/>
					);
				}
				return FilterTabVariant.filters;
			case FilterTabVariant.keywords:
				return FilterTabVariant.keywords;
			case FilterTabVariant.rating:
				return FilterTabVariant.rating;
		}
	};

	const bgColor = useThemeColor({}, appTokens.background.primary);
	const { openBottomSheet, closeBottomSheet } = useGlobalSheet();

	return (
		<ThemedView style={{ backgroundColor: bgColor }}>
			<MultiSelectTabs<FilterTabVariant>
				tabsTitles={Object.values(FilterTabVariant)}
				selectedValues={selectedTabFilters}
				onSelectionChange={openTabFilters}
				getLabel={getLabel}
				extraStyle={styles.container}
			/>
		</ThemedView>
	);
};

const styles = StyleSheet.create({
	container: {
		marginHorizontal: 16,
		marginBottom: 4,
	},
});
