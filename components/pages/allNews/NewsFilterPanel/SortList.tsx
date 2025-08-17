import { ThemedView } from '@/components/ThemedView';
import { Button } from '@/components/ui/Button';
import { Checkbox } from '@/components/ui/CheckBox';
import { BottomSheet } from '@rneui/base';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import CloseIcon from '@/assets/icons/close-icon.svg';
import RestartIcon from '@/assets/icons/restart-icon.svg';
import { ThemedText } from '@/components/ThemedText';
import {
	$sortByDraft,
	applySortingClick,
	closeSortByClick,
	resetSortingDraft,
	updateSortingDraft,
} from '@/stores/allNews/sortBy/model';
import { useUnit } from 'effector-react';
import { SortLabels } from '@/types/sortBy';
import { appTokens } from '@/constants/tokens';
import { useThemeColor } from '@/hooks/useThemeColor';

type SortListProps = {
	isVisible: boolean;
	onClose: () => void;
};

export const SortList = ({ isVisible, onClose }: SortListProps) => {
	const currentSortValue = useUnit($sortByDraft);

	const updateSortValueFx = useUnit(updateSortingDraft);
	const resetSortingFx = useUnit(resetSortingDraft);
	const applySortingClickFx = useUnit(applySortingClick);
	const closeSortByClickFx = useUnit(closeSortByClick);

	const iconColor = useThemeColor(
		{},
		appTokens.component.buttons.secondaryGray.fg
	);

	return (
		<BottomSheet
			modalProps={{
				animationType: 'fade',
				presentationStyle: 'overFullScreen',
				transparent: true,
			}}
			isVisible={isVisible}
		>
			<ThemedView style={styles.container}>
				<View style={styles.header}>
					<Button
						onPress={resetSortingFx}
						onlyIcon
						variant='secondary'
						icon={<RestartIcon fill={iconColor} width={20} height={20} />}
						style={styles.button}
					/>
					<ThemedText type='displayXs' style={styles.title}>
						Sort by
					</ThemedText>
					<Button
						style={styles.button}
						variant='secondary'
						onlyIcon
						icon={<CloseIcon width={20} height={20} fill={iconColor} />}
						onPress={() => {
							closeSortByClickFx();
							onClose();
						}}
					/>
				</View>

				<View style={styles.list}>
					{Object.values(SortLabels).map((filter, index) => (
						<Checkbox
							key={filter}
							checked={filter === currentSortValue}
							title={filter}
							onPress={() => updateSortValueFx(filter)}
						/>
					))}
				</View>
				<Button
					variant='primary'
					size='lg'
					title='Apply'
					onPress={() => {
						applySortingClickFx();
						onClose();
					}}
				/>
			</ThemedView>
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
