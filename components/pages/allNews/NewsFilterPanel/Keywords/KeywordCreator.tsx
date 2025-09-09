import { ThemedView } from '@/components/ThemedView';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { StyleSheet } from 'react-native';
import CheckLineIcon from '@/assets/icons/check-line-icon.svg';
import { useThemeColor } from '@/hooks/useThemeColor';
import { appTokens } from '@/constants/tokens';
import CircleIcon from '@/assets/icons/circle-icon.svg';
import SmileIcon from '@/assets/icons/smile-icon.svg';
import VoiceOverOff from '@/assets/icons/voiceover-off-icon.svg';
import VoiceOverOn from '@/assets/icons/voiceover-on-icon.svg';
import { useGlobalSheet } from '@/components/appProvider/sheetModal/GlobalSheetProvider';
import { KeywordColorPicker } from './KeywordColorPicker';
import { BottomSheetApplyFooter } from '../BottomSheetApplyFooter';
import { useUnit } from 'effector-react';
import { $selectedColor } from '@/stores/allNews/filtersPanel/keywords/selectedColor/model';
import { keywordsColors, KeywordsMode } from '@/types/keywords';
import { KeywordIconPicker } from './KeywordIconPicker';
import {
	openFilterSubTab,
	closeFilterSubTab,
	FilterSubTabVariant,
} from '@/stores/allNews/filtersPanel/model';
import { $selectedKeyIcon } from '@/stores/allNews/filtersPanel/keywords/selectedIcon/model';
import {
	$isSelectedVoiceoverEnabled,
	toggleIsSelectedVoiceoverEnabled,
} from '@/stores/allNews/filtersPanel/keywords/selectedVoiceOverState/model';
import { keywordsIcons } from '@/assets/icons/keywordsIcons';
import {
	$isNotEmptyValueInInsertMode,
	$selectedText,
	changeSelectedText,
} from '@/stores/allNews/filtersPanel/keywords/selectedText/model';
import {
	postKeywordFx,
	updateKeywordFx,
} from '@/stores/allNews/filtersPanel/keywords/handlers';
import {
	$keywordMode,
	cancelEditKeyword,
} from '@/stores/allNews/filtersPanel/keywords/model';
import CloseIcon from '@/assets/icons/close-icon.svg';
import {
	$editingKeyword,
	$hasChangesInEditingKeyword,
} from '@/stores/allNews/filtersPanel/keywords/editingKeyword/model';

