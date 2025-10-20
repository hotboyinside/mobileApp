import SortIcon from '@/assets/icons/sort-icon.svg';
import { useGlobalSheet } from '@/components/appProvider/sheetModal/GlobalSheetProvider';
import { ThemedView } from '@/components/ThemedView';
import { MultiSelectTabs } from '@/components/ui/Tabs/MultiSelectTabs';
import { appTokens } from '@/constants/tokens';
import { useThemeColor } from '@/hooks/useThemeColor';
import { discardFiltersDraft } from '@/stores/allNews/filtersPanel/filters/model';
import { $activeFiltersCount } from '@/stores/allNews/filtersPanel/filters/selectableFilters';
import {
	$selectedTabsFilters,
	closeFilterTab,
	FilterTabVariant,
	openFilterTab,
} from '@/stores/allNews/filtersPanel/model';
import { discardSortByDraft } from '@/stores/allNews/filtersPanel/sortBy';
import { discardStarRatingEnabledStateDraft } from '@/stores/allNews/filtersPanel/starRating/starRatingEnabledState';
import { useUnit } from 'effector-react';
import { StyleSheet } from 'react-native';
import { ActiveTabWithCount } from './ActiveTabWithCount';
import { BottomSheetApplyFooter } from './BottomSheetApplyFooter';
import { Filters } from './Filters/Filters';
import { Keywords } from './Keywords/Keywords';
import { SortList } from './SortList';
import { StarRating } from './StarRating/StarRating';

export const NewsFilterPanel = () => {
	const { openSheetModal, closeSheetModal } = useGlobalSheet();

	const selectedTabFilters = useUnit($selectedTabsFilters);
	const countOfActiveFilters = useUnit($activeFiltersCount);

	const onOpenFilterTab = useUnit(openFilterTab);
	const onCloseFilterTab = useUnit(closeFilterTab);

	const onDiscardSortByDraft = useUnit(discardSortByDraft);
	const onDiscardFiltersDraft = useUnit(discardFiltersDraft);
	const onDiscardStarRatingEnabledStateDraft = useUnit(
		discardStarRatingEnabledStateDraft
	);

	const openTabFilters = (tab: FilterTabVariant) => {
		switch (tab) {
			case FilterTabVariant.sort:
				onOpenFilterTab(FilterTabVariant.sort);
				openSheetModal(
					'main',
					<SortList
						onClose={() => {
							onCloseFilterTab();
							closeSheetModal('main');
						}}
					/>,
					props => (
						<BottomSheetApplyFooter
							{...props}
							onClose={() => {
								onCloseFilterTab();
								closeSheetModal('main');
							}}
						/>
					),
					() => onDiscardSortByDraft()
				);
				break;
			case FilterTabVariant.filters:
				onOpenFilterTab(FilterTabVariant.filters);
				openSheetModal(
					'main',
					<Filters
						onCloseFilters={() => {
							onCloseFilterTab();
							closeSheetModal('main');
						}}
					/>,
					props => (
						<BottomSheetApplyFooter
							{...props}
							onClose={() => {
								onCloseFilterTab();
								closeSheetModal('main');
							}}
						/>
					),
					() => onDiscardFiltersDraft()
				);
				break;
			case FilterTabVariant.keywords:
				onOpenFilterTab(FilterTabVariant.keywords);
				openSheetModal(
					'main',
					<Keywords
						onClose={() => {
							onCloseFilterTab();
							closeSheetModal('main');
						}}
					/>,
					props => (
						<BottomSheetApplyFooter
							animatedFooterPosition={props.animatedFooterPosition}
							applyButtonTitle='Disable Keywords'
							closeButtonTitle='Enable Keywords'
							closeButtonIsSecondary
						/>
					)
				);
				break;
			case FilterTabVariant.rating:
				onOpenFilterTab(FilterTabVariant.rating);
				openSheetModal(
					'main',
					<StarRating
						onClose={() => {
							onCloseFilterTab();
							closeSheetModal('main');
						}}
					/>,
					props => (
						<BottomSheetApplyFooter
							{...props}
							onClose={() => {
								onCloseFilterTab();
								closeSheetModal('main');
							}}
						/>
					),
					() => onDiscardStarRatingEnabledStateDraft()
				);
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

	const backgroundColor = useThemeColor(appTokens.background.secondarySubtle);

	return (
		<ThemedView style={[styles.wrapper, { backgroundColor: backgroundColor }]}>
			<MultiSelectTabs<FilterTabVariant>
				tabsTitles={Object.values(FilterTabVariant)}
				selectedValues={selectedTabFilters}
				onSelectionChange={openTabFilters}
				getLabel={getLabel}
				extraStyle={[styles.container, { backgroundColor: backgroundColor }]}
			/>
		</ThemedView>
	);
};

const styles = StyleSheet.create({
	wrapper: {
		paddingVertical: 8,
	},

	container: {
		marginHorizontal: 16,
		marginBottom: 4,
	},
});
