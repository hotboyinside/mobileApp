import { ThemedView } from '@/components/ThemedView';
import { Button } from '@/components/ui/Button';
import { appTokens } from '@/constants/tokens';
import { useThemeColor } from '@/hooks/useThemeColor';
import { $hasChangesInFilters } from '@/stores/allNews/filtersPanel/filters/selectableFIlters/model';
import {
	$hasChangesInSelectedColor,
	applySelectedColorClick,
} from '@/stores/allNews/filtersPanel/keywords/selectedColor/model';
import {
	$hasChangesInSelectedIcon,
	applySelectedKeyIconClick,
} from '@/stores/allNews/filtersPanel/keywords/selectedIcon/model';
import {
	$openedFilterSubTab,
	$openedFilterTab,
	FilterSubTabVariant,
	FilterTabVariant,
} from '@/stores/allNews/filtersPanel/model';
import {
	applySortingClick,
	$isSortByChanged,
} from '@/stores/allNews/filtersPanel/sortBy/model';
import {
	$isStarRatingEnabledStateChanged,
	applyDraftStarRatingEnabledState,
} from '@/stores/allNews/filtersPanel/starRating/starRatingEnabledState/model';
import { filtersApplyClick } from '@/stores/allNews/model';
import { updateStarRatingFx } from '@/stores/starRating/handlers';
import {
	$draftStarRatingKeywords,
	$isStarRatingChanged,
} from '@/stores/starRating/model';
import { $isVoiceOverEnabled } from '@/stores/userSettings/voiceOver/model';
import {
	BottomSheetFooterProps,
	BottomSheetFooter,
} from '@gorhom/bottom-sheet';
import { useUnit } from 'effector-react';
import { useState, useEffect } from 'react';
import { Keyboard, StyleSheet } from 'react-native';
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface BottomSheetApplyFooterProps extends BottomSheetFooterProps {
	applyButtonTitle?: string;
	closeButtonTitle?: string;
	onClose: () => void;
}

export const BottomSheetApplyFooter = ({
	applyButtonTitle = 'Apply',
	closeButtonTitle = 'Close',
	animatedFooterPosition,
	onClose,
}: BottomSheetApplyFooterProps) => {
	const openedFilterTab = useUnit($openedFilterTab);
	const openedFilterSubTab = useUnit($openedFilterSubTab);
	const [keyboardVisible, setKeyboardVisible] = useState(false);
	const { bottom: bottomSafeArea } = useSafeAreaInsets();
	const padding = useSharedValue({ top: 8, bottom: 8 });

	const bgColor = useThemeColor({}, appTokens.background.primary);
	const borderColor = useThemeColor({}, appTokens.border.tertiary);

	const applySortingClickFx = useUnit(applySortingClick);
	const hasChangesInSortingFilters = useUnit($isSortByChanged);

	const applyFiltersFx = useUnit(filtersApplyClick);
	const hasChangesInFilters = useUnit($hasChangesInFilters);

	const applyKeywordColorFx = useUnit(applySelectedColorClick);
	const hasChangesInSelectedColor = useUnit($hasChangesInSelectedColor);

	const applySelectedKeyIconClickFx = useUnit(applySelectedKeyIconClick);
	const hasChangesInSelectedIcon = useUnit($hasChangesInSelectedIcon);

	const onApplyDraftStarRatingEnabledState = useUnit(
		applyDraftStarRatingEnabledState
	);
	const isStarRatingEnabledStateChanged = useUnit(
		$isStarRatingEnabledStateChanged
	);

	const updateStarRating = useUnit(updateStarRatingFx);
	const draftStarRatingKeywords = useUnit($draftStarRatingKeywords);
	const isStarRatingChanged = useUnit($isStarRatingChanged);

	const isVoiceOverEnabled = useUnit($isVoiceOverEnabled);

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

		case FilterTabVariant.keywords:
			applyAction = () => {};
			hasChanges = !isVoiceOverEnabled;
			break;

		case FilterTabVariant.rating:
			applyAction = onApplyDraftStarRatingEnabledState;
			hasChanges = isStarRatingEnabledStateChanged;
			break;
	}

	switch (openedFilterSubTab) {
		case FilterSubTabVariant.keywordsColor:
			applyAction = applyKeywordColorFx;
			hasChanges = hasChangesInSelectedColor;
			break;

		case FilterSubTabVariant.keywordsIcon:
			applyAction = applySelectedKeyIconClickFx;
			hasChanges = hasChangesInSelectedIcon;
			break;

		case FilterSubTabVariant.editRating:
			applyAction = () => updateStarRating(draftStarRatingKeywords);
			hasChanges = isStarRatingChanged;
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

	useEffect(() => {
		if (keyboardVisible) {
			padding.value = { top: 8, bottom: 8 };
		} else {
			padding.value = { top: 16, bottom: 16 + bottomSafeArea };
		}
	}, [keyboardVisible, bottomSafeArea, padding]);

	const animatedPadding = useAnimatedStyle(() => {
		return {
			paddingTop: withSpring(padding.value.top),
			paddingBottom: withSpring(padding.value.bottom),
		};
	});

	return (
		<BottomSheetFooter animatedFooterPosition={animatedFooterPosition}>
			<Animated.View
				style={[
					styles.container,
					{
						borderColor: borderColor,
						backgroundColor: bgColor,
					},
					animatedPadding,
				]}
			>
				<Button
					variant='primary'
					size='lg'
					title={hasChanges ? applyButtonTitle : closeButtonTitle}
					onPress={() => {
						applyAction();
						onClose();
					}}
				/>
			</Animated.View>
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