export const KeywordCreator = () => {
	const { openSheetModal, closeSheetModal } = useGlobalSheet();
	const mode = useUnit($keywordMode);
	const selectedText = useUnit($selectedText);
	const selectedColor = useUnit($selectedColor);
	const selectedKeyIcon = useUnit($selectedKeyIcon);
	const isSelectedVoiceoverEnabled = useUnit($isSelectedVoiceoverEnabled);
	const editingKeyword = useUnit($editingKeyword);
	const hasChangesInEditingKeyword = useUnit($hasChangesInEditingKeyword);
	const isNotEmptyValueInInsertMode = useUnit($isNotEmptyValueInInsertMode);

	const onToggleIsSelectedVoiceoverEnabled = useUnit(
		toggleIsSelectedVoiceoverEnabled
	);
	const onOpenFilterSubTab = useUnit(openFilterSubTab);
	const onCloseFilterSubTab = useUnit(closeFilterSubTab);
	const onChangeSelectedText = useUnit(changeSelectedText);

	const onCreateKeyword = useUnit(postKeywordFx);
	const onUpdateKeyword = useUnit(updateKeywordFx);

	const currentKeyIcon = selectedKeyIcon || 'smile';
	const CurrentIcon = keywordsIcons[currentKeyIcon];

	const disabledColor = useThemeColor({}, appTokens.foreground.disabled);
	const secondaryColor = useThemeColor(
		{},
		appTokens.component.buttons.secondaryGray.fg
	);
	const borderColor = useThemeColor({}, appTokens.border.tertiary);
	const utilityGray = useThemeColor({}, appTokens.utilityGray[400]);
	const tertiaryGray = useThemeColor(
		{},
		appTokens.component.buttons.tertiaryGray.fg
	);

	const openKeywordColorPickerSheet = () => {
		onOpenFilterSubTab(FilterSubTabVariant.keywordsColor);
		openSheetModal(
			'secondary',
			<KeywordColorPicker
				onClose={() => {
					closeSheetModal('secondary');
				}}
			/>,
			props => (
				<BottomSheetApplyFooter
					{...props}
					applyButtonTitle='Save'
					onClose={() => {
						onCloseFilterSubTab();
						closeSheetModal('secondary');
					}}
				/>
			)
		);
	};

	const openKeywordIconPickerSheet = () => {
		onOpenFilterSubTab(FilterSubTabVariant.keywordsIcon);
		openSheetModal(
			'secondary',
			<KeywordIconPicker
				onClose={() => {
					onCloseFilterSubTab();
					closeSheetModal('secondary');
				}}
			/>,
			props => (
				<BottomSheetApplyFooter
					{...props}
					applyButtonTitle='Save'
					onClose={() => {
						closeSheetModal('secondary');
					}}
				/>
			)
		);
	};

	return (
		<ThemedView style={[styles.container, { borderColor: borderColor }]}>
			<ThemedView style={styles.topButtons}>
				<Input
					placeholder='Add keyword'
					containerStyle={styles.inputContainer}
					value={selectedText}
					onChangeText={text => onChangeSelectedText(text)}
				/>
				{mode === KeywordsMode.EditMode && (
					<Button
						variant='secondary'
						size='lg'
						onlyIcon
						icon={<CloseIcon width={20} height={20} fill={secondaryColor} />}
						onPress={() => cancelEditKeyword()}
					/>
				)}
				<Button
					variant='secondary'
					size='lg'
					onlyIcon
					icon={
						<CheckLineIcon
							width={20}
							height={20}
							fill={
								hasChangesInEditingKeyword || isNotEmptyValueInInsertMode
									? secondaryColor
									: disabledColor
							}
						/>
					}
					onPress={() => {
						if (!selectedText.trim()) return;
						if (mode === KeywordsMode.InsertMode) {
							onCreateKeyword({
								word: selectedText,
								color: selectedColor,
								iconKey: currentKeyIcon,
								isVoiceoverEnabled: isSelectedVoiceoverEnabled,
							});
						} else if (mode === KeywordsMode.EditMode) {
							onUpdateKeyword({
								_id: editingKeyword?._id!,
								word: selectedText,
								color: selectedColor,
								iconKey: selectedKeyIcon!,
								isVoiceoverEnabled: isSelectedVoiceoverEnabled,
							});
						}
						onChangeSelectedText('');
					}}
				/>
			</ThemedView>
			<ThemedView style={styles.bottomButtons}>
				<Button
					icon={
						<CircleIcon
							width={20}
							height={20}
							fill={keywordsColors[selectedColor].icon}
						/>
					}
					title={selectedColor}
					variant='link-gray'
					iconPosition='left'
					titleStyle={{ color: tertiaryGray }}
					onPress={openKeywordColorPickerSheet}
				/>
				<Button
					icon={
						<CurrentIcon
							width={20}
							height={20}
							fill={selectedKeyIcon ? tertiaryGray : utilityGray}
						/>
					}
					title='Icon'
					variant='link-gray'
					iconPosition='left'
					titleStyle={{ color: selectedKeyIcon ? tertiaryGray : utilityGray }}
					onPress={openKeywordIconPickerSheet}
				/>
				<Button
					icon={
						isSelectedVoiceoverEnabled ? (
							<VoiceOverOn width={20} height={20} fill={tertiaryGray} />
						) : (
							<VoiceOverOff width={20} height={20} fill={utilityGray} />
						)
					}
					title={isSelectedVoiceoverEnabled ? 'Voiceover on' : 'Voiceover off'}
					variant='link-gray'
					iconPosition='left'
					onPress={onToggleIsSelectedVoiceoverEnabled}
					titleStyle={{
						color: isSelectedVoiceoverEnabled ? tertiaryGray : utilityGray,
					}}
				/>
			</ThemedView>
		</ThemedView>
	);
};

const styles = StyleSheet.create({
	container: {
		borderRadius: 12,
		borderWidth: 1,
		padding: 12,
		// shadowColor: "rgba(13,18,28,0.06)",
		// shadowOffset: { width: 0, height: 0 },
		// shadowOpacity: 1,
		// shadowRadius: 40 / 2,
		// ...Platform.select({
		//   android: {
		//     elevation: 12,
		//   },
		// }),
	},

	inputContainer: {
		flex: 1,
	},

	topButtons: {
		flex: 1,
		flexDirection: 'row',
		gap: 8,
		marginBottom: 12,
	},

	bottomButtons: {
		flex: 1,
		flexDirection: 'row',
		gap: 12,
	},
});
