import CheckLineIcon from '@/assets/icons/check-line-icon.svg';
import CircleIcon from '@/assets/icons/circle-icon.svg';
import CloseIcon from '@/assets/icons/close-icon.svg';
import { keywordsIcons } from '@/assets/icons/keywordsIcons';
import VoiceOverOff from '@/assets/icons/voiceover-off-icon.svg';
import VoiceOverOn from '@/assets/icons/voiceover-on-icon.svg';
import { useGlobalSheet } from '@/components/appProvider/sheetModal/GlobalSheetProvider';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import {
	MAX_KEYWORDS_COUNT,
	MAX_VOICE_OVERS_COUNT,
} from '@/constants/freeUsersLimits';
import { PREMIUM } from '@/constants/routes';
import { appTokens } from '@/constants/tokens';
import { useKeywordsColors } from '@/hooks/useKeywordsColors';
import { useThemeColor } from '@/hooks/useThemeColor';
import {
	$editingKeyword,
	$hasChangesInEditingKeyword,
} from '@/stores/allNews/filtersPanel/keywords/editingKeyword/model';
import {
	postKeywordFx,
	updateKeywordFx,
} from '@/stores/allNews/filtersPanel/keywords/handlers';
import {
	$keywordMode,
	$keywords,
	$keywordsInputError,
	$withVoiceOverKeywords,
	cancelEditKeyword,
	setInputKeywordError,
} from '@/stores/allNews/filtersPanel/keywords/model';
import { $selectedColor } from '@/stores/allNews/filtersPanel/keywords/selectedColor/model';
import { $selectedKeyIcon } from '@/stores/allNews/filtersPanel/keywords/selectedIcon/model';
import {
	$isNotEmptyValueInInsertMode,
	$selectedText,
	changeSelectedText,
} from '@/stores/allNews/filtersPanel/keywords/selectedText/model';
import {
	$isSelectedVoiceoverEnabled,
	toggleIsSelectedVoiceoverEnabled,
} from '@/stores/allNews/filtersPanel/keywords/selectedVoiceOverState/model';
import {
	closeFilterSubTab,
	FilterSubTabVariant,
	openFilterSubTab,
} from '@/stores/allNews/filtersPanel/model';
import { KeywordsMode } from '@/types/keywords';
import { useUnit } from 'effector-react';
import { router } from 'expo-router';
import { Pressable, StyleSheet } from 'react-native';
import { BottomSheetApplyFooter } from '../BottomSheetApplyFooter';
import { KeywordColorPicker } from './KeywordColorPicker';
import { KeywordIconPicker } from './KeywordIconPicker';

const ERROR_EXIST_WORD = 'This keyword is already in the list';

interface KeywordCreatorProps {
	isPremiumUser: boolean;
	onCloseKeywords: () => void;
}

