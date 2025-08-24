import { ThemedView } from '@/components/ThemedView';
import { Button } from '@/components/ui/Button';
import { appTokens } from '@/constants/tokens';
import { useThemeColor } from '@/hooks/useThemeColor';
import { $hasChangesInFilters } from '@/stores/allNews/filtersPanel/filters/selectableFIlters/model';
import {
	$openedFilterTab,
	FilterTabVariant,
} from '@/stores/allNews/filtersPanel/model';
import {
	applySortingClick,
	$isSortByChanged,
} from '@/stores/allNews/filtersPanel/sortBy/model';
import { filtersApplyClick } from '@/stores/allNews/model';
import {
	BottomSheetFooterProps,
	BottomSheetFooter,
} from '@gorhom/bottom-sheet';
import { useUnit } from 'effector-react';
import { useState, useEffect } from 'react';
import { Keyboard, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface BottomSheetApplyFooterProps extends BottomSheetFooterProps {
	onClose: () => void;
}

export const BottomSheetApplyFooter = ({
	animatedFooterPosition,
	onClose,
}: BottomSheetApplyFooterProps) => {
	const openedFilterTab = useUnit($openedFilterTab);
	const [keyboardVisible, setKeyboardVisible] = useState(false);
	const { bottom: bottomSafeArea } = useSafeAreaInsets();

	const bgColor = useThemeColor({}, appTokens.background.primary);
	const borderColor = useThemeColor({}, appTokens.border.tertiary);

	const applySortingClickFx = useUnit(applySortingClick);
	const hasChangesInSortingFilters = useUnit($isSortByChanged);

	const applyFiltersFx = useUnit(filtersApplyClick);
	const hasChangesInFilters = useUnit($hasChangesInFilters);

	let applyAction: () => void;
	let hasChanges = false;

	switch (openedFilterTab) {
		case FilterTabVariant.sort:
			applyAction = applySortingClickFx;
			hasChanges = hasChangesInSortingFilters;
			break;

		case FilterTabVariant.filters:
			applyAction = applyFiltersFx;
			hasChanges = hasChangesInFilters;
			break;
	}

	useEffect(() => {
		const showKeyboard = Keyboard.addListener('keyboardDidShow', () => {
			setKeyboardVisible(true);
		});
		const hideKeyboard = Keyboard.addListener('keyboardDidHide', () =>
			setKeyboardVisible(false)
		);

		return () => {
			showKeyboard.remove();
			hideKeyboard.remove();
		};
	}, []);

	return (
		<BottomSheetFooter animatedFooterPosition={animatedFooterPosition}>
			<ThemedView
				style={[
					styles.container,
					{
						borderColor: borderColor,
						backgroundColor: bgColor,
						paddingTop: keyboardVisible ? 8 : 16,
						paddingBottom: keyboardVisible ? 8 : bottomSafeArea + 16,
					},
				]}
			>
				<Button
					variant='primary'
					size='lg'
					title={hasChanges ? 'Apply' : 'Close'}
					onPress={() => {
						applyAction();
						onClose();
					}}
				/>
			</ThemedView>
		</BottomSheetFooter>
	);
};

const styles = StyleSheet.create({
	container: {
		borderWidth: 1,
		borderBottomWidth: 0,
		borderTopLeftRadius: 16,
		borderTopRightRadius: 16,
		paddingHorizontal: 16,
	},
});
