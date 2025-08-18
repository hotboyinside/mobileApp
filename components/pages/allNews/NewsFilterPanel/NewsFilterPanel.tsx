import SortIcon from '@/assets/icons/sort-icon.svg';
import React from 'react';
import { StyleSheet } from 'react-native';
import { SortList } from './SortList';
import { Filters } from './Filters/Filters';
import { resetMarketDraft } from '@/stores/allNews/filtersPanel/filters/market/model';
import { resetNewsTypeDraft } from '@/stores/allNews/filtersPanel/filters/newsType/model';
import { resetStockTypeDraft } from '@/stores/allNews/filtersPanel/filters/stockType/model';
import { useUnit } from 'effector-react';
import { $activeFiltersCount } from '@/stores/allNews/filtersPanel/filters/selectableFIlters/model';
import { MultiSelectTabs } from '@/components/ui/Tabs/MultiSelectTabs';
import {
	FilterTabVariant,
	$selectedTabsFilters,
	$openedFilterTab,
	closeFilterTab,
	openFilterTab,
} from '@/stores/allNews/filtersPanel/model';
import { ActiveTabWithCount } from './ActiveTabWithCount';
import { ThemedView } from '@/components/ThemedView';

export const NewsFilterPanel = () => {
	const selectedTabFilters = useUnit($selectedTabsFilters);
	const openedFilterTab = useUnit($openedFilterTab);
	const countOfActiveFilters = useUnit($activeFiltersCount);

	const closeFilterTabFx = useUnit(closeFilterTab);
	const openFilterTabFx = useUnit(openFilterTab);

	const closeFilters = () => {
		closeFilterTabFx();
		resetMarketDraft();
		resetStockTypeDraft();
		resetNewsTypeDraft();
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

	return (
		<ThemedView>
			<MultiSelectTabs<FilterTabVariant>
				tabsTitles={Object.values(FilterTabVariant)}
				selectedValues={selectedTabFilters}
				onSelectionChange={openFilterTabFx}
				getLabel={getLabel}
				extraStyle={styles.container}
			/>

			{openedFilterTab === FilterTabVariant.sort && (
				<SortList isVisible onClose={closeFilterTabFx} />
			)}
			{openedFilterTab === FilterTabVariant.filters && (
				<Filters isVisible onCloseFilters={closeFilters} />
			)}
			{openedFilterTab === FilterTabVariant.keywords && (
				<SortList isVisible onClose={closeFilterTabFx} />
			)}
			{openedFilterTab === FilterTabVariant.rating && (
				<SortList isVisible onClose={closeFilterTabFx} />
			)}
		</ThemedView>
	);
};

const styles = StyleSheet.create({
	container: {
		marginHorizontal: 16,
		marginBottom: 4,
	},
});