export const KeywordCreator = ({
	isPremiumUser,
	onCloseKeywords,
}: KeywordCreatorProps) => {
	const { openSheetModal, closeSheetModal } = useGlobalSheet();

	const keywords = useUnit($keywords);
	const keywordsInputError = useUnit($keywordsInputError);
	const withVoiceOverKeywords = useUnit($withVoiceOverKeywords);
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
	const onSetInputKeywordError = useUnit(setInputKeywordError);

	const onCreateKeyword = useUnit(postKeywordFx);
	const onUpdateKeyword = useUnit(updateKeywordFx);

	const currentKeyIcon = selectedKeyIcon || 'bolt';
	const CurrentIcon = keywordsIcons[currentKeyIcon];

	const disabledColor = useThemeColor(appTokens.foreground.disabled);
	const whiteIconColor = useThemeColor(appTokens.component.buttons.primary.fg);
	const secondaryColor = useThemeColor(
		appTokens.component.buttons.secondaryGray.fg
	);
	const borderColor = useThemeColor(appTokens.border.tertiary);
	const utilityGray = useThemeColor(appTokens.utilityGray[400]);
	const tertiaryGray = useThemeColor(
		appTokens.component.buttons.tertiaryGray.fg
	);

	const keywordsColors = useKeywordsColors();

	const openKeywordColorPickerSheet = () => {
		onOpenFilterSubTab(FilterSubTabVariant.keywordsColor);
		openSheetModal(
			'secondary',
			<KeywordColorPicker
				isPremiumUser={isPremiumUser}
				onCloseKeywordsBottomSheet={onCloseKeywords}
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
				isPremiumUser={isPremiumUser}
				onCloseKeywordsBottomSheet={onCloseKeywords}
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
					onChangeText={text => {
						onChangeSelectedText(text);

						if (keywordsInputError) {
							onSetInputKeywordError(null);
						}
					}}
					maxLength={20}
					errorMessage={keywordsInputError ?? undefined}
					isError={Boolean(keywordsInputError)}
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
					variant={
						hasChangesInEditingKeyword || isNotEmptyValueInInsertMode
							? 'primary'
							: 'secondary'
					}
					size='lg'
					onlyIcon
					style={styles.buttonMaxWidth}
					icon={
						<CheckLineIcon
							width={20}
							height={20}
							fill={
								hasChangesInEditingKeyword || isNotEmptyValueInInsertMode
									? whiteIconColor
									: disabledColor
							}
						/>
					}
					onPress={() => {
						const trimmedWord = selectedText.trim();

						if (!trimmedWord) return;

						if (mode === KeywordsMode.InsertMode) {
							const isDuplicate = keywords.some(
								keyword =>
									keyword.word.trim().toLowerCase() ===
									trimmedWord.toLowerCase()
							);

							if (isDuplicate) {
								onSetInputKeywordError(ERROR_EXIST_WORD);
								return;
							}

							const exceedsFreeLimit =
								!isPremiumUser &&
								((isSelectedVoiceoverEnabled &&
									withVoiceOverKeywords.length >= MAX_VOICE_OVERS_COUNT) ||
									keywords.length >= MAX_KEYWORDS_COUNT);

							if (exceedsFreeLimit) {
								onCloseKeywords();
								router.push(PREMIUM);
								return;
							}

							onCreateKeyword({
								word: selectedText,
								color: selectedColor,
								iconKey: currentKeyIcon,
								isVoiceoverEnabled: isSelectedVoiceoverEnabled,
							});
							onChangeSelectedText('');

							return;
						} else if (mode === KeywordsMode.EditMode) {
							if (!hasChangesInEditingKeyword) return;

							onUpdateKeyword({
								_id: editingKeyword?._id!,
								word: selectedText,
								color: selectedColor,
								iconKey: selectedKeyIcon!,
								isVoiceoverEnabled: isSelectedVoiceoverEnabled,
							});

							onChangeSelectedText('');
						}
					}}
				/>
			</ThemedView>
			<ThemedView style={styles.bottomButtons}>
				<Pressable
					style={styles.controlButton}
					hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
					onPress={openKeywordColorPickerSheet}
				>
					<CircleIcon
						width={20}
						height={20}
						fill={keywordsColors[selectedColor].icon}
					/>
					<ThemedText
						type='textSm'
						tokenColor={appTokens.text.tertiary}
						style={styles.controlText}
					>
						{selectedColor}
					</ThemedText>
				</Pressable>

				<Pressable
					style={styles.controlButton}
					hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
					onPress={openKeywordIconPickerSheet}
				>
					<CurrentIcon
						width={20}
						height={20}
						fill={selectedKeyIcon ? tertiaryGray : utilityGray}
					/>
					<ThemedText
						type='textSm'
						tokenColor={
							selectedKeyIcon
								? appTokens.text.tertiary
								: appTokens.utilityGray[400]
						}
						style={styles.controlText}
					>
						Icon
					</ThemedText>
				</Pressable>

				<Pressable
					style={styles.controlButton}
					hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
					onPress={onToggleIsSelectedVoiceoverEnabled}
				>
					{isSelectedVoiceoverEnabled ? (
						<VoiceOverOn width={20} height={20} fill={tertiaryGray} />
					) : (
						<VoiceOverOff width={20} height={20} fill={utilityGray} />
					)}
					<ThemedText
						type='textSm'
						tokenColor={
							isSelectedVoiceoverEnabled
								? appTokens.text.tertiary
								: appTokens.utilityGray[400]
						}
						style={styles.controlText}
					>
						{isSelectedVoiceoverEnabled ? 'Voiceover on' : 'Voiceover off'}
					</ThemedText>
				</Pressable>
			</ThemedView>
		</ThemedView>
	);
};

const styles = StyleSheet.create({
	container: {
		borderRadius: 12,
		borderWidth: 1,
		padding: 12,
		shadowColor: 'rgba(13,18,28,0.06)',
		shadowOffset: { width: 0, height: 0 },
		shadowOpacity: 1,
		shadowRadius: 20,
		elevation: 12,
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

	controlButton: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 4,
	},

	controlText: {
		fontWeight: 600,
		fontFamily: 'MontserratSemiBold',
	},

	buttonMaxWidth: {
		width: 48,
	},
});
