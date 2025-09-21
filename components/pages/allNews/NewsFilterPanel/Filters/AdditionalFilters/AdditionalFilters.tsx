import { CheckboxBlock } from '@/components/ui/CheckBoxBlock';
import { additionalFiltersLabels, AdditionalFilterKey } from '@/types/filters';
import { StyleSheet } from 'react-native';
import { RangeInput } from './RangeInput';
import { useUnit } from 'effector-react';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Button } from '@/components/ui/Button';
import {
	$additionalFiltersDraft,
	toggleFilterEnabled,
	updateFilterRange,
} from '@/stores/allNews/filtersPanel/filters/additionalFilters/model';

export const AdditionalFilters = () => {
	const additionalFiltersDraft = useUnit($additionalFiltersDraft);
	const toggleFilterFn = useUnit(toggleFilterEnabled);
	const updateFilterRangeFn = useUnit(updateFilterRange);

	if (!additionalFiltersDraft) return null;

	return (
		<ThemedView style={{ flex: 1 }}>
			<ThemedView style={styles.header}>
				<ThemedText style={styles.title} type='textLg'>
					Additional Filters
				</ThemedText>
				<Button
					title='Clear'
					variant='link-gray'
					buttonStyle={styles.buttonExtra}
				/>
			</ThemedView>
			<ThemedView style={styles.list}>
				{Object.entries(additionalFiltersDraft).map(([key, filter]) => (
					<CheckboxBlock
						key={key}
						checked={filter.enabled}
						title={additionalFiltersLabels[key as AdditionalFilterKey]}
						bottomComponent={
							<RangeInput
								from={filter.range.from}
								to={filter.range.to}
								onChange={(from, to) =>
									updateFilterRangeFn({
										key: key as AdditionalFilterKey,
										range: { from, to },
									})
								}
							/>
						}
						onPress={() => toggleFilterFn(key as AdditionalFilterKey)}
					/>
				))}
			</ThemedView>
		</ThemedView>
	);
};

const styles = StyleSheet.create({
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},

	title: {
		fontWeight: 700,
		fontFamily: 'MontserratBold',
	},

	buttonExtra: {
		paddingRight: 0,
	},

	list: {
		marginTop: 8,
		gap: 8,
	},
});
