import { CheckboxBlock } from '@/components/ui/CheckBoxBlock';
import { FILTER_LABELS, FilterKey } from '@/types/filters';
import { View, StyleSheet } from 'react-native';
import { RangeInput } from './RangeInput';
import { useUnit } from 'effector-react';
import {
	$draftFilters,
	toggleFilterEnabled,
	updateFilterRange,
} from '@/stores/allNews/filters/model';

export const AdditionalFilters = () => {
	const filtersState = useUnit($draftFilters);
	const toggleFilterFn = useUnit(toggleFilterEnabled);
	const updateFilterRangeFn = useUnit(updateFilterRange);

	if (!filtersState) return;

	return (
		<View style={styles.list}>
			{Object.entries(filtersState).map(([key, filter]) => (
				<CheckboxBlock
					key={key}
					checked={filter.enabled}
					title={FILTER_LABELS[key as FilterKey]}
					bottomComponent={
						<RangeInput
							from={filter.range.from}
							to={filter.range.to}
							onChange={(from, to) =>
								updateFilterRangeFn({
									key: key as FilterKey,
									range: { from, to },
								})
							}
						/>
					}
					onPress={() => toggleFilterFn(key as FilterKey)}
				/>
			))}
		</View>
	);
};

const styles = StyleSheet.create({
	list: {
		paddingVertical: 16,
		gap: 8,
	},
});
