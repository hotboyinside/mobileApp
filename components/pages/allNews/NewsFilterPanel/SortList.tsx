import { ThemedView } from '@/components/ThemedView';
import { Checkbox } from '@/components/ui/CheckBox';
import React from 'react';
import { StyleSheet } from 'react-native';
import {
	$sortByDraft,
	closeSortByClick,
	resetSortingDraft,
	updateSortingDraft,
} from '@/stores/allNews/filtersPanel/sortBy/model';
import { useUnit } from 'effector-react';
import { SortLabels } from '@/types/sortBy';
import { HeaderBottomSheet } from './HeaderBottomSheet';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';

type SortListProps = {
	onClose: () => void;
};

export const SortList = ({ onClose }: SortListProps) => {
	const currentSortValue = useUnit($sortByDraft);

	const updateSortValueFx = useUnit(updateSortingDraft);
	const onResetSorting = useUnit(resetSortingDraft);
	const closeSortByClickFx = useUnit(closeSortByClick);

	return (
		<BottomSheetScrollView
			style={styles.container}
			stickyHeaderIndices={[0]}
			showsVerticalScrollIndicator={false}
			contentContainerStyle={{ paddingBottom: 120 }}
		>
			<HeaderBottomSheet
				headerLabel='Sort by'
				onResetDefaultValues={() => {
					onResetSorting();
				}}
				onCloseFilters={() => {
					onClose();
					closeSortByClickFx();
				}}
			/>
			<ThemedView style={styles.list}>
				{Object.values(SortLabels).map((filter, _) => (
					<Checkbox
						key={filter}
						checked={filter === currentSortValue}
						title={filter}
						onPress={() => updateSortValueFx(filter)}
					/>
				))}
			</ThemedView>
		</BottomSheetScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginBottom: 80,
	},

	list: {
		padding: 16,
		gap: 8,
	},
});
