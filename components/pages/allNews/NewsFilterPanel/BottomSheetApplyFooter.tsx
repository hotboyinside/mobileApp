import { Button } from '@/components/ui/Button';
import { Status } from '@/constants/status';
import { appTokens } from '@/constants/tokens';
import { useThemeColor } from '@/hooks/useThemeColor';
import { $additionalFiltersErrors } from '@/stores/allNews/filtersPanel/filters/additionalFilters';
import { filtersApplyClick } from '@/stores/allNews/filtersPanel/filters/model';
import { $hasChangesInFilters } from '@/stores/allNews/filtersPanel/filters/selectableFilters';
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
	$isSortByChanged,
	applySortingClick,
} from '@/stores/allNews/filtersPanel/sortBy';
import {
	$isStarRatingEnabledStateChanged,
	applyDraftStarRatingEnabledState,
} from '@/stores/allNews/filtersPanel/starRating/starRatingEnabledState';

import { updateStarRatingFx } from '@/stores/starRating/handlers';
import {
	$draftStarRatingKeywords,
	$isStarRatingChanged,
	$modificationCountDraft,
} from '@/stores/starRating/model';
import {
	$notificationsSettingsStatus,
	putNotificationsSettingsFx,
} from '@/stores/userSettings';
import { $isKeywordsEnabled } from '@/stores/userSettings/keywordsEnabled';
import {
	BottomSheetFooter,
	BottomSheetFooterProps,
} from '@gorhom/bottom-sheet';
import { useUnit } from 'effector-react';
import { useEffect, useState } from 'react';
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
	closeButtonIsSecondary?: boolean;
	onClose?: () => void;
}

export const BottomSheetApplyFooter = ({
	applyButtonTitle = 'Apply',
	closeButtonTitle = 'Close',
	animatedFooterPosition,
	closeButtonIsSecondary,
	onClose = () => {},
}: BottomSheetApplyFooterProps) => {
	const openedFilterTab = useUnit($openedFilterTab);
	const openedFilterSubTab = useUnit($openedFilterSubTab);
	const [keyboardVisible, setKeyboardVisible] = useState(false);
	const { bottom: bottomSafeArea } = useSafeAreaInsets();
	const padding = useSharedValue({ top: 8, bottom: 8 });

	const applySortingClickFx = useUnit(applySortingClick);
	const additionalFiltersErrors = useUnit($additionalFiltersErrors);
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
	const modificationCountDraft = useUnit($modificationCountDraft);
	const isStarRatingChanged = useUnit($isStarRatingChanged);

	const isKeywordsEnabled = useUnit($isKeywordsEnabled);
	const notificationsSettingsStatus = useUnit($notificationsSettingsStatus);
	const onKeywordsEnabledToggle = () =>
		putNotificationsSettingsFx({
			isKeywordsEnabled: !isKeywordsEnabled,
		});

	const animatedPadding = useAnimatedStyle(() => {
		return {
			paddingTop: withSpring(padding.value.top),
			paddingBottom: withSpring(padding.value.bottom),
		};
	});

	let applyAction: () => void = () => {};
	let hasChanges = false;
	let hasErrors = false;
	let isShowApplyTitle = true;
	let isLoading = false;

	switch (openedFilterTab) {
		case FilterTabVariant.sort:
			applyAction = applySortingClickFx;
			hasChanges = hasChangesInSortingFilters;
			isShowApplyTitle = hasChangesInSortingFilters;
			break;

		case FilterTabVariant.filters:
			applyAction = applyFiltersFx;
			hasChanges = hasChangesInFilters;
			isShowApplyTitle = hasChangesInFilters;
			hasErrors = Object.values(additionalFiltersErrors).some(error =>
				Boolean(error)
			);
			break;

		case FilterTabVariant.keywords:
			applyAction = onKeywordsEnabledToggle;
			hasChanges = true;
			isShowApplyTitle = isKeywordsEnabled;
			isLoading = notificationsSettingsStatus === Status.Loading;
			break;

		case FilterTabVariant.rating:
			applyAction = onApplyDraftStarRatingEnabledState;
			hasChanges = isStarRatingEnabledStateChanged;
			isShowApplyTitle = isStarRatingEnabledStateChanged;
			break;
	}

	switch (openedFilterSubTab) {
		case FilterSubTabVariant.keywordsColor:
			applyAction = applyKeywordColorFx;
			hasChanges = hasChangesInSelectedColor;
			isShowApplyTitle = hasChangesInSelectedColor;
			break;

		case FilterSubTabVariant.keywordsIcon:
			applyAction = applySelectedKeyIconClickFx;
			hasChanges = hasChangesInSelectedIcon;
			isShowApplyTitle = hasChangesInSelectedIcon;
			break;

		case FilterSubTabVariant.editRating:
			applyAction = () =>
				updateStarRating({
					starRating: draftStarRatingKeywords,
					modificationCount: modificationCountDraft,
				});
			hasChanges = isStarRatingChanged;
			isShowApplyTitle = isStarRatingChanged;
	}

	const isSecondaryButton = closeButtonIsSecondary && isShowApplyTitle;
	const bgColor = useThemeColor(appTokens.background.primary);
	const borderColor = useThemeColor(appTokens.border.tertiary);

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
					variant={isSecondaryButton ? 'secondary' : 'primary'}
					size='lg'
					title={isShowApplyTitle ? applyButtonTitle : closeButtonTitle}
					onPress={() => {
						if (!isLoading && hasChanges) {
							applyAction();
						}
						onClose();
					}}
					disabled={hasErrors}
					isLoading={isLoading}
					loadingSpinnerProps={{
						size: 24,
						token: isShowApplyTitle
							? appTokens.component.buttons.secondaryGray.fg
							: appTokens.component.buttons.primary.fg,
					}}
					style={styles.maxBottomHeight}
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

	maxBottomHeight: {
		height: 48,
	},
});
