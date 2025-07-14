import { ThemedView } from '@/components/ThemedView';
import { Button } from '@/components/ui/Button';
import { BottomSheet } from '@rneui/base';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import CloseIcon from '@/assets/icons/close.svg';
import RestartIcon from '@/assets/icons/restart-icon.svg';
import { ThemedText } from '@/components/ThemedText';
import { CheckboxBlock } from '@/components/ui/CheckBoxBlock';
import undefined from '@/components/ui/TabBarBackground';
import { RangeInput } from './RangeInput';
import { useUnit } from 'effector-react';
import {
	$draftFilters,
	filtersApplyClick,
	resetDraftFilters,
	toggleFilterEnabled,
	updateFilterRange,
} from '@/stores/allNews/filters/model';
import { FILTER_LABELS, FilterKey } from '@/types/filters';

type FiltersBottomSheetProps = {
	isVisible: boolean;
	onClose: () => void;
};

export const FiltersBottomSheet = ({
	isVisible,
	onClose,
}: FiltersBottomSheetProps) => {
	const filtersState = useUnit($draftFilters);
	const toggleFilterFn = useUnit(toggleFilterEnabled);
	const applyFiltersFn = useUnit(filtersApplyClick);
	const resetDraftFiltersFn = useUnit(resetDraftFilters);
	const updateFilterRangeFn = useUnit(updateFilterRange);

	if (!filtersState) return;

	return (
		<BottomSheet
			modalProps={{
				animationType: 'fade',
				presentationStyle: 'overFullScreen',
				transparent: true,
			}}
			isVisible={isVisible}
		>
			<KeyboardAvoidingView
				behavior={Platform.OS === 'ios' ? 'padding' : undefined}
				style={{ flex: 1 }}
				keyboardVerticalOffset={16}
			>
				<ThemedView style={styles.container}>
					<View style={styles.header}>
						<Button
							style={styles.button}
							variant='secondary'
							onlyIcon
							icon={<RestartIcon />}
						/>
						<ThemedText type='displayXs' style={styles.title}>
							Filters
						</ThemedText>
						<Button
							style={styles.button}
							variant='secondary'
							onlyIcon
							icon={<CloseIcon />}
							onPress={() => {
								onClose();
								resetDraftFiltersFn();
							}}
						/>
					</View>
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
					<Button
						variant='primary'
						size='lg'
						title='Apply'
						onPress={() => {
							applyFiltersFn();
							onClose();
						}}
					/>
				</ThemedView>
			</KeyboardAvoidingView>
		</BottomSheet>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 16,
	},

	header: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 17,
		paddingBottom: 16,
	},

	button: {
		alignSelf: 'flex-start',
	},

	title: {
		flex: 1,
		fontWeight: 700,
		fontFamily: 'MontserratBold',
		textAlign: 'center',
	},

	list: {
		paddingVertical: 16,
		gap: 8,
	},
});
