import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Button } from '@/components/ui/Button';
import { CheckboxBlock } from '@/components/ui/CheckBoxBlock';
import {
	$additionalFiltersDraft,
	resetAdditionalFiltersDraft,
	toggleFilterEnabled,
	updateFilterRange,
} from '@/stores/allNews/filtersPanel/filters/additionalFilters';
import { AdditionalFilterKey, additionalFiltersLabels } from '@/types/filters';
import { useUnit } from 'effector-react';
import { StyleSheet } from 'react-native';
import { RangeInput } from './RangeInput';

export const AdditionalFilters = () => {
	const additionalFiltersDraft = useUnit($additionalFiltersDraft);
	const onToggleFilter = useUnit(toggleFilterEnabled);
	const onUpdateFilterRange = useUnit(updateFilterRange);
	const onResetAdditionalFiltersDraft = useUnit(resetAdditionalFiltersDraft);

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
					onPress={onResetAdditionalFiltersDraft}
				/>
			</ThemedView>
			<ThemedView style={styles.list}>
				{additionalFiltersDraft &&
					Object.entries(additionalFiltersDraft).map(([key, filter]) => (
						<CheckboxBlock
							key={key}
							checked={filter.enabled}
							title={additionalFiltersLabels[key as AdditionalFilterKey]}
							bottomComponent={
								<RangeInput
									from={filter.range.from}
									to={filter.range.to}
									onChange={(from, to) =>
										onUpdateFilterRange({
											key: key as AdditionalFilterKey,
											range: { from, to },
										})
									}
								/>
							}
							onPress={() => onToggleFilter(key as AdditionalFilterKey)}
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
