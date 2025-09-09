import { UserKeyword } from '@/types/keywords';
import { combine, createStore } from 'effector';
import {
	startEditKeyword,
	finishEditKeyword,
	cancelEditKeyword,
} from '../model';
import { $selectedColor } from '../selectedColor/model';
import { $selectedText } from '../selectedText/model';
import { $selectedKeyIcon } from '../selectedIcon/model';
import { $isSelectedVoiceoverEnabled } from '../selectedVoiceOverState/model';

export const $editingKeyword = createStore<UserKeyword | null>(null);

$editingKeyword.on(startEditKeyword, (_, payload) => payload);
$editingKeyword.on(finishEditKeyword, () => null);

export const $hasChangesInEditingKeyword = combine(
	$editingKeyword,
	$selectedColor,
	$selectedText,
	$selectedKeyIcon,
	$isSelectedVoiceoverEnabled,
	(
		editingKeyword: UserKeyword | null,
		selectedColor,
		selectedText,
		selectedKeyIcon,
		isSelectedVoiceoverEnabled
	) => {
		if (!editingKeyword) return false;

		return (
			editingKeyword.color !== selectedColor ||
			editingKeyword.word !== selectedText ||
			editingKeyword.iconKey !== selectedKeyIcon ||
			editingKeyword.isVoiceoverEnabled !== isSelectedVoiceoverEnabled
		);
	}
);

$editingKeyword.reset(cancelEditKeyword);
$editingKeyword.reset(finishEditKeyword);
